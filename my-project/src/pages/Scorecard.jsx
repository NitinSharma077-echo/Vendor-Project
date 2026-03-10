import { Award } from 'lucide-react';

export default function Scorecard() {
    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <Award className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">Vendor Scorecards</h1>
            </div>
            <p className="text-gray-500 mb-8">
                Automated vendor scoring and classification — Preferred, Regular, or Monitor — based on performance data.
            </p>
            <div className="bg-white rounded-xl p-12 text-center shadow border border-dashed border-gray-300">
                <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-400">Scorecards coming soon</h2>
                <p className="text-sm text-gray-400 mt-2">Auto-generated vendor scorecards and classification will appear here.</p>
            </div>
        </div>
    );
}
