import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { TrendingUp, DollarSign, Users, Award, ShieldCheck } from 'lucide-react';

/* ── KPI data ── */
const kpis = [
    {
        label:   'Total Spend YTD',
        value:   '₹4.2 Cr',
        change:  '+12%',
        up:      true,
        icon:    DollarSign,
        iconBg:  'bg-indigo-100',
        iconClr: 'text-indigo-600',
        bar:     'bg-indigo-500',
        pct:     72,
    },
    {
        label:   'Active Vendors',
        value:   '128',
        change:  '+8 this month',
        up:      true,
        icon:    Users,
        iconBg:  'bg-emerald-100',
        iconClr: 'text-emerald-600',
        bar:     'bg-emerald-500',
        pct:     64,
    },
    {
        label:   'Avg. Vendor Score',
        value:   '79 / 100',
        change:  '+3 pts vs last qtr',
        up:      true,
        icon:    Award,
        iconBg:  'bg-amber-100',
        iconClr: 'text-amber-600',
        bar:     'bg-amber-500',
        pct:     79,
    },
    {
        label:   'Cost Savings',
        value:   '₹38.4 L',
        change:  '35% avg savings',
        up:      true,
        icon:    ShieldCheck,
        iconBg:  'bg-violet-100',
        iconClr: 'text-violet-600',
        bar:     'bg-violet-500',
        pct:     55,
    },
];

/* ── Vertical bar — Monthly Spend ── */
const monthlySpend = [
    { month: 'Oct', spend: 28 },
    { month: 'Nov', spend: 35 },
    { month: 'Dec', spend: 22 },
    { month: 'Jan', spend: 40 },
    { month: 'Feb', spend: 31 },
    { month: 'Mar', spend: 47 },
];

/* ── Horizontal bar — Category Spend ── */
const categorySpend = [
    { category: 'Raw Materials',  spend: 142 },
    { category: 'IT & Software',  spend: 89  },
    { category: 'Logistics',      spend: 67  },
    { category: 'MRO Supplies',   spend: 54  },
    { category: 'Packaging',      spend: 38  },
    { category: 'Professional',   spend: 22  },
];

/* ── Line — Vendor Score Trend ── */
const scoreTrend = [
    { month: 'Oct', preferred: 88, regular: 70, monitor: 45 },
    { month: 'Nov', preferred: 90, regular: 72, monitor: 48 },
    { month: 'Dec', preferred: 87, regular: 68, monitor: 42 },
    { month: 'Jan', preferred: 92, regular: 74, monitor: 50 },
    { month: 'Feb', preferred: 91, regular: 76, monitor: 47 },
    { month: 'Mar', preferred: 94, regular: 78, monitor: 43 },
];

/* ── Pie — Vendor Classification ── */
const classificationData = [
    { name: 'Preferred', value: 47, color: '#10b981' },
    { name: 'Regular',   value: 63, color: '#f59e0b' },
    { name: 'Monitor',   value: 18, color: '#f43f5e' },
];

/* ── Custom tooltip ── */
const ChartTooltip = ({ active, payload, label, prefix = '', suffix = '' }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white border border-gray-100 shadow-xl rounded-xl px-4 py-3 text-sm">
            <p className="font-semibold text-gray-700 mb-1">{label}</p>
            {payload.map(p => (
                <p key={p.name} style={{ color: p.color }} className="font-medium">
                    {p.name}: {prefix}{p.value}{suffix}
                </p>
            ))}
        </div>
    );
};

/* ── Pie label ── */
const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={13} fontWeight={700}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function Analytics() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">

            {/* ── Page Header ── */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">Vendor Intelligence</h1>
                <p className="text-sm text-gray-400 mt-1">Procurement analytics · April 2025 – March 2026</p>
            </div>

            {/* ══════════════════════════════════════════════
                ROW 1 — 4 KPI CARDS (horizontal)
            ══════════════════════════════════════════════ */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {kpis.map(k => (
                    <div key={k.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 ${k.iconBg} rounded-xl flex items-center justify-center`}>
                                <k.icon size={18} className={k.iconClr} />
                            </div>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${k.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-500'}`}>
                                {k.change}
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{k.label}</p>
                        <p className="text-2xl font-extrabold text-gray-800 mb-3">{k.value}</p>
                        {/* mini progress bar */}
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className={`${k.bar} h-1.5 rounded-full transition-all`} style={{ width: `${k.pct}%` }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* ══════════════════════════════════════════════
                ROW 2 — Vertical Bar  +  Line Chart
            ══════════════════════════════════════════════ */}
            <div className="grid lg:grid-cols-2 gap-6">

                {/* Vertical Bar — Monthly Spend */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-bold text-gray-800">Monthly Spend</h2>
                            <p className="text-xs text-gray-400">Last 6 months · ₹ Lakhs</p>
                        </div>
                        <span className="text-xs bg-indigo-50 text-indigo-600 font-semibold px-3 py-1 rounded-full">Vertical Bar</span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <BarChart data={monthlySpend} barSize={32}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="L" />
                            <Tooltip content={<ChartTooltip prefix="₹" suffix=" L" />} cursor={{ fill: '#f1f5f9', radius: 6 }} />
                            <Bar dataKey="spend" name="Spend" fill="#6366f1" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Line Chart — Vendor Score Trend */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-bold text-gray-800">Vendor Score Trend</h2>
                            <p className="text-xs text-gray-400">Avg. score by classification · last 6 months</p>
                        </div>
                        <span className="text-xs bg-emerald-50 text-emerald-600 font-semibold px-3 py-1 rounded-full">Line Chart</span>
                    </div>
                    <ResponsiveContainer width="100%" height={240}>
                        <LineChart data={scoreTrend}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[30, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<ChartTooltip suffix=" pts" />} />
                            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 12 }} />
                            <Line type="monotone" dataKey="preferred" name="Preferred" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="regular"   name="Regular"   stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
                            <Line type="monotone" dataKey="monitor"   name="Monitor"   stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4, fill: '#f43f5e' }} activeDot={{ r: 6 }} strokeDasharray="5 4" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* ══════════════════════════════════════════════
                ROW 3 — Horizontal Bar  +  Pie Chart
            ══════════════════════════════════════════════ */}
            <div className="grid lg:grid-cols-2 gap-6">

                {/* Horizontal Bar — Category Spend */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-bold text-gray-800">Spend by Category</h2>
                            <p className="text-xs text-gray-400">YTD · ₹ Lakhs</p>
                        </div>
                        <span className="text-xs bg-amber-50 text-amber-600 font-semibold px-3 py-1 rounded-full">Horizontal Bar</span>
                    </div>
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={categorySpend} layout="vertical" barSize={18}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} unit="L" />
                            <YAxis type="category" dataKey="category" width={100} tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<ChartTooltip prefix="₹" suffix=" L" />} cursor={{ fill: '#f8fafc' }} />
                            <Bar dataKey="spend" name="Spend" fill="#f59e0b" radius={[0, 6, 6, 0]}>
                                {categorySpend.map((_, i) => (
                                    <Cell key={i} fill={`hsl(${38 + i * 12}, 90%, ${58 - i * 3}%)`} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart — Vendor Classification */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-base font-bold text-gray-800">Vendor Classification</h2>
                            <p className="text-xs text-gray-400">Distribution of 128 active vendors</p>
                        </div>
                        <span className="text-xs bg-violet-50 text-violet-600 font-semibold px-3 py-1 rounded-full">Pie Chart</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <ResponsiveContainer width="55%" height={220}>
                            <PieChart>
                                <Pie
                                    data={classificationData}
                                    cx="50%" cy="50%"
                                    outerRadius={95}
                                    innerRadius={48}
                                    dataKey="value"
                                    labelLine={false}
                                    label={renderPieLabel}
                                >
                                    {classificationData.map((entry, i) => (
                                        <Cell key={i} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(v, n) => [`${v} vendors`, n]} />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Legend + counts */}
                        <div className="flex-1 space-y-4">
                            {classificationData.map(d => (
                                <div key={d.name}>
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-2">
                                            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: d.color }} />
                                            <span className="text-sm font-medium text-gray-700">{d.name}</span>
                                        </div>
                                        <span className="text-sm font-bold text-gray-800">{d.value}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                                        <div className="h-1.5 rounded-full" style={{ width: `${Math.round(d.value / 128 * 100)}%`, background: d.color }} />
                                    </div>
                                </div>
                            ))}
                            <p className="text-xs text-gray-400 pt-1">Total: 128 active vendors</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══════════════════════════════════════════════
                ROW 4 — KPI Vertical Summary Table
            ══════════════════════════════════════════════ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-800">KPI Summary — All Vendors</h2>
                    <p className="text-xs text-gray-400 mt-0.5">Vertical performance breakdown by key metric</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">KPI Metric</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Target</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Actual</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                                <th className="px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { metric: 'On-Time Delivery Rate',    target: '95%',  actual: '91%',  pct: 91,  ok: false },
                                { metric: 'Quote Response Time',      target: '< 6h', actual: '4.2h', pct: 85,  ok: true  },
                                { metric: 'Defect / Return Rate',     target: '< 1%', actual: '0.8%', pct: 80,  ok: true  },
                                { metric: 'Order Fulfilment Rate',    target: '98%',  actual: '96%',  pct: 96,  ok: false },
                                { metric: 'Preferred Vendor Usage',   target: '80%',  actual: '87%',  pct: 87,  ok: true  },
                                { metric: 'Cost Savings vs. Budget',  target: '30%',  actual: '35%',  pct: 100, ok: true  },
                            ].map((row, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                                    <td className="px-6 py-3.5 font-medium text-gray-700">{row.metric}</td>
                                    <td className="px-4 py-3.5 text-center text-gray-500">{row.target}</td>
                                    <td className="px-4 py-3.5 text-center font-semibold text-gray-800">{row.actual}</td>
                                    <td className="px-4 py-3.5 text-center">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${row.ok ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                            {row.ok ? 'On Track' : 'Near Target'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${row.ok ? 'bg-emerald-500' : 'bg-amber-400'}`}
                                                    style={{ width: `${Math.min(row.pct, 100)}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-500 w-8 shrink-0">{row.pct}%</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
