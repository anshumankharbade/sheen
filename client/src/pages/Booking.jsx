import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";

const Booking = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [stylists, setStylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [selectedStylist, setSelectedStylist] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const timeSlots = ["09:00 AM","10:00 AM","11:00 AM","12:00 PM","01:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];

  useEffect(() => {
    if (!serviceId) return;
    const fetchData = async () => {
      try {
        const [serviceRes, stylistsRes] = await Promise.all([
          api.get(`/services/${serviceId}`),
          api.get("/stylists"),
        ]);
        setService(serviceRes.data);
        const filtered = stylistsRes.data.filter(s => s.services.some(sv => sv._id === serviceId));
        const list = filtered.length ? filtered : stylistsRes.data;
        setStylists(list);
        if (list.length) setSelectedStylist(list[0]._id);
        setLoading(false);
      } catch {
        setError("Failed to load booking data.");
        setLoading(false);
      }
    };
    fetchData();
  }, [serviceId]);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });
    try {
      await api.post("/bookings", {
        customerName,
        phone: customerPhone,
        email: customerEmail,
        service: service._id,
        stylist: selectedStylist,
        date: selectedDate,
        timeSlot: selectedTime,
      });
      setSubmitMessage({ type: "success", text: "Booking confirmed! Redirecting…" });
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setSubmitMessage({ type: "error", text: err.response?.data?.error || "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error || !service) return <ErrorMessage message={error || "Service not found."} />;

  const glass = {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '2px',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '2px',
    background: 'rgba(255,255,255,0.06)',
    color: '#f0ece4',
    fontSize: '14px',
    fontWeight: 300,
    outline: 'none',
    backdropFilter: 'blur(8px)',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'rgba(240,236,228,0.45)',
    marginBottom: '0.5rem',
    fontWeight: 400,
  };

  const isValid = selectedStylist && selectedDate && selectedTime && customerName && customerEmail && customerPhone;

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Page header */}
      <div style={{
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '4rem 2rem 3rem',
        background: 'rgba(0,0,0,0.25)',
        backdropFilter: 'blur(20px)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#e8c97a', marginBottom: '1rem' }}>
          Step 1 of 1
        </div>
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 300, color: '#f0ece4' }}>
          Complete your booking
        </h1>
      </div>

      <div style={{ maxWidth: '672px', margin: '0 auto', padding: '3rem 2rem 5rem' }}>
        {/* Service summary */}
        <div style={{
          ...glass,
          background: 'rgba(232,201,122,0.08)',
          border: '1px solid rgba(232,201,122,0.2)',
          padding: '2rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(232,201,122,0.7)', marginBottom: '0.5rem' }}>
              Selected service
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 300, color: '#f0ece4', marginBottom: '0.25rem' }}>
              {service.name}
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(240,236,228,0.35)', letterSpacing: '0.05em' }}>
              {service.duration} minutes
            </div>
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 300, color: '#e8c97a' }}>
            ₹{service.price}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Your details */}
          <div style={{ ...glass, padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8c97a', marginBottom: '1.5rem' }}>
              Your details
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Full name</label>
                <input type="text" value={customerName} onChange={e => setCustomerName(e.target.value)} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(232,201,122,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(232,201,122,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Phone</label>
                <input type="tel" value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(232,201,122,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
              </div>
            </div>
          </div>

          {/* Stylist */}
          <div style={{ ...glass, padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8c97a', marginBottom: '1.5rem' }}>
              Choose your stylist
            </div>
            {stylists.length === 0 ? (
              <p style={{ color: '#e07070', fontSize: '14px' }}>No stylists available for this service.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {stylists.map(stylist => (
                  <label
                    key={stylist._id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.875rem',
                      borderRadius: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      background: selectedStylist === stylist._id ? 'rgba(232,201,122,0.12)' : 'rgba(255,255,255,0.04)',
                      border: selectedStylist === stylist._id ? '1px solid rgba(232,201,122,0.4)' : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <input
                      type="radio"
                      name="stylist"
                      value={stylist._id}
                      checked={selectedStylist === stylist._id}
                      onChange={e => setSelectedStylist(e.target.value)}
                      style={{ accentColor: '#e8c97a' }}
                    />
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 400, color: '#f0ece4' }}>{stylist.name}</div>
                      {stylist.bio && <div style={{ fontSize: '12px', color: 'rgba(240,236,228,0.4)', marginTop: '2px' }}>{stylist.bio}</div>}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div style={{ ...glass, padding: '2rem', marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e8c97a', marginBottom: '1.5rem' }}>
              Date & time
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>Date</label>
                <input type="date" min={today} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(232,201,122,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'} />
              </div>
              <div>
                <label style={labelStyle}>Time slot</label>
                <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(232,201,122,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}>
                  <option value="">Select a time</option>
                  {timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Feedback */}
          {submitMessage.text && (
            <div style={{
              padding: '0.875rem 1rem',
              marginBottom: '1.25rem',
              fontSize: '14px',
              borderRadius: '2px',
              backdropFilter: 'blur(8px)',
              background: submitMessage.type === 'success' ? 'rgba(111,207,111,0.1)' : 'rgba(224,112,112,0.1)',
              border: submitMessage.type === 'success' ? '1px solid rgba(111,207,111,0.3)' : '1px solid rgba(224,112,112,0.3)',
              color: submitMessage.type === 'success' ? '#6fcf6f' : '#e07070',
            }}>
              {submitMessage.text}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            style={{
              width: '100%',
              padding: '1rem',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              fontWeight: 400,
              borderRadius: '2px',
              border: '1px solid',
              cursor: isValid && !isSubmitting ? 'pointer' : 'not-allowed',
              transition: 'all 0.3s',
              background: isValid && !isSubmitting ? 'rgba(232,201,122,0.9)' : 'rgba(255,255,255,0.05)',
              color: isValid && !isSubmitting ? '#0d0b10' : 'rgba(240,236,228,0.3)',
              borderColor: isValid && !isSubmitting ? 'rgba(232,201,122,0.8)' : 'rgba(255,255,255,0.08)',
            }}
          >
            {isSubmitting ? "Confirming…" : "Confirm booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Booking;