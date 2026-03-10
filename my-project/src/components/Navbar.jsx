import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, User, ChevronDown } from "lucide-react";

// We'll create this component next
import ThemeToggle from "./ThemeToggle";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Auth sync
  useEffect(() => {
    const syncAuth = () => {
      try {
        const token = localStorage.getItem("erp_token");
        const stored = localStorage.getItem("erp_user");
        setUser(token && stored ? JSON.parse(stored) : null);
      } catch {
        setUser(null);
      }
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, [location.key]); // better dependency

  const handleSignOut = () => {
    localStorage.removeItem("erp_token");
    localStorage.removeItem("erp_user");
    setUser(null);
    setUserMenuOpen(false);
    navigate("/");
  };

  const getInitials = (u) => {
    const name = u?.name || u?.username || "";
    return name
      .split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`
          pointer-events-auto mt-3 md:mt-4 transition-all duration-500 ease-out
          backdrop-blur-xl bg-white/60 dark:bg-slate-900/65
          border border-white/20 dark:border-slate-700/30
          shadow-xl shadow-black/10 dark:shadow-black/40
          rounded-full
          ${scrolled
            ? "w-[92%] sm:w-[88%] md:w-[82%] lg:w-[76%] xl:w-[70%] py-3 px-5 md:px-7"
            : "w-[96%] sm:w-[92%] md:w-[88%] py-4 px-6 md:px-9"}
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`font-bold tracking-tight transition-all duration-500
              ${scrolled ? "text-xl" : "text-2xl"}
              text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400`}
          >
            ERP.
          </Link>

          {/* Desktop links - simplified for now (you can bring back dropdowns later) */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium text-slate-700 dark:text-slate-200">
            {["Platform", "Resources", "Customers", "Pricing"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className={`
                  transition-colors hover:text-indigo-600 dark:hover:text-indigo-400
                  ${location.pathname === `/${item.toLowerCase()}`
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : ""}
                `}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {user ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen((v) => !v)}
                  className={`
                    flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-full transition-all
                    border border-white/30 dark:border-slate-600/40
                    ${scrolled
                      ? "bg-white/50 dark:bg-slate-800/50"
                      : "bg-white/40 dark:bg-slate-800/40"}
                    hover:bg-white/70 dark:hover:bg-slate-700/70
                  `}
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(user)}
                  </div>
                  <span className="hidden sm:block text-sm font-medium max-w-[140px] truncate">
                    {user.name || user.username}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2.5 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-2xl overflow-hidden">
                    {/* header */}
                    <div className="px-4 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-bold flex items-center justify-center text-sm">
                          {getInitials(user)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold truncate">{user.name || user.username}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-900/30 text-slate-700 dark:text-slate-200 hover:text-indigo-700 dark:hover:text-indigo-300"
                      >
                        <LayoutDashboard size={18} />
                        Dashboard
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                      >
                        <User size={18} />
                        Settings
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 p-2">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`
                    px-5 py-2 text-sm font-medium rounded-full transition-all
                    ${scrolled
                      ? "bg-white/60 dark:bg-slate-800/60 border border-white/30 dark:border-slate-600/40 hover:bg-white/80"
                      : "bg-white/40 dark:bg-slate-800/40 hover:bg-white/60"}
                  `}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`
                    px-6 py-2.5 text-sm font-semibold rounded-full bg-indigo-600 text-white
                    hover:bg-indigo-700 shadow-lg shadow-indigo-500/30 transition-all
                    ${scrolled ? "scale-100" : "scale-105"}
                  `}
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;