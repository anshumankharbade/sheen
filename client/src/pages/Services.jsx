import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const GLASS = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '2px',
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/services')
      .then(res => { setServices(res.data); setLoading(false); })
      .catch(() => { setError('Failed to load services. Please try again.'); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'rgba(240,236,228,0.4)', fontSize: '13px', letterSpacing: '0.1em' }}>
      Loading services…
    </div>
  );

  if (error) return (
    <div style={{ textAlign: 'center', padding: '6rem 2rem', color: '#e07070', fontSize: '14px' }}>{error}</div>
  );

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '4rem 2rem 3rem',
        background: 'rgba(0,0,0,0.25)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#e8c97a', marginBottom: '1rem' }}>
          What we offer
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 6vw, 58px)', fontWeight: 300, color: '#f0ece4', lineHeight: 1.1 }}>
          Our services
        </h1>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        {services.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'rgba(240,236,228,0.4)', fontSize: '14px' }}>No services available yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
            {services.map((service) => (
              <div
                key={service._id}
                style={{ ...GLASS, cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => {
                  e.currentTarget.style.border = '1px solid rgba(232,201,122,0.3)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                  e.currentTarget.querySelector('.svc-img').style.transform = 'scale(1.04)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.querySelector('.svc-img').style.transform = 'scale(1)';
                }}
              >
                <div style={{ overflow: 'hidden', height: '220px' }}>
                  <img
                    className="svc-img"
                    src={service.image || 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600'}
                    alt={service.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 400, color: '#f0ece4', margin: 0 }}>
                      {service.name}
                    </h3>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 300, color: '#e8c97a', whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>
                      ₹{service.price}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'rgba(240,236,228,0.45)', lineHeight: 1.7, marginBottom: '1.25rem', fontWeight: 300 }}>
                    {service.description || 'A premium salon experience tailored just for you.'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: 'rgba(240,236,228,0.35)', textTransform: 'uppercase' }}>
                      {service.duration} min
                    </span>
                    <button
                      onClick={() => navigate(`/booking/${service._id}`)}
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: '#0d0b10',
                        background: 'rgba(232,201,122,0.9)',
                        border: '1px solid transparent',
                        padding: '9px 20px',
                        borderRadius: '2px',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e => { e.target.style.background = '#e8c97a'; }}
                      onMouseLeave={e => { e.target.style.background = 'rgba(232,201,122,0.9)'; }}
                    >
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
