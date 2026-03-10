import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun } from 'lucide-react';

const navLinks = [
  { label: 'Features',  path: '/features'  },
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Vendors',   path: '/vendors'   },
  { label: 'Contact',   path: '/contact'   },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* Outer wrapper — always centered, always floating */
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <nav
        className={`
          pointer-events-auto flex items-center justify-between
          transition-all duration-500 ease-in-out
          ${scrolled
            /* Scrolled: shrinks, glass indigo pill */
            ? 'mt-3 px-4 py-2 rounded-full bg-indigo-600/90 backdrop-blur-xl shadow-2xl shadow-indigo-400/40 w-auto gap-2'
            /* Default: wide pill, white, subtle shadow */
            : 'mt-4 px-6 py-3 rounded-full bg-white shadow-lg shadow-gray-200/80 border border-gray-100 w-[90%] max-w-5xl gap-6'
          }
        `}
      >
        {/* Logo */}
        <Link
          to="/"
          className={`font-extrabold tracking-tight transition-all duration-500 shrink-0
            ${scrolled ? 'text-lg text-white' : 'text-xl text-indigo-600'}
          `}
        >
          VMS.
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  rounded-full font-medium transition-all duration-300
                  ${scrolled
                    ? `text-xs px-3 py-1.5 ${active ? 'bg-white/25 text-white' : 'text-white/80 hover:bg-white/15 hover:text-white'}`
                    : `text-sm px-4 py-2   ${active ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className={`flex items-center transition-all duration-300 ${scrolled ? 'gap-2' : 'gap-3'}`}>

          {/* Light pill */}
          <div className={`
            flex items-center gap-1 rounded-full font-medium transition-all duration-300
            ${scrolled
              ? 'bg-white/20 text-white text-xs px-2.5 py-1'
              : 'bg-gray-100 text-gray-500 text-xs px-3 py-1.5'
            }
          `}>
            <Sun size={12} />
            <span>Light</span>
          </div>

          {/* Login */}
          <Link
            to="/dashboard"
            className={`font-medium transition-all duration-300
              ${scrolled
                ? 'text-xs text-white/80 hover:text-white'
                : 'text-sm text-gray-600 hover:text-gray-900'
              }
            `}
          >
            Login
          </Link>

          {/* Get Started */}
          <Link
            to="/dashboard"
            className={`
              rounded-full font-semibold transition-all duration-300
              ${scrolled
                ? 'text-xs px-3.5 py-1.5 bg-white text-indigo-600 hover:bg-indigo-50 shadow-md'
                : 'text-sm px-5 py-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
              }
            `}
          >
            Get Started
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
