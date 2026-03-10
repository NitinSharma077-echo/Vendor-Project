import { useState } from 'react';
import { GitCompare, CheckCircle, XCircle, Minus, ChevronDown } from 'lucide-react';

/* ── sample vendors ── */
const VENDORS = ['AlphaTech Supplies', 'BlueOcean Materials', 'FastTrack Logistics', 'CheapBulk Co.'];

/* ── comparison data ── */
const comparisonRows = [
    {
        category: 'Pricing',
        rows: [
            { criterion: 'Unit Price (per 100 units)', a: '₹4,200', b: '₹5,100', winner: 'a' },
            { criterion: 'Bulk Discount (500+ units)', a: '8%',     b: '5%',     winner: 'a' },
            { criterion: 'Payment Terms',              a: 'Net 30', b: 'Net 15', winner: 'a' },
            { criterion: 'Freight / Delivery Cost',    a: '₹350',   b: 'Free',   winner: 'b' },
        ],
    },
    {
        category: 'Delivery',
        rows: [
            { criterion: 'Lead Time',                  a: '5 days',  b: '3 days',  winner: 'b' },
            { criterion: 'On-Time Delivery Rate',      a: '96%',     b: '88%',     winner: 'a' },
            { criterion: 'Delivery Coverage',          a: 'Pan India', b: 'Regional', winner: 'a' },
        ],
    },
    {
        category: 'Quality & Compliance',
        rows: [
            { criterion: 'ISO Certified',              a: true,      b: false,     winner: 'a' },
            { criterion: 'Defect / Return Rate',       a: '0.8%',    b: '2.1%',    winner: 'a' },
            { criterion: 'Quality Warranty',           a: '12 months', b: '6 months', winner: 'a' },
            { criterion: 'MSDS / Safety Docs',         a: true,      b: true,      winner: null },
        ],
    },
    {
        category: 'Service',
        rows: [
            { criterion: 'Avg. RFQ Response Time',     a: '4 hrs',   b: '24 hrs',  winner: 'a' },
            { criterion: 'Dedicated Account Manager',  a: true,      b: false,     winner: 'a' },
            { criterion: 'After-Sales Support',        a: '24 / 7',  b: 'Business hours', winner: 'a' },
            { criterion: 'Order Tracking Portal',      a: true,      b: false,     winner: 'a' },
        ],
    },
    {
        category: 'Performance Score',
        rows: [
            { criterion: 'Overall Vendor Score',       a: '94 / 100', b: '78 / 100', winner: 'a' },
            { criterion: 'Classification',             a: 'Preferred', b: 'Regular',  winner: 'a' },
            { criterion: 'Repeat Order Rate',          a: '87%',       b: '62%',      winner: 'a' },
        ],
    },
];

function CellValue({ val, isWinner }) {
    if (typeof val === 'boolean') {
        return val
            ? <CheckCircle size={18} className="mx-auto text-emerald-500" />
            : <XCircle    size={18} className="mx-auto text-rose-400"    />;
    }
    return (
        <span className={`font-medium ${isWinner ? 'text-indigo-700' : 'text-gray-700'}`}>{val}</span>
    );
}

export default function PriceComparison() {
    const [vendorA, setVendorA] = useState(VENDORS[0]);
    const [vendorB, setVendorB] = useState(VENDORS[1]);

    const aWins = comparisonRows.flatMap(g => g.rows).filter(r => r.winner === 'a').length;
    const bWins = comparisonRows.flatMap(g => g.rows).filter(r => r.winner === 'b').length;
    const total = comparisonRows.flatMap(g => g.rows).length;

    return (
        <div className="p-6 max-w-6xl mx-auto space-y-8">

            {/* ── Header ── */}
            <div className="flex items-center gap-3">
                <GitCompare className="h-8 w-8 text-indigo-600" />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Price Comparison</h1>
                    <p className="text-sm text-gray-400">Compare vendor quotes side-by-side to find the best deal.</p>
                </div>
            </div>

            {/* ── Placeholder info card ── */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-dashed border-gray-200 text-center">
                <GitCompare className="h-12 w-12 text-gray-200 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">RFQ-based live comparison coming soon</p>
                <p className="text-sm text-gray-400 mt-1">Below is a manual side-by-side vendor comparison.</p>
            </div>

            {/* ════════════════════════════════════════════════════
                VENDOR COMPARISON TABLE
            ════════════════════════════════════════════════════ */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* Table header — vendor selector */}
                <div className="p-5 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800 mb-4">Vendor Side-by-Side Comparison</h2>

                    <div className="grid grid-cols-3 gap-4 items-end">
                        {/* criterion column label */}
                        <div />

                        {/* Vendor A selector */}
                        <div className="relative">
                            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">Vendor A</label>
                            <div className="relative">
                                <select
                                    value={vendorA}
                                    onChange={e => setVendorA(e.target.value)}
                                    className="w-full appearance-none bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-9"
                                >
                                    {VENDORS.filter(v => v !== vendorB).map(v => <option key={v}>{v}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Vendor B selector */}
                        <div className="relative">
                            <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">Vendor B</label>
                            <div className="relative">
                                <select
                                    value={vendorB}
                                    onChange={e => setVendorB(e.target.value)}
                                    className="w-full appearance-none bg-violet-50 border border-violet-200 text-violet-700 font-semibold text-sm px-4 py-2.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 pr-9"
                                >
                                    {VENDORS.filter(v => v !== vendorA).map(v => <option key={v}>{v}</option>)}
                                </select>
                                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-violet-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Score summary bar */}
                <div className="grid grid-cols-3 bg-gray-50 border-b border-gray-100">
                    <div className="py-3 px-5 text-xs text-gray-400 font-semibold uppercase tracking-wide flex items-center">
                        {total} criteria evaluated
                    </div>
                    <div className="py-3 px-5 text-center border-x border-gray-100">
                        <p className="text-2xl font-extrabold text-indigo-600">{aWins}</p>
                        <p className="text-xs text-gray-400 font-medium">criteria won</p>
                    </div>
                    <div className="py-3 px-5 text-center">
                        <p className="text-2xl font-extrabold text-violet-600">{bWins}</p>
                        <p className="text-xs text-gray-400 font-medium">criteria won</p>
                    </div>
                </div>

                {/* Comparison rows grouped by category */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 bg-gray-50/50">
                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide w-[40%]">Criterion</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-indigo-500 uppercase tracking-wide w-[30%]">{vendorA}</th>
                                <th className="text-center px-4 py-3 text-xs font-semibold text-violet-500 uppercase tracking-wide w-[30%]">{vendorB}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comparisonRows.map(group => (
                                <>
                                    {/* Group header row */}
                                    <tr key={group.category} className="bg-gray-50 border-y border-gray-100">
                                        <td colSpan={3} className="px-5 py-2 text-xs font-bold text-gray-500 uppercase tracking-widest">
                                            {group.category}
                                        </td>
                                    </tr>

                                    {group.rows.map(row => (
                                        <tr key={row.criterion} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                                            {/* Criterion */}
                                            <td className="px-5 py-3.5 text-gray-600 font-medium">{row.criterion}</td>

                                            {/* Vendor A value */}
                                            <td className={`px-4 py-3.5 text-center rounded-none
                                                ${row.winner === 'a' ? 'bg-indigo-50/60' : ''}`}>
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <CellValue val={row.a} isWinner={row.winner === 'a'} />
                                                    {row.winner === 'a' && (
                                                        <span className="text-[10px] bg-indigo-100 text-indigo-600 font-bold px-1.5 py-0.5 rounded-full">BEST</span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Vendor B value */}
                                            <td className={`px-4 py-3.5 text-center
                                                ${row.winner === 'b' ? 'bg-violet-50/60' : ''}`}>
                                                <div className="flex items-center justify-center gap-1.5">
                                                    <CellValue val={row.b} isWinner={row.winner === 'b'} />
                                                    {row.winner === 'b' && (
                                                        <span className="text-[10px] bg-violet-100 text-violet-600 font-bold px-1.5 py-0.5 rounded-full">BEST</span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Winner banner */}
                <div className={`px-6 py-4 flex items-center justify-between border-t border-gray-100
                    ${aWins >= bWins ? 'bg-indigo-50' : 'bg-violet-50'}`}>
                    <div className="flex items-center gap-2">
                        <CheckCircle size={18} className={aWins >= bWins ? 'text-indigo-500' : 'text-violet-500'} />
                        <span className="text-sm font-bold text-gray-700">
                            Recommended Vendor:{' '}
                            <span className={aWins >= bWins ? 'text-indigo-600' : 'text-violet-600'}>
                                {aWins >= bWins ? vendorA : vendorB}
                            </span>
                        </span>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                        Won {aWins >= bWins ? aWins : bWins} of {total} criteria
                    </span>
                </div>
            </div>
        </div>
    );
}
