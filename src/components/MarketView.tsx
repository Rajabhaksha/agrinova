import React, { useState } from 'react';
import { CommodityRate, MarketplaceListing, BuyerMessage } from '../types';
import { INITIAL_COMMODITIES, INITIAL_LISTING, BUYER_INQUIRIES } from '../data/mockData';

interface MarketViewProps {
  onOpenPostListing: () => void;
  onOpenChat: (buyer: BuyerMessage) => void;
  onTradeCommodity: (commodity: CommodityRate) => void;
}

export const MarketView: React.FC<MarketViewProps> = ({
  onOpenPostListing,
  onOpenChat,
  onTradeCommodity,
}) => {
  const [viewMode, setViewMode] = useState<'live-rates' | 'my-listings' | 'buyer-inquiries'>('live-rates');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Commodities');
  const [commodities] = useState<CommodityRate[]>(INITIAL_COMMODITIES);
  const [listing, setListing] = useState<MarketplaceListing>(INITIAL_LISTING);
  const [bidAccepted, setBidAccepted] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [terminalDistance, setTerminalDistance] = useState(45);

  const categories = ['All Commodities', 'Cereals', 'Pulses', 'Vegetables', 'Oilseeds'];

  const filteredCommodities = selectedCategory === 'All Commodities'
    ? commodities
    : commodities.filter((c) => c.category === selectedCategory);

  const handleAcceptBid = () => {
    setBidAccepted(true);
    setListing((prev) => ({
      ...prev,
      status: 'Completed',
    }));
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* Segmented View Mode Switcher */}
      <div className="flex items-center p-1 bg-[#eaedff] rounded-xl shadow-sm">
        <button
          onClick={() => setViewMode('live-rates')}
          className={`flex-1 py-2 px-1 rounded-lg flex items-center justify-center gap-1 transition-all text-[12px] font-['Inter'] font-semibold ${
            viewMode === 'live-rates'
              ? 'bg-[#ffffff] shadow-sm text-[#131b2e]'
              : 'text-[#414943] hover:text-[#131b2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px] text-[#006c49]">trending_up</span>
          <span className="truncate">Live Rates</span>
        </button>

        <button
          onClick={() => setViewMode('my-listings')}
          className={`flex-1 py-2 px-1 rounded-lg flex items-center justify-center gap-1 transition-all text-[12px] font-['Inter'] font-semibold ${
            viewMode === 'my-listings'
              ? 'bg-[#ffffff] shadow-sm text-[#131b2e]'
              : 'text-[#414943] hover:text-[#131b2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">inventory_2</span>
          <span className="truncate">Listings</span>
        </button>

        <button
          onClick={() => setViewMode('buyer-inquiries')}
          className={`flex-1 py-2 px-1 rounded-lg flex items-center justify-center gap-1 transition-all text-[12px] font-['Inter'] font-semibold relative ${
            viewMode === 'buyer-inquiries'
              ? 'bg-[#ffffff] shadow-sm text-[#131b2e]'
              : 'text-[#414943] hover:text-[#131b2e]'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">forum</span>
          <span className="truncate">Enquiries</span>
          <span className="w-4 h-4 rounded-full bg-[#006c49] text-[#ffffff] font-['Inter'] text-[10px] flex items-center justify-center">
            {BUYER_INQUIRIES.length}
          </span>
        </button>
      </div>

      {/* Terminal Bar & Category Filter */}
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between p-2.5 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-[#6cf8bb]/40 flex items-center justify-center text-[#006c49] shrink-0">
              <span className="material-symbols-outlined text-[18px]">share_location</span>
            </div>
            <div className="min-w-0">
              <span className="font-['Inter'] text-[10px] text-[#414943] uppercase tracking-wider block font-medium">
                Terminal Hub
              </span>
              <span className="font-['Inter'] text-[12px] font-bold text-[#131b2e] truncate block">
                Central Agri Terminal (within {terminalDistance} km)
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-2.5 py-1.5 rounded-lg bg-[#dae2fd] text-[#131b2e] flex items-center gap-1 shrink-0 active:scale-95 transition-transform hover:bg-[#eaedff]"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            <span className="font-['Inter'] text-[10px] font-bold">Filters</span>
          </button>
        </div>

        {/* Category Filter Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-['Inter'] text-[12px] font-semibold shrink-0 flex items-center gap-1 transition-all ${
                  isSelected
                    ? 'bg-[#002718] text-[#ffffff] shadow-sm'
                    : 'bg-[#eaedff] text-[#414943] hover:bg-[#e2e7ff]'
                }`}
                type="button"
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Conditional rendering by view mode */}
      {viewMode === 'live-rates' && (
        <>
          {/* Real-time Market Ticker Ribbon */}
          <div className="flex items-center justify-between px-3 py-2 bg-[#133e2b] text-[#ffffff] rounded-xl shadow-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6ffbbe] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6ffbbe]"></span>
              </span>
              <span className="font-['Inter'] text-[10px] uppercase tracking-wider text-[#7da990] font-bold">
                Live Mandi Stream
              </span>
            </div>
            <span className="font-['Inter'] text-[10px] text-[#6ffbbe] font-semibold">Updated 3m ago</span>
          </div>

          {/* Live Price Cards Stack */}
          <div className="flex flex-col space-y-3">
            {/* Card 1: Wheat */}
            <div className="p-3.5 bg-[#ffffff] rounded-xl shadow-sm flex flex-col space-y-3 border border-[#eaedff]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#eaedff]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Premium Durum Wheat"
                      src={commodities[0].imageUrl}
                    />
                  </div>
                  <div>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] leading-tight">
                      {commodities[0].name}
                    </h3>
                    <span className="font-['Inter'] text-[10px] text-[#414943]">
                      {commodities[0].location} • Lot #{commodities[0].lotId}
                    </span>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#006c49] font-['Inter'] text-[10px] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]">arrow_drop_up</span>
                  <span>+{commodities[0].changePercent}%</span>
                </div>
              </div>

              <div className="flex items-end justify-between pt-1">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Plus+Jakarta+Sans'] text-[24px] font-bold text-[#131b2e]">
                      ${commodities[0].price}
                    </span>
                    <span className="font-['Inter'] text-[10px] text-[#414943]">/ {commodities[0].unit}</span>
                  </div>
                  <span className="font-['Inter'] text-[10px] text-[#006c49] font-semibold">
                    +${commodities[0].changeValue.toFixed(2)} today
                  </span>
                </div>

                {/* Inline Upward Sparkline */}
                <div className="w-24 h-9">
                  <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 36">
                    <path
                      d="M 2 30 Q 15 28 28 22 T 55 18 T 80 8 L 98 4"
                      stroke="#006c49"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 2 30 Q 15 28 28 22 T 55 18 T 80 8 L 98 4 L 98 36 L 2 36 Z"
                      fill="url(#wheat-grad)"
                      opacity="0.18"
                    />
                    <circle cx="98" cy="4" fill="#006c49" r="3"></circle>
                    <defs>
                      <linearGradient id="wheat-grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#006c49"></stop>
                        <stop offset="100%" stopColor="#006c49" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 bg-[#f2f3ff] p-2 rounded-lg">
                <div className="flex items-center gap-1.5 text-[#414943] min-w-0">
                  <span className="material-symbols-outlined text-[16px] text-[#006c49]">trending_up</span>
                  <span className="font-['Inter'] text-[10px] truncate">{commodities[0].insight}</span>
                </div>
                <button
                  onClick={() => onTradeCommodity(commodities[0])}
                  className="font-['Inter'] text-[10px] text-[#006c49] font-bold shrink-0 hover:underline active:scale-95 ml-2"
                  type="button"
                >
                  Trade
                </button>
              </div>
            </div>

            {/* Card 2: Roma Tomatoes */}
            <div className="p-3.5 bg-[#ffffff] rounded-xl shadow-sm flex flex-col space-y-3 border border-[#eaedff]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#eaedff]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Grade-A Roma Tomatoes"
                      src={commodities[1].imageUrl}
                    />
                  </div>
                  <div>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] leading-tight">
                      {commodities[1].name}
                    </h3>
                    <span className="font-['Inter'] text-[10px] text-[#414943]">
                      {commodities[1].location} • {commodities[1].lotId}
                    </span>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] font-['Inter'] text-[10px] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]">arrow_drop_down</span>
                  <span>{commodities[1].changePercent}%</span>
                </div>
              </div>

              <div className="flex items-end justify-between pt-1">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Plus+Jakarta+Sans'] text-[24px] font-bold text-[#131b2e]">
                      ${commodities[1].price.toFixed(2)}
                    </span>
                    <span className="font-['Inter'] text-[10px] text-[#414943]">/ {commodities[1].unit}</span>
                  </div>
                  <span className="font-['Inter'] text-[10px] text-[#ba1a1a] font-semibold">
                    -${Math.abs(commodities[1].changeValue).toFixed(2)} today
                  </span>
                </div>

                {/* Inline Downward Sparkline */}
                <div className="w-24 h-9">
                  <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 36">
                    <path
                      d="M 2 6 Q 20 8 38 15 T 70 24 T 98 32"
                      stroke="#ba1a1a"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 2 6 Q 20 8 38 15 T 70 24 T 98 32 L 98 36 L 2 36 Z"
                      fill="url(#tomato-grad)"
                      opacity="0.15"
                    />
                    <circle cx="98" cy="32" fill="#ba1a1a" r="3"></circle>
                    <defs>
                      <linearGradient id="tomato-grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#ba1a1a"></stop>
                        <stop offset="100%" stopColor="#ba1a1a" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 bg-[#ffdad6]/30 p-2 rounded-lg">
                <div className="flex items-center gap-1.5 text-[#414943] min-w-0">
                  <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">warning</span>
                  <span className="font-['Inter'] text-[10px] truncate text-[#414943]">
                    {commodities[1].insight}
                  </span>
                </div>
                <button
                  onClick={() => onTradeCommodity(commodities[1])}
                  className="font-['Inter'] text-[10px] text-[#006c49] font-bold shrink-0 hover:underline active:scale-95 ml-2"
                  type="button"
                >
                  Cold Storage
                </button>
              </div>
            </div>

            {/* Card 3: Basmati Rice */}
            <div className="p-3.5 bg-[#ffffff] rounded-xl shadow-sm flex flex-col space-y-3 border border-[#eaedff]">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#eaedff]">
                    <img
                      className="w-full h-full object-cover"
                      alt="Basmati Paddy Rice"
                      src={commodities[2].imageUrl}
                    />
                  </div>
                  <div>
                    <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] leading-tight">
                      {commodities[2].name}
                    </h3>
                    <span className="font-['Inter'] text-[10px] text-[#414943]">
                      {commodities[2].location} • {commodities[2].lotId}
                    </span>
                  </div>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#006c49] font-['Inter'] text-[10px] font-bold flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[13px]">arrow_drop_up</span>
                  <span>+{commodities[2].changePercent}%</span>
                </div>
              </div>

              <div className="flex items-end justify-between pt-1">
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-['Plus+Jakarta+Sans'] text-[24px] font-bold text-[#131b2e]">
                      ${commodities[2].price}
                    </span>
                    <span className="font-['Inter'] text-[10px] text-[#414943]">/ {commodities[2].unit}</span>
                  </div>
                  <span className="font-['Inter'] text-[10px] text-[#006c49] font-semibold">
                    +${commodities[2].changeValue.toFixed(2)} today
                  </span>
                </div>

                {/* Inline Steady Sparkline */}
                <div className="w-24 h-9">
                  <svg className="w-full h-full overflow-visible" fill="none" viewBox="0 0 100 36">
                    <path
                      d="M 2 24 Q 25 18 45 22 T 75 14 T 98 12"
                      stroke="#006c49"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                    <path
                      d="M 2 24 Q 25 18 45 22 T 75 14 T 98 12 L 98 36 L 2 36 Z"
                      fill="url(#rice-grad)"
                      opacity="0.18"
                    />
                    <circle cx="98" cy="12" fill="#006c49" r="3"></circle>
                    <defs>
                      <linearGradient id="rice-grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#006c49"></stop>
                        <stop offset="100%" stopColor="#006c49" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 bg-[#f2f3ff] p-2 rounded-lg">
                <div className="flex items-center gap-1.5 text-[#414943] min-w-0">
                  <span className="material-symbols-outlined text-[16px] text-[#006c49]">local_shipping</span>
                  <span className="font-['Inter'] text-[10px] truncate">{commodities[2].insight}</span>
                </div>
                <button
                  onClick={() => onTradeCommodity(commodities[2])}
                  className="font-['Inter'] text-[10px] text-[#006c49] font-bold shrink-0 hover:underline active:scale-95 ml-2"
                  type="button"
                >
                  Trade
                </button>
              </div>
            </div>
          </div>

          {/* Predictive AI Forecast Banner */}
          <div className="p-3.5 rounded-xl bg-[#e2e7ff] relative overflow-hidden border border-[#dae2fd]">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#002718] text-[#ffffff] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-['Inter'] text-[12px] text-[#002718] font-bold">
                    AgriNova AI Forecast
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#414943] font-['Inter'] text-[10px] font-semibold">
                    High Confidence
                  </span>
                </div>
                <p className="font-['Inter'] text-[12px] text-[#414943] mt-1 leading-snug">
                  Wheat prices projected to peak in 10-14 days. Ideal selling window approaching before overseas shipments dock.
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Direct Farmer-to-Buyer Marketplace Section (shown in all or my-listings) */}
      {(viewMode === 'live-rates' || viewMode === 'my-listings') && (
        <div className="pt-2 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-['Plus+Jakarta+Sans'] text-[22px] font-bold text-[#131b2e] leading-tight">
                Direct Marketplace
              </h2>
              <p className="font-['Inter'] text-[12px] text-[#414943]">
                Sell direct to verified grain elevators & food companies
              </p>
            </div>
            <button
              onClick={onOpenPostListing}
              className="h-10 px-3 rounded-xl bg-[#002718] text-[#ffffff] font-['Inter'] text-[12px] font-semibold flex items-center gap-1 active:scale-95 transition-all shadow-sm hover:bg-[#006c49]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Post Listing</span>
            </button>
          </div>

          {/* Active Farmer Listing Card with Buyer Bids */}
          <div className="p-4 bg-[#ffffff] rounded-xl shadow-sm flex flex-col space-y-3.5 border border-[#eaedff]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-[#eaedff]">
                  <img
                    className="w-full h-full object-cover"
                    alt="Active harvest lot"
                    src={listing.imageUrl}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/40 text-[#006c49] font-['Inter'] text-[10px] font-bold">
                      {listing.status === 'Completed' ? 'Sold' : 'Active Listing'}
                    </span>
                    <span className="font-['Inter'] text-[10px] text-[#414943]">{listing.lotCode}</span>
                  </div>
                  <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e] mt-0.5">
                    {listing.title}
                  </h3>
                  <span className="font-['Inter'] text-[12px] text-[#414943]">
                    {listing.quantityTons} Tons Available • Moisture &lt; {listing.moisturePercent}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="font-['Inter'] text-[10px] text-[#414943] block">Asking</span>
                <span className="font-['Plus+Jakarta+Sans'] text-[24px] font-bold text-[#131b2e]">
                  ${listing.askingPricePerTon}
                </span>
                <span className="font-['Inter'] text-[10px] text-[#414943]">/ ton</span>
              </div>
            </div>

            {/* Highest Bid Preview Box */}
            {listing.highestBid && (
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[#dae2fd] flex items-center justify-center font-bold text-[#002718] font-['Inter'] text-[10px]">
                      SG
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-['Inter'] text-[12px] font-semibold text-[#131b2e]">
                          {listing.highestBid.buyerName}
                        </span>
                        <span className="material-symbols-outlined text-[14px] text-[#006c49]">verified</span>
                      </div>
                      <span className="font-['Inter'] text-[10px] text-[#414943]">
                        Rating {listing.highestBid.buyerRating} • {listing.highestBid.completedDeals} completed deals
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Inter'] text-[10px] text-[#006c49] font-bold block">Top Bid</span>
                    <span className="font-['Inter'] text-[12px] font-bold text-[#131b2e]">
                      ${listing.highestBid.bidPricePerTon}/ton
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[#414943] font-['Inter'] text-[10px] pt-1">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">local_shipping</span>
                    <span>{listing.highestBid.logisticsNote}</span>
                  </div>
                  <span className="text-[#006c49] font-semibold">
                    {listing.highestBid.bidsCount} bids waiting
                  </span>
                </div>
              </div>
            )}

            {/* Bid Action Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => onOpenChat(BUYER_INQUIRIES[1])}
                className="h-11 rounded-xl bg-[#eaedff] text-[#131b2e] font-['Inter'] text-[12px] font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all hover:bg-[#e2e7ff]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>Message Buyer</span>
              </button>

              <button
                onClick={handleAcceptBid}
                disabled={bidAccepted}
                className={`h-11 rounded-xl text-[#ffffff] font-['Inter'] text-[12px] font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all ${
                  bidAccepted ? 'bg-[#002718]' : 'bg-[#006c49] hover:bg-[#002718]'
                }`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {bidAccepted ? 'done_all' : 'check_circle'}
                </span>
                <span>{bidAccepted ? 'Bid Accepted ($4,020)!' : 'Accept $268/ton'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Buyer Inquiries Preview / Tab */}
      <div
        onClick={() => onOpenChat(BUYER_INQUIRIES[0])}
        className="p-3.5 bg-[#eaedff] rounded-xl flex items-center justify-between cursor-pointer hover:bg-[#dae2fd] transition-all border border-[#dae2fd]"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#6cf8bb]/50 text-[#006c49] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">mark_chat_unread</span>
          </div>
          <div className="min-w-0">
            <h4 className="font-['Inter'] text-[12px] text-[#131b2e] font-bold truncate">
              3 Direct Buyer Inquiries
            </h4>
            <p className="font-['Inter'] text-[12px] text-[#414943] truncate">
              Agrimax Milling: “Can you do 20 tons delivery by Friday?”
            </p>
          </div>
        </div>
        <button
          className="w-8 h-8 rounded-full bg-[#ffffff] flex items-center justify-center text-[#131b2e] active:scale-95 transition-all shrink-0 ml-2"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>

      {/* If user clicked Enquiries tab, show full inbox */}
      {viewMode === 'buyer-inquiries' && (
        <div className="space-y-3 pt-2">
          <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">
            Direct Procurement Conversations
          </h3>
          {BUYER_INQUIRIES.map((buyer) => (
            <div
              key={buyer.id}
              onClick={() => onOpenChat(buyer)}
              className="p-3.5 bg-[#ffffff] rounded-xl border border-[#eaedff] flex items-center justify-between cursor-pointer hover:bg-[#f2f3ff] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#133e2b] text-[#ffffff] font-bold flex items-center justify-center text-[13px]">
                  {buyer.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[13px] text-[#131b2e]">{buyer.buyerName}</span>
                    <span className="text-[10px] text-[#414943]">{buyer.time}</span>
                  </div>
                  <p className="text-[12px] text-[#414943] line-clamp-1">{buyer.lastMessage}</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#006c49]">chat</span>
            </div>
          ))}
        </div>
      )}

      {/* Filter modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#ffffff] w-full max-w-sm rounded-2xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <h3 className="text-[16px] font-bold text-[#131b2e]">Terminal & Radius Filter</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-7 h-7 rounded-full bg-[#f2f3ff] flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#414943] block mb-1">
                Max Distance from Farm: <strong className="text-[#006c49]">{terminalDistance} km</strong>
              </label>
              <input
                type="range"
                min="10"
                max="120"
                value={terminalDistance}
                onChange={(e) => setTerminalDistance(Number(e.target.value))}
                className="w-full accent-[#006c49]"
              />
            </div>
            <button
              onClick={() => setShowFilterModal(false)}
              className="w-full py-2.5 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px]"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
