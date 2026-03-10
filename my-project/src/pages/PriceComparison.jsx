import { GitCompare } from 'lucide-react';

export default function PriceComparison() {
    return (
        <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
                <GitCompare className="h-8 w-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-gray-800">Price Comparison</h1>
            </div>
            <p className="text-gray-500 mb-8">
                Compare vendor quotes side-by-side, calculate margins, and identify the most competitive pricing.
            </p>
            <div className="bg-white rounded-xl p-12 text-center shadow border border-dashed border-gray-300">
                <GitCompare className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-400">Price comparison coming soon</h2>
                <p className="text-sm text-gray-400 mt-2">Compare and rank vendor quotes by price and value here.</p>
            </div>
        </div>
    );
}
