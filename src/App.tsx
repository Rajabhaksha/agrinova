import React, { useState } from 'react';
import { TabType, CropRecommendation, BuyerMessage, CommodityRate, FarmExpense } from './types';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { CropAiView } from './components/CropAiView';
import { ScanView } from './components/ScanView';
import { MarketView } from './components/MarketView';
import { FinancesView } from './components/FinancesView';
import {
  FieldMapModal,
  PostListingModal,
  BuyerChatModal,
  LogExpenseModal,
  CultivationGuideModal,
  CostSheetModal,
  AlertDetailsModal,
  NotificationsDrawer,
} from './components/Modals';
import { INITIAL_EXPENSES, BUYER_INQUIRIES, APP_ASSETS } from './data/mockData';
import { useFarmLocation } from './hooks/useFarmLocation';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [expenses, setExpenses] = useState<FarmExpense[]>(INITIAL_EXPENSES);
  const { location, detectLocation, setManualLocation } = useFarmLocation();

  // Modal states
  const [showFieldMap, setShowFieldMap] = useState(false);
  const [showPostListing, setShowPostListing] = useState(false);
  const [showLogExpense, setShowLogExpense] = useState(false);
  const [showAlertDetails, setShowAlertDetails] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeGuideCrop, setActiveGuideCrop] = useState<CropRecommendation | null>(null);
  const [activeCostCrop, setActiveCostCrop] = useState<CropRecommendation | null>(null);
  const [activeChatBuyer, setActiveChatBuyer] = useState<BuyerMessage | null>(null);
  const [tradeCommodity, setTradeCommodity] = useState<CommodityRate | null>(null);
  const [orderedProduct, setOrderedProduct] = useState<{ name: string; price: number } | null>(null);

  const handleAddExpense = (expense: FarmExpense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const handlePostListingSuccess = (newListingData: {
    title: string;
    category: string;
    quantityTons: number;
    askingPricePerTon: number;
    moisturePercent: number;
  }) => {
    setCurrentTab('market');
    alert(`Listing "${newListingData.title}" (${newListingData.quantityTons} tons @ $${newListingData.askingPricePerTon}/ton) published to Mandi network!`);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter'] text-[#131b2e] antialiased min-h-screen flex flex-col selection:bg-[#6cf8bb]">
      {/* Fixed Sticky Header */}
      <Header
        onNotificationClick={() => setShowNotifications(true)}
        onProfileClick={() => setShowProfile(true)}
        unreadCount={2}
        farmLocation={location}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-[#faf8ff] max-w-lg mx-auto px-4">
        {currentTab === 'dashboard' && (
          <DashboardView
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenFieldMap={() => setShowFieldMap(true)}
            onOpenPostListing={() => setShowPostListing(true)}
            onOpenLogExpense={() => setShowLogExpense(true)}
            onOpenAlertDetails={() => setShowAlertDetails(true)}
            farmLocation={location}
            onDetectLocation={detectLocation}
          />
        )}

        {currentTab === 'crop-ai' && (
          <CropAiView
            onOpenCultivationGuide={(crop) => setActiveGuideCrop(crop)}
            onOpenCostSheet={(crop) => setActiveCostCrop(crop)}
          />
        )}

        {currentTab === 'disease-scan' && (
          <ScanView
            onAddLog={handleAddExpense}
            onOrderProduct={(name, price) => setOrderedProduct({ name, price })}
          />
        )}

        {currentTab === 'market' && (
          <MarketView
            onOpenPostListing={() => setShowPostListing(true)}
            onOpenChat={(buyer) => setActiveChatBuyer(buyer)}
            onTradeCommodity={(comm) => setTradeCommodity(comm)}
          />
        )}

        {currentTab === 'finances' && (
          <FinancesView
            expenses={expenses}
            onOpenLogExpense={() => setShowLogExpense(true)}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav currentTab={currentTab} onSelectTab={(tab) => setCurrentTab(tab)} />

      {/* Modals & Dialogs */}
      {showFieldMap && <FieldMapModal onClose={() => setShowFieldMap(false)} />}

      {showPostListing && (
        <PostListingModal
          onClose={() => setShowPostListing(false)}
          onPost={handlePostListingSuccess}
        />
      )}

      {showLogExpense && (
        <LogExpenseModal
          onClose={() => setShowLogExpense(false)}
          onSave={handleAddExpense}
        />
      )}

      {showAlertDetails && (
        <AlertDetailsModal onClose={() => setShowAlertDetails(false)} />
      )}

      {showNotifications && (
        <NotificationsDrawer onClose={() => setShowNotifications(false)} />
      )}

      {activeGuideCrop && (
        <CultivationGuideModal
          crop={activeGuideCrop}
          onClose={() => setActiveGuideCrop(null)}
        />
      )}

      {activeCostCrop && (
        <CostSheetModal
          crop={activeCostCrop}
          onClose={() => setActiveCostCrop(null)}
        />
      )}

      {activeChatBuyer && (
        <BuyerChatModal
          buyer={activeChatBuyer}
          onClose={() => setActiveChatBuyer(null)}
        />
      )}

      {/* Trade Commodity Modal */}
      {tradeCommodity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div>
                <span className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">
                  Mandi Direct Trade Desk
                </span>
                <h3 className="text-[18px] font-bold text-[#002718]">{tradeCommodity.name}</h3>
              </div>
              <button
                onClick={() => setTradeCommodity(null)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="space-y-3 text-[13px]">
              <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[#414943] text-[11px] block">Current Spot Rate</span>
                  <span className="text-[20px] font-bold text-[#002718]">
                    ${tradeCommodity.price} / {tradeCommodity.unit}
                  </span>
                </div>
                <span className="text-[#006c49] font-bold text-[12px] bg-[#6cf8bb]/30 px-2.5 py-1 rounded-full">
                  +{tradeCommodity.changePercent}% today
                </span>
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-semibold text-[#414943]">Quantity to Contract ({tradeCommodity.unit}s)</label>
                <input
                  type="number"
                  defaultValue="25"
                  className="w-full px-3 py-2 bg-[#f2f3ff] rounded-xl text-[#131b2e] font-bold"
                />
              </div>

              <div className="p-3 bg-[#eaedff] rounded-xl text-[12px] text-[#414943]">
                Delivery location: <strong>{tradeCommodity.location}</strong>. Grain testing and settlement guarantee issued by Mandi Central Authority.
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Order placed for ${tradeCommodity.name} at $${tradeCommodity.price}/${tradeCommodity.unit}!`);
                setTradeCommodity(null);
              }}
              className="w-full py-3 bg-[#006c49] text-[#ffffff] rounded-xl font-semibold text-[13px] active:scale-[0.98] transition-all hover:bg-[#002718]"
            >
              Initiate Commercial Contract
            </button>
          </div>
        </div>
      )}

      {/* Product Order Modal */}
      {orderedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4 text-center">
            <div className="w-14 h-14 rounded-full bg-[#6cf8bb]/40 text-[#006c49] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[32px]">check_circle</span>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-[#002718]">Order Confirmed!</h3>
              <p className="text-[13px] text-[#414943] mt-1">
                <strong>{orderedProduct.name}</strong> (${orderedProduct.price.toFixed(2)}) is scheduled for dispatch from Regional Depot.
              </p>
            </div>
            <div className="p-3 bg-[#f2f3ff] rounded-xl text-[12px] text-[#414943]">
              Estimated farm delivery: <strong>Tomorrow by 10:00 AM</strong>. Drip line applicator instructions included.
            </div>
            <button
              onClick={() => setOrderedProduct(null)}
              className="w-full py-2.5 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <h3 className="text-[18px] font-bold text-[#002718]">Farmer Account</h3>
              <button
                onClick={() => setShowProfile(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <img
                src={APP_ASSETS.avatar}
                alt="Profile"
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[#6cf8bb]"
              />
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-[16px] text-[#131b2e]">Alex Henderson</h4>
                <span className="text-[12px] text-[#006c49] font-semibold block truncate">
                  {location.name}
                </span>
                <span className="text-[10px] text-[#414943] block">AgriNova PRO ID #AG-4912</span>
              </div>
            </div>

            {/* Farm Geolocation & GPS Telemetry Card */}
            <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#414943] tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#006c49]">my_location</span>
                  Farm GPS Location
                </span>
                {location.isAutoDetected ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] font-bold text-[9px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
                    GPS Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#414943] font-semibold text-[9px]">
                    Preset
                  </span>
                )}
              </div>

              <div>
                <span className="text-[13px] font-bold text-[#131b2e] block leading-snug">
                  {location.name}
                </span>
                <span className="text-[11px] text-[#414943] block">
                  Coordinates: {location.latitude.toFixed(4)}°N, {Math.abs(location.longitude).toFixed(4)}°W
                </span>
                {location.errorMsg && (
                  <span className="text-[10px] text-[#ba1a1a] block mt-0.5">
                    {location.errorMsg}
                  </span>
                )}
              </div>

              {/* Action: Trigger Browser Geolocation */}
              <button
                onClick={detectLocation}
                disabled={location.status === 'requesting'}
                className="w-full py-2 px-3 rounded-lg bg-[#002718] hover:bg-[#006c49] text-[#ffffff] font-semibold text-[11px] flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-sm"
                type="button"
              >
                <span className={`material-symbols-outlined text-[14px] ${location.status === 'requesting' ? 'animate-spin' : ''}`}>
                  {location.status === 'requesting' ? 'sync' : 'gps_fixed'}
                </span>
                <span>
                  {location.status === 'requesting'
                    ? 'Requesting Browser Geolocation...'
                    : 'Auto-Detect Farm via Browser GPS'}
                </span>
              </button>

              {/* Quick Farm Presets */}
              <div className="pt-1 border-t border-[#dae2fd]">
                <span className="text-[9px] uppercase font-bold text-[#414943] block mb-1">
                  Or Test Different Farm Regions:
                </span>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  <button
                    onClick={() =>
                      setManualLocation({
                        name: 'Valley Green Fields',
                        region: 'Central Valley, CA',
                        lat: 36.74,
                        lon: -119.78,
                      })
                    }
                    className="p-1.5 bg-[#ffffff] rounded-md border border-[#dae2fd] text-left hover:bg-[#eaedff] transition-colors truncate"
                  >
                    📍 Valley Green (CA)
                  </button>
                  <button
                    onClick={() =>
                      setManualLocation({
                        name: 'Salinas Valley Fields',
                        region: 'Salinas, CA',
                        lat: 36.67,
                        lon: -121.65,
                      })
                    }
                    className="p-1.5 bg-[#ffffff] rounded-md border border-[#dae2fd] text-left hover:bg-[#eaedff] transition-colors truncate"
                  >
                    📍 Salinas Salad Bowl
                  </button>
                  <button
                    onClick={() =>
                      setManualLocation({
                        name: 'Iowa Heartland Corn Belt',
                        region: 'Des Moines, IA',
                        lat: 41.58,
                        lon: -93.62,
                      })
                    }
                    className="p-1.5 bg-[#ffffff] rounded-md border border-[#dae2fd] text-left hover:bg-[#eaedff] transition-colors truncate"
                  >
                    🌽 Iowa Heartland (IA)
                  </button>
                  <button
                    onClick={() =>
                      setManualLocation({
                        name: 'Yakima Orchards & Hops',
                        region: 'Yakima, WA',
                        lat: 46.60,
                        lon: -120.50,
                      })
                    }
                    className="p-1.5 bg-[#ffffff] rounded-md border border-[#dae2fd] text-left hover:bg-[#eaedff] transition-colors truncate"
                  >
                    🍏 Yakima Basin (WA)
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-[12px]">
              <div className="p-2.5 bg-[#f2f3ff] rounded-xl flex justify-between">
                <span className="text-[#414943]">Active Farm Area</span>
                <strong className="text-[#131b2e]">420 Hectares</strong>
              </div>
              <div className="p-2.5 bg-[#f2f3ff] rounded-xl flex justify-between">
                <span className="text-[#414943]">Telemetry Probes</span>
                <strong className="text-[#006c49]">18 Calibrated Nodes</strong>
              </div>
              <div className="p-2.5 bg-[#f2f3ff] rounded-xl flex justify-between">
                <span className="text-[#414943]">Weather Feed</span>
                <strong className="text-[#006c49]">Live GPS Grid Telemetry</strong>
              </div>
            </div>

            <button
              onClick={() => setShowProfile(false)}
              className="w-full py-2.5 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
