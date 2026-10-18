import React, { useState } from 'react';
import { CropRecommendation, BuyerMessage, FarmExpense } from '../types';

// 1. Field Map Modal
export const FieldMapModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [activeSector, setActiveSector] = useState<'A-1' | 'B' | 'B-4'>('B');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div>
            <span className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">
              IoT Sensor Grid Map
            </span>
            <h3 className="text-[18px] font-bold text-[#002718]">Valley Green Fields</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#414943]"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Sector selector pills */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveSector('A-1')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
              activeSector === 'A-1' ? 'bg-[#002718] text-[#ffffff]' : 'bg-[#f2f3ff] text-[#414943]'
            }`}
          >
            Sector A-1 (Maize)
          </button>
          <button
            onClick={() => setActiveSector('B')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
              activeSector === 'B' ? 'bg-[#002718] text-[#ffffff]' : 'bg-[#f2f3ff] text-[#414943]'
            }`}
          >
            Sector B (Sensors)
          </button>
          <button
            onClick={() => setActiveSector('B-4')}
            className={`flex-1 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${
              activeSector === 'B-4' ? 'bg-[#002718] text-[#ffffff]' : 'bg-[#f2f3ff] text-[#414943]'
            }`}
          >
            GH B-4 (Peppers)
          </button>
        </div>

        {/* Interactive SVG Field Map */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#133e2b] p-3 text-white">
          <svg className="w-full h-full" viewBox="0 0 300 200">
            {/* Field parcels */}
            <rect x="15" y="15" width="120" height="80" rx="8" fill="#1b4d37" stroke="#6cf8bb" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="30" y="45" fill="#a3d1b6" fontSize="12" fontWeight="bold">Sector A-1</text>
            <text x="30" y="60" fill="#ffffff" fontSize="10">Golden Maize</text>

            <rect x="150" y="15" width="135" height="110" rx="8" fill="#006c49" opacity="0.6" stroke="#6ffbbe" strokeWidth="2" />
            <text x="165" y="40" fill="#6ffbbe" fontSize="12" fontWeight="bold">Sector B (Active)</text>
            <text x="165" y="55" fill="#ffffff" fontSize="10">Telemetry 18 Nodes</text>

            <rect x="15" y="105" width="120" height="80" rx="8" fill="#142600" stroke="#91db2a" strokeWidth="1.5" />
            <text x="30" y="135" fill="#acf847" fontSize="12" fontWeight="bold">Greenhouse B-4</text>
            <text x="30" y="150" fill="#ffffff" fontSize="10">Bell Pepper</text>

            {/* IoT sensor node dots with pulsing animations */}
            <circle cx="170" cy="80" r="5" fill="#6ffbbe" className="animate-ping" />
            <circle cx="170" cy="80" r="4" fill="#6ffbbe" />
            <circle cx="210" cy="70" r="4" fill="#6ffbbe" />
            <circle cx="250" cy="85" r="4" fill="#6ffbbe" />
            <circle cx="190" cy="105" r="4" fill="#6ffbbe" />
            <circle cx="240" cy="105" r="4" fill="#6ffbbe" />

            <circle cx="45" cy="75" r="3" fill="#6cf8bb" />
            <circle cx="85" cy="75" r="3" fill="#6cf8bb" />
            <circle cx="55" cy="165" r="3" fill="#acf847" />
            <circle cx="95" cy="165" r="3" fill="#acf847" />
          </svg>

          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[11px] bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#6ffbbe] animate-pulse"></span>
              All 18 Nodes Online
            </span>
            <span className="text-[#a3d1b6]">Solar Battery 98%</span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-[#f2f3ff] space-y-1.5">
          <div className="flex justify-between text-[12px] font-semibold text-[#131b2e]">
            <span>Sector Probe Selected:</span>
            <span className="text-[#006c49]">Probe #04 (Sector B Central)</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[11px]">
            <div className="bg-[#ffffff] p-2 rounded-lg">
              <span className="text-[#414943] block">Moisture</span>
              <strong className="text-[#002718] text-[13px]">42%</strong>
            </div>
            <div className="bg-[#ffffff] p-2 rounded-lg">
              <span className="text-[#414943] block">Temperature</span>
              <strong className="text-[#002718] text-[13px]">21.4°C</strong>
            </div>
            <div className="bg-[#ffffff] p-2 rounded-lg">
              <span className="text-[#414943] block">Conductivity</span>
              <strong className="text-[#002718] text-[13px]">1.4 mS/cm</strong>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px]"
        >
          Close Map
        </button>
      </div>
    </div>
  );
};

// 2. Post Listing Modal
export const PostListingModal: React.FC<{
  onClose: () => void;
  onPost: (listing: { title: string; category: string; quantityTons: number; askingPricePerTon: number; moisturePercent: number }) => void;
}> = ({ onClose, onPost }) => {
  const [title, setTitle] = useState('Organic Golden Corn (Harvested)');
  const [category, setCategory] = useState('Cereals');
  const [tons, setTons] = useState(20);
  const [price, setPrice] = useState(275);
  const [moisture, setMoisture] = useState(13.2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPost({
      title,
      category,
      quantityTons: tons,
      askingPricePerTon: price,
      moisturePercent: moisture,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <h3 className="text-[18px] font-bold text-[#002718]">Post Harvest Listing</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[12px] font-semibold text-[#414943] block mb-1">Lot Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none focus:border-[#006c49]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[12px] font-semibold text-[#414943] block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
              >
                <option value="Cereals">Cereals</option>
                <option value="Pulses">Pulses</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Oilseeds">Oilseeds</option>
              </select>
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#414943] block mb-1">Available Quantity (Tons)</label>
              <input
                type="number"
                value={tons}
                onChange={(e) => setTons(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
                min="1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[12px] font-semibold text-[#414943] block mb-1">Asking Price ($/ton)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
                min="10"
                required
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#414943] block mb-1">Moisture Level (%)</label>
              <input
                type="number"
                step="0.1"
                value={moisture}
                onChange={(e) => setMoisture(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="p-3 bg-[#e2e7ff] rounded-xl text-[11px] text-[#414943] flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006c49] text-[18px]">verified_user</span>
            <span>Listing is broadcast instantly to verified millers and procurement desks within 45 km.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#006c49] text-[#ffffff] rounded-xl font-semibold text-[13px] active:scale-[0.98] transition-all hover:bg-[#002718]"
          >
            Publish Live Listing
          </button>
        </form>
      </div>
    </div>
  );
};

// 3. Buyer Chat Modal
export const BuyerChatModal: React.FC<{
  buyer: BuyerMessage;
  onClose: () => void;
}> = ({ buyer, onClose }) => {
  const [messages, setMessages] = useState(buyer.history);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newMsg = {
      sender: 'farmer' as const,
      text: inputText,
      timestamp: 'Just now',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInputText('');

    // Buyer automated polite response simulation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'buyer',
          text: 'Thank you Alex! Our logistics dispatch is confirming carrier availability for farmgate pickup.',
          timestamp: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl shadow-2xl flex flex-col h-[520px] overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-[#002718] text-[#ffffff] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#6cf8bb] text-[#002113] font-bold flex items-center justify-center text-[12px]">
              {buyer.avatar}
            </div>
            <div>
              <h4 className="font-bold text-[14px] leading-tight">{buyer.buyerName}</h4>
              <span className="text-[10px] text-[#7da990]">{buyer.company} • Online</span>
            </div>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>

        {/* Chat Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#faf8ff]">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${m.sender === 'farmer' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-[13px] ${
                  m.sender === 'farmer'
                    ? 'bg-[#002718] text-[#ffffff] rounded-br-xs'
                    : 'bg-[#eaedff] text-[#131b2e] rounded-bl-xs'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[10px] text-[#414943] mt-0.5 px-1">{m.timestamp}</span>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-[#ffffff] border-t border-[#eaedff] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type message to buyer..."
            className="flex-1 px-3 py-2 bg-[#f2f3ff] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
          />
          <button
            type="submit"
            className="w-10 h-10 rounded-xl bg-[#006c49] text-[#ffffff] flex items-center justify-center active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
          </button>
        </form>
      </div>
    </div>
  );
};

// 4. Log Expense Modal
export const LogExpenseModal: React.FC<{
  onClose: () => void;
  onSave: (expense: FarmExpense) => void;
}> = ({ onClose, onSave }) => {
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<FarmExpense['category']>('Fuel');
  const [amount, setAmount] = useState<number>(85.00);
  const [parcel, setParcel] = useState('Sector B');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    onSave({
      id: `exp-${Date.now()}`,
      category,
      description,
      amount,
      date: 'Today',
      parcel,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <h3 className="text-[18px] font-bold text-[#002718]">Log Farm Expense</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-[12px] font-semibold text-[#414943] block mb-1">Expense Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as FarmExpense['category'])}
              className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
            >
              <option value="Fuel">Fuel (Diesel / Equipment)</option>
              <option value="Seeds">Seeds & Seedlings</option>
              <option value="Labor">Labor & Hand Harvesting</option>
              <option value="Fertilizer & Spray">Fertilizer & Crop Protection</option>
              <option value="Equipment">Equipment & Irrigation Maintenance</option>
            </select>
          </div>

          <div>
            <label className="text-[12px] font-semibold text-[#414943] block mb-1">Description</label>
            <input
              type="text"
              placeholder="e.g. 50L Tractor Diesel for Row Harrowing"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[12px] font-semibold text-[#414943] block mb-1">Amount ($ USD)</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[12px] font-semibold text-[#414943] block mb-1">Parcel / Location</label>
              <input
                type="text"
                value={parcel}
                onChange={(e) => setParcel(e.target.value)}
                className="w-full px-3 py-2 bg-[#f2f3ff] border border-[#dae2fd] rounded-xl text-[13px] text-[#131b2e] focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px] active:scale-[0.98] transition-all hover:bg-[#006c49]"
          >
            Record in Ledger
          </button>
        </form>
      </div>
    </div>
  );
};

// 5. Cultivation Guide Modal
export const CultivationGuideModal: React.FC<{
  crop: CropRecommendation;
  onClose: () => void;
}> = ({ crop, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div>
            <span className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">
              Agronomy Field Playbook
            </span>
            <h3 className="text-[18px] font-bold text-[#002718]">{crop.title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-[#006c49] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">terrain</span> Soil Preparation
            </span>
            <p className="text-[13px] text-[#131b2e] leading-snug">{crop.cultivationGuide.soilPreparation}</p>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-[#006c49] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">calendar_month</span> Sowing Period
            </span>
            <p className="text-[13px] text-[#131b2e] leading-snug">{crop.cultivationGuide.sowingPeriod}</p>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-[#006c49] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">water</span> Irrigation Method
            </span>
            <p className="text-[13px] text-[#131b2e] leading-snug">{crop.cultivationGuide.irrigationMethod}</p>
          </div>

          <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-1">
            <span className="text-[11px] font-bold text-[#006c49] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">science</span> Fertilizer Schedule
            </span>
            <p className="text-[13px] text-[#131b2e] leading-snug">{crop.cultivationGuide.fertilizerSchedule}</p>
          </div>

          <div className="p-3 bg-[#ffdad6]/40 rounded-xl space-y-1 border border-[#ffdad6]">
            <span className="text-[11px] font-bold text-[#ba1a1a] uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">pest_control</span> Pest Vigilance
            </span>
            <p className="text-[13px] text-[#93000a] leading-snug">{crop.cultivationGuide.pestVigilance}</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px]"
        >
          Got It
        </button>
      </div>
    </div>
  );
};

// 6. Cost Sheet Modal
export const CostSheetModal: React.FC<{
  crop: CropRecommendation;
  onClose: () => void;
}> = ({ crop, onClose }) => {
  const b = crop.costBreakdown;
  const totalCost = b.seeds + b.fertilizers + b.irrigation + b.labor;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div>
            <span className="text-[10px] text-[#006c49] font-bold uppercase tracking-wider">
              Projected Unit Economics
            </span>
            <h3 className="text-[18px] font-bold text-[#002718]">{crop.title}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2 text-[13px]">
          <div className="flex justify-between py-1.5 border-b border-[#f2f3ff]">
            <span className="text-[#414943]">Hybrid Seed Stock / acre</span>
            <strong className="text-[#131b2e]">${b.seeds}</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#f2f3ff]">
            <span className="text-[#414943]">Fertilizers & Nutrients</span>
            <strong className="text-[#131b2e]">${b.fertilizers}</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#f2f3ff]">
            <span className="text-[#414943]">Precision Drip Irrigation</span>
            <strong className="text-[#131b2e]">${b.irrigation}</strong>
          </div>
          <div className="flex justify-between py-1.5 border-b border-[#f2f3ff]">
            <span className="text-[#414943]">Seasonal Labor & Tillage</span>
            <strong className="text-[#131b2e]">${b.labor}</strong>
          </div>

          <div className="flex justify-between py-2 text-[#002718] font-bold border-t border-[#eaedff]">
            <span>Total Estimated Cost / acre</span>
            <span>${totalCost}</span>
          </div>

          <div className="flex justify-between py-2 text-[#006c49] font-bold bg-[#6cf8bb]/20 p-2.5 rounded-xl">
            <span>Projected Net Revenue / acre</span>
            <span>+${b.netMargin}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px]"
        >
          Confirm Unit Plan
        </button>
      </div>
    </div>
  );
};

// 7. Alert Details Modal
export const AlertDetailsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#eaedff]">
          <span className="material-symbols-outlined text-[24px] text-[#ba1a1a]">warning</span>
          <div>
            <h3 className="text-[18px] font-bold text-[#ba1a1a]">Critical Spray Alert Window</h3>
            <span className="text-[11px] text-[#414943]">Sector B Microclimate Sensors</span>
          </div>
        </div>

        <div className="space-y-3 text-[13px]">
          <p className="text-[#131b2e] leading-relaxed">
            Relative humidity has surged to <strong>62%</strong> with expected cloud cover. These conditions create optimal spore germination temperatures for powdery mildew (Erysiphaceae).
          </p>

          <div className="p-3 bg-[#ffdad6]/40 rounded-xl space-y-1">
            <span className="font-bold text-[#ba1a1a] block">Prohibited Spray Window</span>
            <p className="text-[#93000a] text-[12px]">
              12:00 PM – 3:00 PM: Thermal updrafts exceed 9 km/h wind gusts, resulting in droplet drift off target foliage.
            </p>
          </div>

          <div className="p-3 bg-[#6cf8bb]/20 rounded-xl space-y-1">
            <span className="font-bold text-[#006c49] block">Recommended Action</span>
            <p className="text-[#00714d] text-[12px]">
              Perform foliar bio-spray between <strong>5:30 AM – 7:45 AM tomorrow</strong> or during still dusk conditions.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px]"
        >
          Acknowledge Alert
        </button>
      </div>
    </div>
  );
};

// 8. Notifications Drawer
export const NotificationsDrawer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#ffffff] w-full max-w-md rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[20px] text-[#006c49]">notifications</span>
            <h3 className="text-[18px] font-bold text-[#131b2e]">Notifications</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">warning</span>
            <div>
              <span className="font-bold text-[12px] text-[#ba1a1a] block">Critical Spray Window</span>
              <p className="text-[12px] text-[#93000a]">Avoid foliar chemical spray between 12:00 PM – 3:00 PM.</p>
              <span className="text-[10px] text-[#93000a]/80 mt-1 block">15m ago</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#6cf8bb]/20 border border-[#6cf8bb]/40 flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#006c49] text-[20px]">handshake</span>
            <div>
              <span className="font-bold text-[12px] text-[#006c49] block">New Top Bid on Golden Corn</span>
              <p className="text-[12px] text-[#00714d]">Sunrise Grain Co. offered $268/ton for 15 tons.</p>
              <span className="text-[10px] text-[#00714d]/80 mt-1 block">45m ago</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#002718] text-[20px]">sensors</span>
            <div>
              <span className="font-bold text-[12px] text-[#131b2e] block">Soil Matrix Telemetry Calibrated</span>
              <p className="text-[12px] text-[#414943]">18 IoT sensor probes updated with depth 25cm readings.</p>
              <span className="text-[10px] text-[#414943] mt-1 block">2h ago</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#002718] text-[#ffffff] rounded-xl font-semibold text-[13px]"
        >
          Dismiss All
        </button>
      </div>
    </div>
  );
};
