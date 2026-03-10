import { BarChart3 } from 'lucide-react';

export default function Performance() {
    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">Performance Tracking</h1>
            </div>
            <p className="text-gray-500 mb-8">
                Monitor vendor KPIs — response time, order success rate, delivery reliability, and business contribution.
            </p>
            <div className="bg-white rounded-xl p-12 text-center shadow border border-dashed border-gray-300">
                <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-400">KPI tracking coming soon</h2>
                <p className="text-sm text-gray-400 mt-2">Track vendor performance metrics and KPIs here.</p>
            </div>
        </div>
    );
}
