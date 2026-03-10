import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppLayout from './layouts/AppLayout';

import Home       from './pages/Home';
import Features   from './pages/Features';
import Contact    from './pages/Contact';

import Dashboard        from './pages/Dashboard';
import Vendors          from './pages/Vendors';
import Quotes           from './pages/Quotes';
import PriceComparison  from './pages/PriceComparison';
import Performance      from './pages/Performance';
import Scorecard        from './pages/Scorecard';
import PreferredVendors from './pages/PreferredVendors';
import Analytics        from './pages/Analytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          {/* Public pages — no sidebar */}
          <Route path="/"         element={<main className="pt-[72px]"><Home /></main>} />
          <Route path="/features" element={<main className="pt-[72px]"><Features /></main>} />
          <Route path="/contact"  element={<main className="pt-[72px]"><Contact /></main>} />

          {/* App pages — with sidebar */}
          <Route path="/dashboard"         element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/vendors"           element={<AppLayout><Vendors /></AppLayout>} />
          <Route path="/quotes"            element={<AppLayout><Quotes /></AppLayout>} />
          <Route path="/price-comparison"  element={<AppLayout><PriceComparison /></AppLayout>} />
          <Route path="/performance"       element={<AppLayout><Performance /></AppLayout>} />
          <Route path="/scorecard"         element={<AppLayout><Scorecard /></AppLayout>} />
          <Route path="/preferred-vendors" element={<AppLayout><PreferredVendors /></AppLayout>} />
          <Route path="/analytics"         element={<AppLayout><Analytics /></AppLayout>} />

          <Route path="*" element={<div className="pt-16 p-20 text-center text-2xl">404 – Page not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
