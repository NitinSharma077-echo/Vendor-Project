import Sidebar from '../components/Sidebar';

export default function AppLayout({ children }) {
    return (
        <div className="flex min-h-screen pt-[72px]">
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-50 overflow-auto">
                {children}
            </main>
        </div>
    );
}
