import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { FarmExpense } from '../types';

interface FinancesViewProps {
  expenses: FarmExpense[];
  onOpenLogExpense: () => void;
}

interface MonthlyTrendPoint {
  month: string;
  total: number;
  fuel: number;
  inputs: number;
  labor: number;
  notes: string;
}

const MONTHLY_EXPENSE_DATA: MonthlyTrendPoint[] = [
  { month: 'May', total: 1960, fuel: 420, inputs: 890, labor: 650, notes: 'Land Tillage & Seed Bedding' },
  { month: 'Jun', total: 1310, fuel: 310, inputs: 480, labor: 520, notes: 'Vegetative Growth & Weeding' },
  { month: 'Jul', total: 1490, fuel: 290, inputs: 620, labor: 580, notes: 'Pollination & Foliar Nutrients' },
  { month: 'Aug', total: 1210, fuel: 340, inputs: 380, labor: 490, notes: 'Drip Irrigation Maintenance' },
  { month: 'Sep', total: 1550, fuel: 480, inputs: 350, labor: 720, notes: 'Early Harvest Prep & Grain Drying' },
  { month: 'Oct', total: 1120, fuel: 290, inputs: 320, labor: 510, notes: 'Harvest Operations & Hauling' },
];

export const FinancesView: React.FC<FinancesViewProps> = ({ expenses, onOpenLogExpense }) => {
  const [activeMetric, setActiveMetric] = useState<'total' | 'breakdown'>('total');
  const [selectedPoint, setSelectedPoint] = useState<MonthlyTrendPoint | null>(null);

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalRevenue = 18450;
  const netProfit = totalRevenue - totalExpenses;

  // Calculate seasonal average
  const avgMonthly = Math.round(
    MONTHLY_EXPENSE_DATA.reduce((acc, curr) => acc + curr.total, 0) / MONTHLY_EXPENSE_DATA.length
  );

  return (
    <div className="flex flex-col w-full pb-8 space-y-4">
      {/* Financial Overview Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#002718] via-[#133e2b] to-[#006c49] p-4 text-[#ffffff] shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider text-[#6ffbbe] bg-[#6cf8bb]/20 px-2 py-0.5 rounded-full">
            Harvest Season 2024 P&L
          </span>
          <span className="text-[11px] text-[#7da990]">Q3 Settled</span>
        </div>

        <div className="mt-1">
          <span className="text-[11px] text-[#7da990] block">Estimated Net Farm Profit</span>
          <h2 className="font-['Plus+Jakarta+Sans'] text-[32px] font-bold text-[#ffffff] tracking-tight">
            ${netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/15">
          <div>
            <span className="text-[10px] text-[#7da990] block">Gross Harvest Sales</span>
            <span className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-[#6ffbbe]">
              ${totalRevenue.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#7da990] block">Logged Input Costs</span>
            <span className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-[#ffdad6]">
              ${totalExpenses.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Monthly Expense Trends Chart Card */}
      <div className="bg-[#ffffff] rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006c49] text-[20px]">
                show_chart
              </span>
              <h3 className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-[#131b2e]">
                Operational Expense Trends
              </h3>
            </div>
            <span className="font-['Inter'] text-[11px] text-[#414943] block mt-0.5">
              Monthly cost trajectory across 2024 harvest cycle
            </span>
          </div>

          {/* Toggle View: Total vs Category Breakdown */}
          <div className="flex items-center p-0.5 rounded-lg bg-[#eaedff] shrink-0">
            <button
              onClick={() => setActiveMetric('total')}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all ${
                activeMetric === 'total'
                  ? 'bg-[#002718] text-[#ffffff] shadow-sm'
                  : 'text-[#414943] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              Total
            </button>
            <button
              onClick={() => setActiveMetric('breakdown')}
              className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-all ${
                activeMetric === 'breakdown'
                  ? 'bg-[#002718] text-[#ffffff] shadow-sm'
                  : 'text-[#414943] hover:text-[#131b2e]'
              }`}
              type="button"
            >
              By Category
            </button>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] p-2.5 rounded-xl text-center text-[11px]">
          <div>
            <span className="text-[#414943] block text-[10px]">Monthly Avg</span>
            <strong className="text-[#002718] font-bold text-[13px]">${avgMonthly}</strong>
          </div>
          <div>
            <span className="text-[#414943] block text-[10px]">Peak Month</span>
            <strong className="text-[#ba1a1a] font-bold text-[13px]">$1,960 (May)</strong>
          </div>
          <div>
            <span className="text-[#414943] block text-[10px]">Current Month</span>
            <strong className="text-[#006c49] font-bold text-[13px]">$1,120 (Oct)</strong>
          </div>
        </div>

        {/* Recharts Line Graph Container */}
        <div className="w-full h-56 pt-2 select-none">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={MONTHLY_EXPENSE_DATA}
              margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
              onClick={(e: any) => {
                if (e && e.activePayload && e.activePayload[0]) {
                  setSelectedPoint(e.activePayload[0].payload as MonthlyTrendPoint);
                }
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaedff" />
              <XAxis
                dataKey="month"
                stroke="#717973"
                tick={{ fontSize: 11, fill: '#414943' }}
                tickLine={false}
                axisLine={{ stroke: '#dae2fd' }}
              />
              <YAxis
                stroke="#717973"
                tick={{ fontSize: 10, fill: '#414943' }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as MonthlyTrendPoint;
                    return (
                      <div className="bg-[#002718] text-[#ffffff] p-2.5 rounded-xl shadow-xl text-[11px] border border-[#6cf8bb]/30 space-y-1">
                        <div className="flex items-center justify-between gap-3 border-b border-white/20 pb-1">
                          <strong className="font-bold text-[#6ffbbe]">{data.month} 2024</strong>
                          <span className="font-bold text-[13px]">${data.total}</span>
                        </div>
                        {activeMetric === 'breakdown' ? (
                          <div className="space-y-0.5 pt-0.5 text-[10px]">
                            <div className="flex justify-between gap-3 text-[#a3d1b6]">
                              <span>Fuel:</span>
                              <strong>${data.fuel}</strong>
                            </div>
                            <div className="flex justify-between gap-3 text-[#6cf8bb]">
                              <span>Seeds & Spray:</span>
                              <strong>${data.inputs}</strong>
                            </div>
                            <div className="flex justify-between gap-3 text-[#ffdad6]">
                              <span>Labor:</span>
                              <strong>${data.labor}</strong>
                            </div>
                          </div>
                        ) : (
                          <p className="text-[10px] text-[#a3d1b6]">{data.notes}</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {activeMetric === 'total' ? (
                <Line
                  type="monotone"
                  dataKey="total"
                  name="Total Operational Cost"
                  stroke="#006c49"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#006c49', stroke: '#ffffff', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#6cf8bb', stroke: '#002718', strokeWidth: 2 }}
                />
              ) : (
                <>
                  <Legend
                    verticalAlign="top"
                    height={30}
                    iconType="circle"
                    wrapperStyle={{ fontSize: '10px', paddingTop: '0px' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="fuel"
                    name="Fuel"
                    stroke="#002718"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inputs"
                    name="Seeds & Spray"
                    stroke="#006c49"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="labor"
                    name="Labor"
                    stroke="#ba1a1a"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Selected Month Note Banner */}
        {selectedPoint && (
          <div className="p-2.5 rounded-lg bg-[#f2f3ff] flex items-center justify-between text-[11px] animate-fade-in border border-[#dae2fd]">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-[#006c49]">
                info
              </span>
              <span>
                <strong>{selectedPoint.month} Focus:</strong> {selectedPoint.notes} (${selectedPoint.total})
              </span>
            </div>
            <button
              onClick={() => setSelectedPoint(null)}
              className="text-[#414943] hover:text-[#002718] font-bold text-[10px]"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Quick Action & Breakdown */}
      <div className="flex items-center justify-between">
        <h3 className="font-['Plus+Jakarta+Sans'] text-[18px] font-bold text-[#131b2e]">
          Operational Expense Log
        </h3>
        <button
          onClick={onOpenLogExpense}
          className="h-9 px-3 rounded-lg bg-[#002718] text-[#ffffff] font-semibold text-[12px] flex items-center gap-1 active:scale-95 transition-all hover:bg-[#006c49]"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>Log Expense</span>
        </button>
      </div>

      {/* Expenses Ledger */}
      <div className="bg-[#ffffff] rounded-xl p-3 shadow-sm border border-[#eaedff] divide-y divide-[#eaedff]">
        {expenses.map((item) => (
          <div key={item.id} className="py-2.5 first:pt-1 last:pb-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#006c49]">
                <span className="material-symbols-outlined text-[18px]">
                  {item.category === 'Fuel'
                    ? 'local_gas_station'
                    : item.category === 'Seeds'
                    ? 'grain'
                    : item.category === 'Labor'
                    ? 'group'
                    : 'science'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-[13px] text-[#131b2e] block leading-tight">
                  {item.description}
                </span>
                <span className="text-[11px] text-[#414943]">
                  {item.parcel} • {item.date}
                </span>
              </div>
            </div>
            <span className="font-['Plus+Jakarta+Sans'] font-bold text-[14px] text-[#ba1a1a]">
              -${item.amount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* ROI by Parcel Card */}
      <div className="bg-[#ffffff] rounded-xl p-4 shadow-sm border border-[#eaedff] space-y-3">
        <h4 className="font-['Plus+Jakarta+Sans'] text-[16px] font-bold text-[#131b2e]">
          Yield Return per Parcel
        </h4>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[12px] font-semibold">
              <span>Sector A-1 (Golden Maize)</span>
              <span className="text-[#006c49] font-bold">+142% ROI</span>
            </div>
            <div className="w-full bg-[#eaedff] h-2 rounded-full mt-1 overflow-hidden">
              <div className="bg-[#006c49] h-full rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-[12px] font-semibold">
              <span>Greenhouse B-4 (Bell Pepper)</span>
              <span className="text-[#006c49] font-bold">+118% ROI</span>
            </div>
            <div className="w-full bg-[#eaedff] h-2 rounded-full mt-1 overflow-hidden">
              <div className="bg-[#6cf8bb] h-full rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
