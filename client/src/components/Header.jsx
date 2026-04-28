import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/admin', label: 'Admin' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-2xl border-b border-white/10'
            : 'border-b border-transparent'
        }`}
        style={{
          background: scrolled
            ? 'rgba(13, 11, 16, 0.75)'
            : 'transparent',
        }}
      >
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="no-underline">
              <span className="font-display text-[28px] font-light tracking-[0.25em]" style={{ color: '#e8c97a' }}>
                sheen
              </span>
              <img
                src="/icon.png"
                alt="sheen icon"
                className="inline-block h-6 w-auto ml-1 mb-3 align-middle"
                style={{ filter: 'brightness(1.8) sepia(0.4) hue-rotate(-10deg)' }}
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className={`font-sans text-[11px] font-normal tracking-[0.2em] uppercase no-underline transition-all duration-200 pb-0.5 ${
                    isActive(to)
                      ? 'border-b'
                      : ''
                  }`}
                  style={{
                    color: isActive(to) ? '#e8c97a' : 'rgba(240,236,228,0.65)',
                    borderColor: isActive(to) ? '#e8c97a' : 'transparent',
                  }}
                  onMouseEnter={e => e.target.style.color = '#e8c97a'}
                  onMouseLeave={e => { if (!isActive(to)) e.target.style.color = 'rgba(240,236,228,0.65)'; }}
                >
                  {label}
                </Link>
              ))}
              <Link
                to="/services"
                className="font-sans text-[11px] font-normal tracking-[0.2em] uppercase no-underline px-5 py-2 rounded-sm transition-all duration-300"
                style={{
                  color: '#e8c97a',
                  border: '1px solid rgba(232,201,122,0.45)',
                  background: 'rgba(232,201,122,0.08)',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(232,201,122,0.2)';
                  e.currentTarget.style.borderColor = 'rgba(232,201,122,0.7)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(232,201,122,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(232,201,122,0.45)';
                }}
              >
                Book Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative z-60 bg-transparent border-none cursor-pointer p-1"
              aria-label="Menu"
            >
              <div className="relative w-[22px] h-4">
                <span className={`absolute left-0 w-full h-px transition-all duration-300 ${isOpen ? 'top-[7px] rotate-45' : 'top-0'}`} style={{ background: '#e8c97a' }} />
                <span className={`absolute left-0 w-full h-px transition-all duration-300 top-[7px] ${isOpen ? 'opacity-0' : 'opacity-100'}`} style={{ background: '#e8c97a' }} />
                <span className={`absolute left-0 w-full h-px transition-all duration-300 ${isOpen ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} style={{ background: '#e8c97a' }} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center items-center gap-10 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'rgba(13,11,16,0.97)', backdropFilter: 'blur(24px)' }}
      >
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            onClick={() => setIsOpen(false)}
            className="font-display text-[32px] font-light tracking-[0.1em] no-underline transition-colors"
            style={{ color: isActive(to) ? '#e8c97a' : 'rgba(240,236,228,0.8)' }}
          >
            {label}
          </Link>
        ))}
        <Link
          to="/services"
          onClick={() => setIsOpen(false)}
          className="font-sans text-[11px] tracking-[0.25em] uppercase no-underline px-8 py-3 rounded-sm mt-4 transition-all"
          style={{
            color: '#e8c97a',
            border: '1px solid rgba(232,201,122,0.4)',
            background: 'rgba(232,201,122,0.08)',
          }}
        >
          Book Now
        </Link>
      </div>
    </>
  );
};

export default Header;