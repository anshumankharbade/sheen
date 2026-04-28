import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{
      background: 'rgba(0,0,0,0.4)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(255,255,255,0.08)',
      color: '#f0ece4',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 2rem' }}>

        {/* Top row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '32px', fontWeight: 300, letterSpacing: '0.25em', color: '#e8c97a', marginBottom: '0.5rem' }}>
                sheen
              </div>
              <img src="/icon.png" alt="sheen icon" style={{ height: '28px', width: 'auto', marginBottom: '0.5rem', filter: 'brightness(1.8) sepia(0.4) hue-rotate(-10deg)' }} />
            </div>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,201,122,0.7)', marginBottom: '1rem' }}>
              Premium Salon & Studio
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(240,236,228,0.4)', fontWeight: 300, maxWidth: '220px', lineHeight: 1.7 }}>
              Your glow, on your schedule. Expert stylists, effortless booking.
            </p>
          </div>

          {/* Nav */}
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,201,122,0.7)', marginBottom: '1.25rem', fontWeight: 500 }}>
              Navigate
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[['/', 'Home'], ['/services', 'Services'], ['/booking', 'Book Now'], ['/admin', 'Admin']].map(([to, label]) => (
                <Link key={to} to={to} style={{ fontSize: '13px', color: 'rgba(240,236,228,0.4)', textDecoration: 'none', fontWeight: 300, letterSpacing: '0.02em', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#e8c97a'}
                  onMouseLeave={e => e.target.style.color = 'rgba(240,236,228,0.4)'}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,201,122,0.7)', marginBottom: '1.25rem', fontWeight: 500 }}>
              Contact
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Nagpur, Maharashtra', 'hello@sheensalon.in', '+91 98765 43210'].map(t => (
                <span key={t} style={{ fontSize: '13px', color: 'rgba(240,236,228,0.4)', fontWeight: 300 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(232,201,122,0.12)', marginBottom: '1.5rem' }} />

        {/* Bottom */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '12px', color: 'rgba(240,236,228,0.2)', fontWeight: 300 }}>
            © {new Date().getFullYear()} sheen. All rights reserved.
          </span>
          <span style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(240,236,228,0.15)' }}>
            Crafted with care
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
