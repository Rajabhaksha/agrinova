import { useState, useEffect, useCallback } from 'react';
import { FarmLocation } from '../types';

export const DEFAULT_FARM_LOCATION: FarmLocation = {
  name: 'Valley Green Fields',
  region: 'Central Valley, CA',
  latitude: 36.74,
  longitude: -119.78,
  isAutoDetected: false,
  status: 'idle',
};

const STORAGE_KEY = 'agrinova_farm_location';

export function useFarmLocation() {
  const [location, setLocation] = useState<FarmLocation>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return DEFAULT_FARM_LOCATION;
  });

  const reverseGeocode = async (lat: number, lon: number): Promise<{ name: string; region: string }> => {
    try {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      if (res.ok) {
        const data = await res.json();
        const city = data.locality || data.city || data.principalSubdivision || '';
        const state = data.principalSubdivisionCode || data.countryCode || '';
        const farmName = city ? `${city} Farm Fields` : `Parcel (${lat.toFixed(2)}°N, ${Math.abs(lon).toFixed(2)}°W)`;
        const regionStr = [city, state].filter(Boolean).join(', ') || 'GPS Farm Coordinates';
        return { name: farmName, region: regionStr };
      }
    } catch {
      // fallback
    }
    return {
      name: `Farm Parcel (${lat.toFixed(2)}°N, ${Math.abs(lon).toFixed(2)}°W)`,
      region: `${lat.toFixed(3)}, ${lon.toFixed(3)}`,
    };
  };

  const detectLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setLocation((prev) => ({
        ...prev,
        status: 'unsupported',
        errorMsg: 'Geolocation is not supported by your browser.',
      }));
      return;
    }

    setLocation((prev) => ({
      ...prev,
      status: 'requesting',
      errorMsg: undefined,
    }));

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = parseFloat(position.coords.latitude.toFixed(4));
        const lon = parseFloat(position.coords.longitude.toFixed(4));
        const { name, region } = await reverseGeocode(lat, lon);

        const newLoc: FarmLocation = {
          name,
          region,
          latitude: lat,
          longitude: lon,
          isAutoDetected: true,
          status: 'success',
        };

        setLocation(newLoc);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newLoc));
        } catch {
          // ignore storage error
        }
      },
      (error) => {
        let errorMsg = 'Unable to retrieve location coordinates.';
        if (error.code === error.PERMISSION_DENIED) {
          errorMsg = 'Location permission denied by browser. Using Valley Green Fields.';
        } else if (error.code === error.TIMEOUT) {
          errorMsg = 'Location request timed out. Using Valley Green Fields.';
        }

        setLocation((prev) => ({
          ...prev,
          status: 'denied',
          errorMsg,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 120000,
      }
    );
  }, []);

  // Try automatic detection on initial launch if not previously saved or if requested
  useEffect(() => {
    if (!location.isAutoDetected && location.status === 'idle') {
      detectLocation();
    }
  }, [detectLocation, location.isAutoDetected, location.status]);

  const setManualLocation = (preset: { name: string; region: string; lat: number; lon: number }) => {
    const newLoc: FarmLocation = {
      name: preset.name,
      region: preset.region,
      latitude: preset.lat,
      longitude: preset.lon,
      isAutoDetected: false,
      status: 'success',
    };
    setLocation(newLoc);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLoc));
    } catch {
      // ignore
    }
  };

  return {
    location,
    detectLocation,
    setManualLocation,
  };
}
