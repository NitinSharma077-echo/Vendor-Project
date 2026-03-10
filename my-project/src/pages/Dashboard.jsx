import { useState } from 'react';
import {
    LayoutDashboard, BarChart3, Users, FileText, Plus,
    Upload, X, TrendingUp, Award, ShoppingCart, Clock
} from 'lucide-react';

const stats = [
    { label: 'Active Vendors',  value: '128',    icon: Users,        border: 'border-indigo-500' },
    { label: 'Open RFQs',       value: '34',     icon: FileText,     border: 'border-amber-500'  },
    { label: 'Quotes Received', value: '210',    icon: BarChart3,    border: 'border-emerald-500'},
    { label: 'Avg. Score',      value: '79/100', icon: Award,        border: 'border-violet-500' },
];

const recentActivity = [
    { action: 'RFQ #1042 sent to 5 vendors',        time: '2 hours ago',   icon: FileText,     color: 'text-indigo-500',  bg: 'bg-indigo-50'  },
    { action: 'AlphaTech scored 94 — Preferred',     time: '5 hours ago',   icon: Award,        color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { action: 'Quote received from BlueOcean Co.',   time: 'Yesterday',     icon: ShoppingCart, color: 'text-amber-500',   bg: 'bg-amber-50'   },
    { action: 'New vendor "FastTrack" onboarded',    time: '2 days ago',    icon: Users,        color: 'text-violet-500',  bg: 'bg-violet-50'  },
    { action: 'Price comparison report generated',   time: '3 days ago',    icon: BarChart3,    color: 'text-blue-500',    bg: 'bg-blue-50'    },
];

/* ── modal types ── */
const CREATE_FIELDS = [
    { label: 'Vendor Name',     placeholder: 'e.g. AlphaTech Supplies', type: 'text'   },
    { label: 'Category',        placeholder: 'e.g. Raw Materials',       type: 'text'   },
    { label: 'Contact Email',   placeholder: 'vendor@example.com',       type: 'email'  },
    { label: 'Contact Phone',   placeholder: '+91 98765 43210',          type: 'text'   },
    { label: 'GST / Tax ID',    placeholder: 'GSTIN number',             type: 'text'   },
];

export default function Dashboard() {
    const [showCreate, setShowCreate] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [dragOver,   setDragOver]   = useState(false);

    return (
        <div className="p-6 max-w-7xl mx-auto">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <LayoutDashboard className="h-8 w-8 text-indigo-600" />
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
                        <p className="text-sm text-gray-400">Vendor Management Overview</p>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setShowCreate(true)}
                        className="inline-flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-200"
                    >
                        <Plus size={16} /> Create Vendor
                    </button>
                    <button
                        onClick={() => setShowUpload(true)}
                        className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition shadow-sm"
                    >
                        <Upload size={16} /> Upload Data
                    </button>
                </div>
            </div>

            {/* ── KPI Cards ── */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {stats.map((s) => (
                    <div key={s.label} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${s.border}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{s.label}</p>
                                <p className="text-3xl font-extrabold text-gray-800 mt-1">{s.value}</p>
                            </div>
                            <s.icon size={28} className="text-gray-200" />
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-xs text-emerald-500 font-medium">
                            <TrendingUp size={12} /> <span>+12% this month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Recent Activity ── */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-gray-800">Recent Activity</h2>
                    <span className="text-xs text-indigo-600 font-semibold cursor-pointer hover:underline">View all</span>
                </div>
                <div className="space-y-3">
                    {recentActivity.map((item, i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition">
                            <div className={`w-9 h-9 ${item.bg} rounded-xl flex items-center justify-center shrink-0`}>
                                <item.icon size={16} className={item.color} />
                            </div>
                            <p className="text-sm text-gray-700 flex-1">{item.action}</p>
                            <div className="flex items-center gap-1 text-xs text-gray-400 shrink-0">
                                <Clock size={11} /> {item.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ══════════════════════════════════════════════
                CREATE VENDOR MODAL
            ══════════════════════════════════════════════ */}
            {showCreate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
                        {/* modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <Plus size={16} className="text-indigo-600" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Create New Vendor</h2>
                            </div>
                            <button onClick={() => setShowCreate(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                                <X size={18} />
                            </button>
                        </div>

                        {/* modal body */}
                        <div className="px-6 py-5 space-y-4">
                            {CREATE_FIELDS.map(f => (
                                <div key={f.label}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                                    <input
                                        type={f.type}
                                        placeholder={f.placeholder}
                                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 placeholder-gray-300"
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Classification</label>
                                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700">
                                    <option>Preferred</option>
                                    <option>Regular</option>
                                    <option>Monitor</option>
                                </select>
                            </div>
                        </div>

                        {/* modal footer */}
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
                            <button onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
                                Create Vendor
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════════════
                UPLOAD DATA MODAL
            ══════════════════════════════════════════════ */}
            {showUpload && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
                        {/* modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                                    <Upload size={16} className="text-indigo-600" />
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Upload Vendor Data</h2>
                            </div>
                            <button onClick={() => setShowUpload(false)} className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400">
                                <X size={18} />
                            </button>
                        </div>

                        {/* drag & drop zone */}
                        <div className="px-6 py-6">
                            <div
                                onDragOver={e => { e.preventDefault(); setDragOver(true);  }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e    => { e.preventDefault(); setDragOver(false);  }}
                                className={`border-2 border-dashed rounded-2xl p-10 text-center transition-colors cursor-pointer
                                    ${dragOver ? 'border-indigo-400 bg-indigo-50' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}
                            >
                                <Upload size={36} className={`mx-auto mb-3 ${dragOver ? 'text-indigo-500' : 'text-gray-300'}`} />
                                <p className="text-sm font-semibold text-gray-600 mb-1">Drag & drop your file here</p>
                                <p className="text-xs text-gray-400 mb-4">Supports CSV, XLSX, XLS — max 10 MB</p>
                                <label className="inline-block bg-indigo-600 text-white text-xs font-semibold px-5 py-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
                                    Browse File
                                    <input type="file" accept=".csv,.xlsx,.xls" className="hidden" />
                                </label>
                            </div>

                            <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-xl">
                                <p className="text-xs text-amber-700 font-medium">
                                    File must follow the VMS template format.{' '}
                                    <a href="#" className="underline">Download sample template →</a>
                                </p>
                            </div>
                        </div>

                        {/* modal footer */}
                        <div className="flex gap-3 px-6 py-4 border-t border-gray-100">
                            <button onClick={() => setShowUpload(false)} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
                                Upload &amp; Import
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
