// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 antialiased">
        <Navbar />

        {/* Main content starts below fixed navbar */}
        <main className="pt-20 md:pt-24 lg:pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more later: /compare, /categories, /login, etc. */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;