import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';

const GLASS = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
};

const FEATURES = [
  { label: 'Expert stylists', desc: 'Certified professionals with years of experience in the latest trends.' },
  { label: 'Premium products', desc: 'Only high-quality, eco-friendly brands for your hair and skin.' },
  { label: 'Relaxing ambiance', desc: 'A luxurious, calm environment — your escape from the everyday rush.' },
];

const TESTIMONIALS = [
  { quote: 'Absolutely loved my experience. The stylist understood exactly what I wanted. Will definitely come back.', name: 'Aanya R.' },
  { quote: 'Best haircut I have had in years. The atmosphere is so relaxing and the staff is super friendly.', name: 'Mihir T.' },
];

const Home = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/services')
      .then(res => setFeaturedServices(res.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,11,16,0.92) 0%, rgba(13,11,16,0.65) 50%, rgba(13,11,16,0.2) 100%)' }} />

        <div className="relative max-w-6xl mx-auto px-8 w-full">
          <div className="max-w-[560px]">
            <div className="text-[10px] tracking-[0.4em] uppercase mb-6 font-normal" style={{ color: '#e8c97a' }}>
              Est. 2025 · Nagpur
            </div>
            <h1 className="font-display font-light leading-[1.05] tracking-[-0.01em] mb-6" style={{ fontSize: 'clamp(52px,8vw,86px)', color: '#f0ece4' }}>
              Your glow,<br />
              <em className="italic" style={{ color: 'rgba(232,201,122,0.9)' }}>on your schedule.</em>
            </h1>
            <p className="text-[15px] font-light leading-relaxed mb-10 max-w-[420px]" style={{ color: 'rgba(240,236,228,0.55)' }}>
              Experience premium haircare and grooming by expert stylists in a space designed entirely for you.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/services"
                className="font-sans text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300 no-underline"
                style={{ background: 'rgba(232,201,122,0.9)', color: '#0d0b10', border: '1px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e8c97a'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,201,122,0.9)'; }}
              >
                Book an appointment
              </Link>
              <Link
                to="/services"
                className="font-sans text-[11px] tracking-[0.25em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300 no-underline"
                style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(240,236,228,0.8)', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,201,122,0.15)'; e.currentTarget.style.borderColor = 'rgba(232,201,122,0.4)'; e.currentTarget.style.color = '#e8c97a'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(240,236,228,0.8)'; }}
              >
                View services
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
          <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(240,236,228,0.3)' }}>Scroll</span>
          <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom, rgba(232,201,122,0.5), transparent)' }} />
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] tracking-[0.35em] uppercase mb-4 font-normal" style={{ color: '#e8c97a' }}>What we offer</div>
            <h2 className="font-display font-light leading-tight" style={{ fontSize: 'clamp(32px,5vw,48px)', color: '#f0ece4' }}>
              Signature services
            </h2>
          </div>

          {loading ? <LoadingSpinner /> : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredServices.map((service) => (
                  <div
                    key={service._id}
                    className="overflow-hidden relative group rounded-sm transition-all duration-300"
                    style={{ ...GLASS, border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(232,201,122,0.3)'; e.currentTarget.style.background = 'rgba(255,255,255,0.09)'; }}
                    onMouseLeave={e => { e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                  >
                    <div className="overflow-hidden h-64">
                      <img
                        className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                        src={service.image || 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600'}
                        alt={service.name}
                      />
                    </div>
                    <div className="p-7">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-display text-2xl font-normal" style={{ color: '#f0ece4' }}>{service.name}</h3>
                        <span className="font-display text-xl font-light" style={{ color: '#e8c97a' }}>₹{service.price}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-5 font-light" style={{ color: 'rgba(240,236,228,0.5)' }}>
                        {service.description?.slice(0, 90) || 'A premium salon experience tailored just for you.'}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] tracking-wide uppercase" style={{ color: 'rgba(240,236,228,0.4)' }}>{service.duration} min</span>
                        <Link
                          to={`/booking/${service._id}`}
                          className="text-[10px] tracking-[0.2em] uppercase no-underline border-b pb-0.5 transition-all"
                          style={{ color: '#e8c97a', borderColor: 'rgba(232,201,122,0.35)' }}
                          onMouseEnter={e => e.currentTarget.style.borderColor = '#e8c97a'}
                          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(232,201,122,0.35)'}
                        >
                          Book →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-10">
                <Link
                  to="/services"
                  className="text-[11px] tracking-[0.25em] uppercase no-underline border-b pb-1 transition-all"
                  style={{ color: 'rgba(240,236,228,0.5)', borderColor: 'rgba(232,201,122,0.25)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#e8c97a'; e.currentTarget.style.borderColor = '#e8c97a'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,236,228,0.5)'; e.currentTarget.style.borderColor = 'rgba(232,201,122,0.25)'; }}
                >
                  View all services
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* WHY SHEEN */}
      <section className="py-24 px-8" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: '#e8c97a' }}>Our promise</div>
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(32px,5vw,48px)', color: '#f0ece4' }}>Why choose sheen?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map(({ label, desc }) => (
              <div key={label} className="p-10 text-center rounded-sm" style={GLASS}>
                <div className="w-10 h-px mx-auto mb-6" style={{ background: 'rgba(232,201,122,0.5)' }} />
                <h3 className="font-display text-2xl font-normal mb-3" style={{ color: '#f0ece4' }}>{label}</h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: 'rgba(240,236,228,0.5)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: '#e8c97a' }}>Client stories</div>
            <h2 className="font-display font-light" style={{ fontSize: 'clamp(32px,5vw,48px)', color: '#f0ece4' }}>What our clients say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS.map(({ quote, name }) => (
              <div key={name} className="p-8 rounded-sm" style={GLASS}>
                <div className="font-display text-6xl leading-[0.7] mb-4" style={{ color: 'rgba(232,201,122,0.3)' }}>"</div>
                <p className="font-display italic text-lg leading-relaxed mb-6" style={{ color: 'rgba(240,236,228,0.7)' }}>{quote}</p>
                <div className="h-px mb-4" style={{ background: 'rgba(232,201,122,0.15)' }} />
                <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: '#e8c97a' }}>— {name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center" style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="max-w-[600px] mx-auto">
          <div className="w-10 h-px mx-auto mb-8" style={{ background: 'rgba(232,201,122,0.4)' }} />
          <h2 className="font-display font-light leading-tight mb-5" style={{ fontSize: 'clamp(36px,6vw,56px)', color: '#f0ece4' }}>
            Ready to look<br /><em className="not-italic" style={{ color: '#e8c97a' }}>your best?</em>
          </h2>
          <p className="text-sm leading-relaxed mb-10 font-light" style={{ color: 'rgba(240,236,228,0.4)' }}>
            Book your appointment in seconds — choose your service, stylist, and preferred time.
          </p>
          <Link
            to="/services"
            className="font-sans text-[11px] tracking-[0.25em] uppercase px-10 py-3.5 rounded-sm inline-block transition-all duration-300 no-underline"
            style={{ border: '1px solid rgba(232,201,122,0.45)', color: '#e8c97a', background: 'rgba(232,201,122,0.08)', backdropFilter: 'blur(8px)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,201,122,0.18)'; e.currentTarget.style.borderColor = 'rgba(232,201,122,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,201,122,0.08)'; e.currentTarget.style.borderColor = 'rgba(232,201,122,0.45)'; }}
          >
            Book now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
