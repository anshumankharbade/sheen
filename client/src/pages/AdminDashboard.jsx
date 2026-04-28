import { useEffect, useRef, useState } from 'react';
import api from '../api';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const GLASS = {
  background: 'rgba(255,255,255,0.06)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '4px',
};

const INPUT_ST = {
  padding: '0.6rem 0.75rem',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: '2px',
  background: 'rgba(255,255,255,0.06)',
  color: '#f0ece4',
  fontSize: '13px',
  outline: 'none',
  width: '100%',
};

const BTN_PRIMARY = {
  background: 'rgba(232,201,122,0.9)',
  color: '#0d0b10',
  border: '1px solid rgba(232,201,122,0.8)',
  padding: '0.5rem 1.25rem',
  borderRadius: '2px',
  cursor: 'pointer',
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontFamily: "'DM Sans', sans-serif",
};

const BTN_SECONDARY = {
  background: 'rgba(255,255,255,0.05)',
  color: 'rgba(240,236,228,0.6)',
  border: '1px solid rgba(255,255,255,0.1)',
  padding: '0.5rem 1.25rem',
  borderRadius: '2px',
  cursor: 'pointer',
  fontSize: '11px',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  fontFamily: "'DM Sans', sans-serif",
};

const EMPTY_SERVICE = { name: '', duration: '', price: '', description: '', image: '' };
const EMPTY_STYLIST = { name: '', bio: '', image: '', services: [] };

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [stylists, setStylists] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [serviceForm, setServiceForm] = useState(EMPTY_SERVICE);
  const [editingServiceId, setEditingServiceId] = useState(null);

  const [stylistForm, setStylistForm] = useState(EMPTY_STYLIST);
  const [editingStylistId, setEditingStylistId] = useState(null);

  // Attach admin token to every request for this session
  const adminApi = useRef(null);
  if (!adminApi.current) {
    adminApi.current = api.create
      ? api  // fallback if api is already the axios instance
      : api;
    adminApi.current.defaults.headers.common['admin-token'] = localStorage.getItem('adminToken');
  }
  // Ensure token header is always current
  api.defaults.headers.common['admin-token'] = localStorage.getItem('adminToken');

  const fetchServices = async () => {
    const res = await api.get('/admin/services');
    setServices(res.data);
  };

  const fetchStylists = async () => {
    const res = await api.get('/admin/stylists');
    setStylists(res.data);
  };

  const fetchBookings = async () => {
    const res = await api.get('/admin/bookings');
    setBookings(res.data);
  };

  const fetchAllServices = async () => {
    const res = await api.get('/services');
    setAllServices(res.data);
  };

  // Load public services list once for stylist multi-select
  useEffect(() => {
    fetchAllServices().catch(() => {});
  }, []);

  // Reload tab data whenever active tab changes
  useEffect(() => {
    setError(null);
    setLoading(true);
    const loaders = {
      services: fetchServices,
      stylists: fetchStylists,
      bookings: fetchBookings,
    };
    loaders[activeTab]()
      .catch(() => setError(`Failed to load ${activeTab}. Check your connection and try again.`))
      .finally(() => setLoading(false));
  }, [activeTab]);

  // Service handlers
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingServiceId) {
        await api.put(`/admin/services/${editingServiceId}`, serviceForm);
      } else {
        await api.post('/admin/services', serviceForm);
      }
      setServiceForm(EMPTY_SERVICE);
      setEditingServiceId(null);
      await fetchServices();
    } catch {
      setError('Failed to save service. Please try again.');
    }
  };

  const deleteService = async (id) => {
    if (!window.confirm('Delete this service? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/services/${id}`);
      await fetchServices();
    } catch {
      setError('Failed to delete service.');
    }
  };

  const startEditService = (service) => {
    setEditingServiceId(service._id);
    setServiceForm({
      name: service.name,
      duration: service.duration,
      price: service.price,
      description: service.description || '',
      image: service.image || '',
    });
  };

  const cancelEditService = () => {
    setEditingServiceId(null);
    setServiceForm(EMPTY_SERVICE);
  };

  // Stylist handlers
  const handleStylistSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editingStylistId) {
        await api.put(`/admin/stylists/${editingStylistId}`, stylistForm);
      } else {
        await api.post('/admin/stylists', stylistForm);
      }
      setStylistForm(EMPTY_STYLIST);
      setEditingStylistId(null);
      await fetchStylists();
    } catch {
      setError('Failed to save stylist. Please try again.');
    }
  };

  const deleteStylist = async (id) => {
    if (!window.confirm('Delete this stylist? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/stylists/${id}`);
      await fetchStylists();
    } catch {
      setError('Failed to delete stylist.');
    }
  };

  const startEditStylist = (stylist) => {
    setEditingStylistId(stylist._id);
    setStylistForm({
      name: stylist.name,
      bio: stylist.bio || '',
      image: stylist.image || '',
      services: stylist.services.map(s => s._id),
    });
  };

  const cancelEditStylist = () => {
    setEditingStylistId(null);
    setStylistForm(EMPTY_STYLIST);
  };

  const handleStylistServiceChange = (e) => {
    const selected = Array.from(e.target.options)
      .filter(o => o.selected)
      .map(o => o.value);
    setStylistForm(prev => ({ ...prev, services: selected }));
  };

  // Booking handlers
  const updateBookingStatus = async (id, status) => {
    try {
      await api.patch(`/admin/bookings/${id}`, { status });
      await fetchBookings();
    } catch {
      setError('Failed to update booking status.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '2rem 1.5rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8c97a', marginBottom: '0.5rem' }}>Admin Panel</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '36px', fontWeight: 300, color: '#f0ece4', margin: 0 }}>Dashboard</h2>
        </div>
        {onLogout && (
          <button onClick={onLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(240,236,228,0.45)', padding: '0.4rem 0.9rem', borderRadius: '2px', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif" }}>Logout</button>
        )}
      </div>

      {error && (
        <div style={{ padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '13px', borderRadius: '2px', background: 'rgba(224,112,112,0.1)', border: '1px solid rgba(224,112,112,0.3)', color: '#e07070', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {error}
          <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: '#e07070', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}>×</button>
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '1.5rem' }}>
        {['services', 'stylists', 'bookings'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '0.6rem 1.25rem',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #e8c97a' : '2px solid transparent',
              color: activeTab === tab ? '#e8c97a' : 'rgba(240,236,228,0.45)',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.2s',
              marginBottom: '-1px',
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* SERVICES TAB */}
      {activeTab === 'services' && (
        <div>
          <form onSubmit={handleServiceSubmit} style={{ ...GLASS, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#f0ece4', marginBottom: '1rem', marginTop: 0 }}>
              {editingServiceId ? 'Edit Service' : 'Add New Service'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <input type="text" placeholder="Service Name" value={serviceForm.name} onChange={e => setServiceForm(p => ({ ...p, name: e.target.value }))} required style={INPUT_ST} />
              <input type="number" placeholder="Duration (minutes)" value={serviceForm.duration} onChange={e => setServiceForm(p => ({ ...p, duration: e.target.value }))} required min="1" style={INPUT_ST} />
              <input type="number" placeholder="Price (₹)" value={serviceForm.price} onChange={e => setServiceForm(p => ({ ...p, price: e.target.value }))} required min="0" style={INPUT_ST} />
              <input type="url" placeholder="Image URL (optional)" value={serviceForm.image} onChange={e => setServiceForm(p => ({ ...p, image: e.target.value }))} style={INPUT_ST} />
              <textarea placeholder="Description (optional)" value={serviceForm.description} onChange={e => setServiceForm(p => ({ ...p, description: e.target.value }))} style={{ ...INPUT_ST, gridColumn: '1 / -1', resize: 'vertical' }} rows="2" />
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
              <button type="submit" style={BTN_PRIMARY}>{editingServiceId ? 'Update Service' : 'Create Service'}</button>
              {editingServiceId && <button type="button" onClick={cancelEditService} style={BTN_SECONDARY}>Cancel</button>}
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {services.length === 0 && <p style={{ color: 'rgba(240,236,228,0.35)', textAlign: 'center', padding: '2rem 0', fontSize: '14px' }}>No services yet. Add one above.</p>}
            {services.map(service => (
              <div key={service._id} style={{ ...GLASS, padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                <div style={{ minWidth: 0 }}>
                  <span style={{ color: '#f0ece4', fontWeight: 500 }}>{service.name}</span>
                  <span style={{ color: 'rgba(240,236,228,0.4)', fontSize: '13px' }}> — {service.duration} min — ₹{service.price}</span>
                  {service.description && <p style={{ fontSize: '12px', color: 'rgba(240,236,228,0.35)', marginTop: '4px', marginBottom: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{service.description}</p>}
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                  <button onClick={() => startEditService(service)} style={{ background: 'none', border: 'none', color: 'rgba(232,201,122,0.8)', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                  <button onClick={() => deleteService(service._id)} style={{ background: 'none', border: 'none', color: '#e07070', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STYLISTS TAB */}
      {activeTab === 'stylists' && (
        <div>
          <form onSubmit={handleStylistSubmit} style={{ ...GLASS, padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', fontWeight: 400, color: '#f0ece4', marginBottom: '1rem', marginTop: 0 }}>
              {editingStylistId ? 'Edit Stylist' : 'Add New Stylist'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input type="text" placeholder="Stylist Name" value={stylistForm.name} onChange={e => setStylistForm(p => ({ ...p, name: e.target.value }))} required style={INPUT_ST} />
              <textarea placeholder="Bio / Description (optional)" value={stylistForm.bio} onChange={e => setStylistForm(p => ({ ...p, bio: e.target.value }))} style={{ ...INPUT_ST, resize: 'vertical' }} rows="2" />
              <input type="url" placeholder="Image URL (optional)" value={stylistForm.image} onChange={e => setStylistForm(p => ({ ...p, image: e.target.value }))} style={INPUT_ST} />
              <div>
                <label style={{ display: 'block', fontSize: '11px', color: 'rgba(240,236,228,0.4)', marginBottom: '0.4rem', letterSpacing: '0.1em' }}>
                  Services offered — hold Ctrl / Cmd to select multiple
                </label>
                <select multiple value={stylistForm.services} onChange={handleStylistServiceChange} style={{ ...INPUT_ST, height: '8rem' }}>
                  {allServices.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
              <button type="submit" style={BTN_PRIMARY}>{editingStylistId ? 'Update Stylist' : 'Create Stylist'}</button>
              {editingStylistId && <button type="button" onClick={cancelEditStylist} style={BTN_SECONDARY}>Cancel</button>}
            </div>
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {stylists.length === 0 && <p style={{ color: 'rgba(240,236,228,0.35)', textAlign: 'center', padding: '2rem 0', fontSize: '14px' }}>No stylists yet. Add one above.</p>}
            {stylists.map(stylist => (
              <div key={stylist._id} style={{ ...GLASS, padding: '1rem 1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ minWidth: 0 }}>
                    <h3 style={{ color: '#f0ece4', fontWeight: 500, marginBottom: '4px', marginTop: 0 }}>{stylist.name}</h3>
                    {stylist.bio && <p style={{ fontSize: '13px', color: 'rgba(240,236,228,0.4)', marginBottom: '6px', marginTop: 0 }}>{stylist.bio}</p>}
                    {stylist.services?.length > 0 && (
                      <div style={{ fontSize: '11px' }}>
                        <span style={{ color: '#e8c97a' }}>Services: </span>
                        <span style={{ color: 'rgba(240,236,228,0.4)' }}>{stylist.services.map(s => s.name).join(', ')}</span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', flexShrink: 0 }}>
                    <button onClick={() => startEditStylist(stylist)} style={{ background: 'none', border: 'none', color: 'rgba(232,201,122,0.8)', cursor: 'pointer', fontSize: '13px' }}>Edit</button>
                    <button onClick={() => deleteStylist(stylist._id)} style={{ background: 'none', border: 'none', color: '#e07070', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BOOKINGS TAB */}
      {activeTab === 'bookings' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {bookings.length === 0
            ? <p style={{ color: 'rgba(240,236,228,0.35)', textAlign: 'center', padding: '3rem 0', fontSize: '14px' }}>No bookings yet.</p>
            : bookings.map(booking => (
              <div key={booking._id} style={{ ...GLASS, padding: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.5rem' }}>
                  <p style={{ fontSize: '13px', color: 'rgba(240,236,228,0.7)', margin: 0 }}>
                    <span style={{ color: '#e8c97a', fontWeight: 500 }}>Customer: </span>
                    {booking.customerName} · {booking.email} · {booking.phone}
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(240,236,228,0.7)', margin: 0 }}>
                    <span style={{ color: '#e8c97a', fontWeight: 500 }}>Service: </span>{booking.service?.name}
                    <span style={{ color: '#e8c97a', fontWeight: 500 }}> · Stylist: </span>{booking.stylist?.name}
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(240,236,228,0.7)', margin: 0 }}>
                    <span style={{ color: '#e8c97a', fontWeight: 500 }}>Date: </span>{booking.date} at {booking.timeSlot}
                  </p>
                  <p style={{ fontSize: '13px', color: 'rgba(240,236,228,0.7)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#e8c97a', fontWeight: 500 }}>Status: </span>
                    <select
                      value={booking.status}
                      onChange={e => updateBookingStatus(booking._id, e.target.value)}
                      style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.15)', color: '#f0ece4', borderRadius: '2px', padding: '3px 8px', fontSize: '12px', outline: 'none' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </p>
                </div>
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
