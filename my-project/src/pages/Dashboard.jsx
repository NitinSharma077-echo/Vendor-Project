// src/pages/Dashboard.jsx
import { LayoutDashboard, BarChart3, Users, Settings } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="container mx-auto px-5 py-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-4">
                <LayoutDashboard className="h-10 w-10 text-indigo-600" />
                Your Dashboard
            </h1>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                    { label: 'Reviews Written', value: '18', icon: <BarChart3 /> },
                    { label: 'Bookmarks', value: '42', icon: <BarChart3 /> },
                    { label: 'Compared Tools', value: '67', icon: <Users /> },
                    { label: 'Profile Views', value: '1.2k', icon: <Users /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow border-l-4 border-indigo-500">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                            </div>
                            <div className="text-indigo-500 opacity-80">{stat.icon}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow">
                <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
                <p className="text-gray-500">You compared SAP vs Odoo 2 days ago</p>
                <p className="text-gray-500 mt-2">You wrote a review for Zoho CRM last week</p>
                {/* Add real list / table later */}
            </div>
        </div>
    );
}