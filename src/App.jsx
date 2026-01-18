import React, { useState, useEffect, useMemo, useCallback } from 'react';

// =============================================
// CASITA DEL JEBB - v4
// Desktop layout, better copy, date picker
// =============================================

const HOST_INFO = {
  name: 'Jeb',
  photo: 'https://i.ibb.co/8gTcfDLy/carlos.jpg',
  whatsapp: '+573001234567',
  responseTime: '< 2 hours',
  quickBio: "Been helping people fall in love with Medellín for 5 years now. Hundreds of happy guests and counting.",
  stats: { guests: '500+', rating: '4.9', reviews: '312', years: '5' }
};

const testimonials = [
  { name: 'Sarah & Mike', location: 'Austin, TX', text: "The team made everything so easy. Coffee farm was life-changing, already planning our next trip!", rating: 5, trip: 'Coffee Farm', emoji: '☕' },
  { name: 'James', location: 'London, UK', text: "That speakeasy behind the bookshelf? Never would've found it alone. Felt like we had a local friend the whole time.", rating: 5, trip: 'Night Out', emoji: '🥃' },
  { name: 'Ana & Friends', location: 'Miami, FL', text: "Bachelorette for 6 girls. They handled everything. Safe drivers, great restaurants, backup plans ready. 10/10.", rating: 5, trip: 'Bachelorette', emoji: '👯‍♀️' },
];

const faqs = [
  { q: "How does this work?", a: "Browse what looks good, add to cart, checkout. We'll WhatsApp you within a couple hours to confirm everything and answer questions.", emoji: "💬" },
  { q: "What if plans change?", a: "Free cancellation up to 24 hours before. Airport transfers can cancel anytime. Life happens, we get it.", emoji: "🔄" },
  { q: "Is it safe?", a: "We only work with drivers and guides we personally know and trust. Used every service ourselves. Your safety comes first.", emoji: "🛡️" },
  { q: "What about flight delays?", a: "We track your flight. If it's delayed, your driver adjusts automatically. No extra charge, no stress.", emoji: "✈️" },
  { q: "Can you do custom stuff?", a: "That's our favorite part. Proposals, birthdays, weird requests. Use concierge or just text us directly.", emoji: "✨" },
  { q: "Why you vs Airbnb?", a: "Just a few of us who live here and love this city. You're talking to real people who want your trip to be great.", emoji: "🤝" },
];

const conciergeChips = [
  { label: 'Restaurant reservation', emoji: '🍽️' },
  { label: 'Birthday surprise', emoji: '🎂' },
  { label: 'Spa day', emoji: '💆' },
  { label: 'Custom tour', emoji: '🗺️' },
  { label: 'Private security', emoji: '🛡️' },
  { label: 'Yacht rental', emoji: '🛥️' },
  { label: 'Event tickets', emoji: '🎫' },
  { label: 'Something else', emoji: '🎲' },
];

const nightVibes = [
  { id: 'chill', name: 'Chill Vibes', emoji: '🌅', desc: 'Good drinks, good talks, rooftops with views.', color: '#4ECDC4' },
  { id: 'party', name: 'Full Send', emoji: '🔥', desc: 'Clubs, dancing, stories for later.', color: '#FF6B6B' },
  { id: 'date', name: 'Date Night', emoji: '💕', desc: 'Romantic, intimate, impressive.', color: '#C44569' },
  { id: 'local', name: 'Local Experience', emoji: '🇨🇴', desc: 'Where paisas actually go. More salsa, less English.', color: '#F8B500' },
];

const nightAreas = [
  { id: 'provenza', name: 'Provenza', desc: 'Trendy restaurants, upscale bars.', emoji: '✨' },
  { id: 'poblado', name: 'Parque Lleras', desc: 'Classic nightlife, high energy.', emoji: '🎉' },
  { id: 'laureles', name: 'Laureles', desc: 'Local vibes, more dancing.', emoji: '🏘️' },
  { id: 'centro', name: 'Centro', desc: 'Raw, authentic, real.', emoji: '🎭' },
];

const nightActivities = [
  { id: 'dinner', name: 'Dinner', price: 50, emoji: '🍽️', time: '7-9pm', desc: 'Reserved table somewhere great' },
  { id: 'rooftop', name: 'Rooftop Drinks', price: 30, emoji: '🌃', time: '9-11pm', desc: 'City views + cocktails' },
  { id: 'speakeasy', name: 'Hidden Speakeasy', price: 35, emoji: '🥃', time: '9-11pm', desc: 'Secret bars, craft cocktails' },
  { id: 'salsa', name: 'Salsa Lesson', price: 40, emoji: '💃', time: '8-9pm', desc: 'Learn the basics' },
  { id: 'pregame', name: 'Pre-Game Setup', price: 50, emoji: '🍾', time: '9-10pm', desc: 'Bottles delivered to you' },
  { id: 'club', name: 'Club + Table', price: 100, emoji: '🎵', time: '11pm-late', desc: 'Skip the line, table ready' },
  { id: 'latenight', name: 'Late Night Food', price: 15, emoji: '🌮', time: '2-4am', desc: 'Best 3am eats' },
  { id: 'saferide', name: 'Safe Ride Home', price: 25, emoji: '🚗', time: 'End of night', desc: 'Trusted driver home' },
];

const services = {
  tours: [
    { id: 't1', name: 'Comuna 13 Street Art Tour', price: 45, time: '3 hours', emoji: '🎨', color: '#FF6B6B', tag: 'MOST POPULAR', rating: 4.9, reviews: 312, spotsLeft: 4, desc: 'A local guide who actually grew up here takes you through the neighborhood. Street art, outdoor escalators, and stories that give you context.' },
    { id: 't2', name: 'Private Coffee Farm', price: 89, time: '6 hours', emoji: '☕', color: '#06D6A0', tag: 'TOP RATED', rating: 4.95, reviews: 187, spotsLeft: 2, desc: 'Pick beans, roast your own coffee, have lunch with the family. You leave with fresh coffee and a new appreciation.' },
    { id: 't3', name: 'Guatapé Day Trip', price: 95, time: '10 hours', emoji: '🪨', color: '#4CC9F0', tag: 'BUCKET LIST', rating: 4.9, reviews: 423, spotsLeft: 6, desc: '740 steps to the top, incredible views, colorful town, boat ride. Long day but worth every minute.' },
    { id: 't4', name: 'Food Markets Tour', price: 55, time: '4 hours', emoji: '🥘', color: '#FFD93D', rating: 4.85, reviews: 156, desc: 'Markets, hole-in-the-walls, fruits you\'ve never seen. You\'ll know what to order for the rest of your trip.' },
    { id: 't5', name: 'Paragliding', price: 75, time: '2-3 hours', emoji: '🪂', color: '#7209B7', tag: 'ADVENTURE', rating: 4.9, reviews: 234, desc: 'Tandem flight with a pro pilot. 20 minutes of magic, all photos included.' },
  ],
  transport: [
    { id: 'tr1', name: 'Airport Pickup', price: 35, time: 'Any time', emoji: '✈️', color: '#00B4D8', tag: 'ESSENTIAL', rating: 4.95, reviews: 534, desc: 'Driver waiting with your name. Flight tracked, delays handled automatically.' },
    { id: 'tr2', name: 'Airport Drop-off', price: 30, time: 'Any time', emoji: '🛫', color: '#0077B6', rating: 4.95, reviews: 412, desc: 'On-time guarantee. Plenty of buffer, traffic monitored.' },
    { id: 'tr3', name: 'Full Day Driver', price: 140, time: '8 hours', emoji: '🚗', color: '#023E8A', tag: 'BEST VALUE', rating: 4.9, reviews: 198, desc: 'Your driver for the day. Point where you want to go, no stress.' },
    { id: 'tr4', name: 'Half Day Driver', price: 80, time: '4 hours', emoji: '🚙', color: '#0096C7', rating: 4.85, reviews: 145, desc: '4 hours to explore, run errands, or get oriented.' },
  ],
  food: [
    { id: 'm1', name: 'Welcome Package', price: 65, time: 'Pre-arrival', emoji: '🧺', color: '#E63946', tag: 'GUEST FAVORITE', rating: 4.95, reviews: 89, desc: 'Fresh fruit, wine, coffee, chocolates waiting when you arrive.' },
    { id: 'm2', name: 'Private Chef', price: 120, time: '3-4 hours', emoji: '👨‍🍳', color: '#F4A261', tag: 'PREMIUM', rating: 5.0, reviews: 67, desc: '4-course tasting menu, wine pairing, full cleanup. You do nothing.' },
    { id: 'm3', name: 'Daily Breakfast', price: 22, time: 'Every morning', emoji: '🥐', color: '#E9C46A', rating: 4.8, reviews: 134, desc: 'Fresh arepas, eggs, fruit, juice, coffee. Delivered hot.' },
    { id: 'm4', name: 'Meal Prep (5 meals)', price: 95, time: 'One-time', emoji: '🍱', color: '#2A9D8F', tag: 'NEW', rating: 4.85, reviews: 45, desc: '5 balanced meals, chef-prepared, ready to heat.' },
  ],
};

// Toast notification
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div style={{ position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)', background: type === 'success' ? '#4ECDC4' : '#FF6B6B', color: '#fff', padding: '14px 24px', borderRadius: 16, zIndex: 1000, boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
      {type === 'success' ? '✓' : '✕'} {message}
    </div>
  );
};

// Floating WhatsApp Button
const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("Hey! I have a question about booking...")}`}
    target="_blank"
    rel="noopener noreferrer"
    style={{
      position: 'fixed',
      bottom: 90,
      right: 20,
      width: 56,
      height: 56,
      borderRadius: 28,
      background: '#25D366',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
      zIndex: 40,
      textDecoration: 'none',
      fontSize: 28,
    }}
  >
    💬
  </a>
);

// Date Picker Component
const DatePicker = ({ selectedDate, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty slots for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add days of month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentMonth);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div style={{ background: '#1a1a2e', borderRadius: 16, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
          style={{ width: 36, height: 36, borderRadius: 18, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 16 }}
        >←</button>
        <span style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
          style={{ width: 36, height: 36, borderRadius: 18, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', fontSize: 16 }}
        >→</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 12, padding: 8 }}>{d}</div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {days.map((day, i) => {
          if (!day) return <div key={i} />;
          const isPast = day < today;
          const isSelected = selectedDate && day.toDateString() === new Date(selectedDate).toDateString();
          const isToday = day.toDateString() === today.toDateString();

          return (
            <button
              key={i}
              onClick={() => !isPast && onSelect(day.toISOString())}
              disabled={isPast}
              style={{
                padding: 10,
                borderRadius: 10,
                border: isSelected ? '2px solid #4ECDC4' : '2px solid transparent',
                background: isSelected ? 'rgba(78,205,196,0.2)' : isToday ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: isPast ? 'rgba(255,255,255,0.2)' : isSelected ? '#4ECDC4' : '#fff',
                cursor: isPast ? 'not-allowed' : 'pointer',
                fontSize: 14,
                fontWeight: isSelected || isToday ? 600 : 400,
              }}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('tours');
  const [selectedService, setSelectedService] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [booking, setBooking] = useState({ date: '', guests: 2 });
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [toast, setToast] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [nightStep, setNightStep] = useState(0);
  const [nightPlan, setNightPlan] = useState({ vibe: null, area: null, activities: [] });
  const [conciergeMsg, setConciergeMsg] = useState('');

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => { try { const c = localStorage.getItem('cart'); if (c) setCart(JSON.parse(c)); } catch {} }, []);
  useEffect(() => { try { localStorage.setItem('cart', JSON.stringify(cart)); } catch {} }, [cart]);

  const showToast = useCallback((msg, type = 'success') => setToast({ message: msg, type }), []);
  const cartTotal = useMemo(() => cart.reduce((s, i) => s + i.total, 0), [cart]);

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, ...booking, cartId: Date.now(), total: item.price * booking.guests }]);
    setSelectedService(null); setView('home'); setCartOpen(true);
    showToast(`${item.name} added!`);
  };

  const addNightToCart = () => {
    const total = nightPlan.activities.reduce((s, a) => s + a.price, 0) * booking.guests;
    setCart(prev => [...prev, { id: 'night-' + Date.now(), name: `${nightPlan.vibe.name} in ${nightPlan.area.name}`, emoji: '🌙', activities: nightPlan.activities, ...booking, cartId: Date.now(), total, isNight: true }]);
    setNightStep(0); setNightPlan({ vibe: null, area: null, activities: [] }); setView('home'); setCartOpen(true);
    showToast('Night added!');
  };

  // Check if desktop
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 900);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // HOME VIEW
  const HomeView = () => (
    <div style={{ minHeight: '100vh', background: '#0D0D0D', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>

      {/* Hero Section */}
      <header style={{
        padding: isDesktop ? '60px 60px 50px' : '50px 24px 40px',
        background: 'linear-gradient(165deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: isDesktop ? 'flex' : 'block',
        gap: 60,
        maxWidth: 1400,
        margin: '0 auto',
      }}>
        {/* Left: Hero Text */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'rgba(255,107,107,0.2)', border: '1px solid rgba(255,107,107,0.4)', borderRadius: 30, padding: '10px 18px', marginBottom: 20 }}>
            <span>🇨🇴</span><span style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>Parce, let's make it happen</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>
            Your Medellín trip,<br /><span style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>sorted.</span>
          </h1>
          <p style={{ margin: '16px 0 0', fontSize: 17, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, maxWidth: 500 }}>
            Skip the research. We live here and we'll handle everything: tours, transport, and nights you'll actually remember.
          </p>

          {/* Host info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 28, padding: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 16, maxWidth: 400 }}>
            <img src={HOST_INFO.photo} alt={HOST_INFO.name} style={{ width: 56, height: 56, borderRadius: 28, objectFit: 'cover', border: '2px solid #4ECDC4' }} />
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Hey, we're Jeb's team 👋</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 }}>{HOST_INFO.quickBio}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 24, marginTop: 24 }}>
            <div><div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>⭐ {HOST_INFO.stats.rating}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{HOST_INFO.stats.reviews} reviews</div></div>
            <div><div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{HOST_INFO.stats.guests}</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>happy guests</div></div>
            <div><div style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>{HOST_INFO.stats.years} years</div><div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>in Medellín</div></div>
          </div>
        </div>

        {/* Right: Action Cards (Desktop) */}
        {isDesktop && (
          <div style={{ width: 380, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <button onClick={() => setView('night-builder')} style={{ background: 'linear-gradient(135deg, #C44569, #FF6B6B, #F8B500)', borderRadius: 20, padding: 24, border: 'none', textAlign: 'left', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', right: -10, bottom: -10, fontSize: 70, opacity: 0.2 }}>🌙</div>
              <div style={{ position: 'relative' }}>
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 20, padding: '5px 10px', fontSize: 10, fontWeight: 700, color: '#fff', display: 'inline-block', marginBottom: 8 }}>✨ MOST POPULAR</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 6 }}>Build Your Night</div>
                <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>Dinner → Drinks → Dancing</div>
              </div>
            </button>

            <button onClick={() => setView('concierge')} style={{ background: '#161625', border: '2px solid #4ECDC4', borderRadius: 20, padding: 20, display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ width: 48, height: 48, borderRadius: 24, background: 'rgba(78,205,196,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>💬</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Need something specific?</div>
                <div style={{ fontSize: 13, color: '#4ECDC4' }}>Tell us → We make it happen</div>
              </div>
            </button>

            {/* Quick Experience Preview */}
            <div style={{ background: '#161625', borderRadius: 20, padding: 20 }}>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 12, fontWeight: 600 }}>POPULAR EXPERIENCES</div>
              {services.tours.slice(0, 3).map(s => (
                <div
                  key={s.id}
                  onClick={() => { setSelectedService(s); setView('detail'); }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: 24 }}>{s.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{s.name}</div>
                    {s.spotsLeft && s.spotsLeft <= 6 && <div style={{ color: '#FF6B6B', fontSize: 11 }}>Only {s.spotsLeft} spots left</div>}
                  </div>
                  <div style={{ color: '#4ECDC4', fontSize: 14, fontWeight: 600 }}>from ${s.price}</div>
                </div>
              ))}
              <div
                onClick={() => document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ color: '#4ECDC4', fontSize: 13, fontWeight: 600, marginTop: 12, cursor: 'pointer', textAlign: 'center' }}
              >
                View all experiences ↓
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Quick Actions */}
      {!isDesktop && (
        <section style={{ padding: 20, display: 'grid', gap: 16 }}>
          <button onClick={() => setView('night-builder')} style={{ background: 'linear-gradient(135deg, #C44569, #FF6B6B, #F8B500)', borderRadius: 20, padding: 28, border: 'none', textAlign: 'left', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: -20, bottom: -20, fontSize: 100, opacity: 0.2 }}>🌙</div>
            <div style={{ position: 'relative' }}>
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: 20, padding: '6px 12px', fontSize: 11, fontWeight: 700, color: '#fff', display: 'inline-block', marginBottom: 10 }}>✨ MOST POPULAR</div>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 8 }}>Build Your Night</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)' }}>Dinner → Drinks → Dancing. Pick your vibe.</div>
            </div>
          </button>

          <button onClick={() => setView('concierge')} style={{ background: '#161625', border: '2px solid #4ECDC4', borderRadius: 20, padding: 22, display: 'flex', alignItems: 'center', gap: 16, textAlign: 'left', cursor: 'pointer' }}>
            <div style={{ width: 56, height: 56, borderRadius: 28, background: 'rgba(78,205,196,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>💬</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 4 }}>Need something specific?</div>
              <div style={{ fontSize: 14, color: '#4ECDC4' }}>Tell us → We make it happen</div>
            </div>
          </button>
        </section>
      )}

      {/* Tabs */}
      <nav id="services-section" style={{ padding: isDesktop ? '24px 60px 16px' : '8px 20px 16px', display: 'flex', gap: 10, position: 'sticky', top: 0, background: '#0D0D0D', zIndex: 20, maxWidth: 1400, margin: '0 auto' }}>
        {[{ id: 'tours', label: 'Tours', emoji: '🎯' }, { id: 'transport', label: 'Transport', emoji: '🚗' }, { id: 'food', label: 'Food', emoji: '🍽️' }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ flex: 1, maxWidth: 200, padding: '14px 10px', borderRadius: 14, border: activeTab === tab.id ? '2px solid #FF6B6B' : '2px solid transparent', background: activeTab === tab.id ? 'rgba(255,107,107,0.15)' : 'rgba(255,255,255,0.05)', color: activeTab === tab.id ? '#FF6B6B' : 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
            {tab.emoji} {tab.label}
          </button>
        ))}
      </nav>

      {/* Services Grid */}
      <section style={{ padding: isDesktop ? '0 60px 32px' : '0 20px 24px', display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(2, 1fr)' : '1fr', gap: 20, maxWidth: 1400, margin: '0 auto' }}>
        {services[activeTab].map(s => (
          <article key={s.id} onClick={() => { setSelectedService(s); setView('detail'); }} style={{ background: '#161625', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: isDesktop ? 'row' : 'column' }}>
            <div style={{ width: isDesktop ? 140 : '100%', height: isDesktop ? 'auto' : 100, minHeight: isDesktop ? 140 : 100, background: `linear-gradient(135deg, ${s.color}dd, ${s.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', flexShrink: 0 }}>
              <span style={{ fontSize: isDesktop ? 50 : 50 }}>{s.emoji}</span>
              {s.tag && <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: 9, fontWeight: 700, padding: '4px 8px', borderRadius: 12 }}>{s.tag}</div>}
            </div>
            <div style={{ padding: 18, flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>{s.name}</h3>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#4ECDC4' }}>from ${s.price}</div>
                </div>
              </div>
              <p style={{ margin: '0 0 10px', fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{s.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                <span>⏱️ {s.time}</span>
                <span>⭐ {s.rating}</span>
                {s.spotsLeft && s.spotsLeft <= 6 && <span style={{ color: '#FF6B6B', fontWeight: 600 }}>🔥 {s.spotsLeft} spots left</span>}
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Testimonials */}
      <section style={{ padding: isDesktop ? '32px 60px' : '24px 20px', background: '#161625' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20, marginTop: 0 }}>What guests say 💬</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : '1fr', gap: 16 }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: '#1a1a2e', borderRadius: 16, padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 22, background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>{t.emoji}</div>
                  <div><div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{t.name}</div><div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{t.location}</div></div>
                </div>
                <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)', fontSize: 14, lineHeight: 1.6 }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: isDesktop ? '32px 60px 100px' : '24px 20px 100px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 20, marginTop: 0 }}>Questions? 🤙</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: '#161625', borderRadius: 16, marginBottom: 10, overflow: 'hidden' }}>
              <button onClick={() => setExpandedFaq(expandedFaq === i ? null : i)} style={{ width: '100%', padding: 18, display: 'flex', alignItems: 'center', gap: 14, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: 22 }}>{f.emoji}</span>
                <span style={{ flex: 1, color: '#fff', fontSize: 16, fontWeight: 600 }}>{f.q}</span>
                <span style={{ color: '#4ECDC4', transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }}>▼</span>
              </button>
              {expandedFaq === i && <div style={{ padding: '0 18px 18px 54px', color: 'rgba(255,255,255,0.7)', fontSize: 15, lineHeight: 1.7 }}>{f.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Cart Bar */}
      {cart.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
          <div><div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>${cartTotal}</div><div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{cart.length} item{cart.length > 1 ? 's' : ''}</div></div>
          <button onClick={() => setCartOpen(true)} style={{ padding: '12px 24px', borderRadius: 12, border: 'none', background: '#fff', color: '#0D0D0D', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>View Cart →</button>
        </div>
      )}
    </div>
  );

  // DETAIL VIEW
  const DetailView = () => {
    if (!selectedService) return null;
    const s = selectedService;
    return (
      <div style={{ maxWidth: 900, margin: '0 auto', minHeight: '100vh', background: '#0D0D0D', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <div style={{ position: 'sticky', top: 0, background: '#0D0D0D', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, zIndex: 30, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={() => { setSelectedService(null); setView('home'); }} style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
          <span style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{s.name}</span>
        </div>
        <div style={{ height: 200, background: `linear-gradient(135deg, ${s.color}dd, ${s.color}66)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 90 }}>{s.emoji}</span></div>
        <div style={{ padding: 24 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#fff' }}>{s.name}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 10 }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#4ECDC4' }}>${s.price}</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>per person</span>
            <span style={{ marginLeft: 'auto', color: '#F8B500' }}>⭐ {s.rating} ({s.reviews})</span>
          </div>
          {s.spotsLeft && s.spotsLeft <= 6 && (
            <div style={{ display: 'inline-block', background: 'rgba(255,107,107,0.15)', color: '#FF6B6B', padding: '8px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600, marginTop: 14 }}>
              🔥 Only {s.spotsLeft} spots left this week
            </div>
          )}
          <p style={{ margin: '20px 0', fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>{s.desc}</p>

          <div style={{ background: '#161625', borderRadius: 20, padding: 24, marginTop: 24 }}>
            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginTop: 0, marginBottom: 20 }}>Book this experience</h3>

            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, display: 'block', marginBottom: 12 }}>Select a date</label>
              <DatePicker selectedDate={booking.date} onSelect={(date) => setBooking({ ...booking, date })} />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, display: 'block', marginBottom: 10 }}>Guests</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button onClick={() => setBooking({ ...booking, guests: Math.max(1, booking.guests - 1) })} style={{ width: 48, height: 48, borderRadius: 24, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 22, cursor: 'pointer' }}>−</button>
                <span style={{ color: '#fff', fontSize: 22, fontWeight: 700, minWidth: 40, textAlign: 'center' }}>{booking.guests}</span>
                <button onClick={() => setBooking({ ...booking, guests: booking.guests + 1 })} style={{ width: 48, height: 48, borderRadius: 24, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', fontSize: 22, cursor: 'pointer' }}>+</button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.1)', marginBottom: 20 }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>${s.price} × {booking.guests} guest{booking.guests > 1 ? 's' : ''}</span>
              <span style={{ color: '#4ECDC4', fontSize: 24, fontWeight: 700 }}>${s.price * booking.guests}</span>
            </div>

            <button onClick={() => addToCart(s)} disabled={!booking.date} style={{ width: '100%', padding: 18, borderRadius: 14, border: 'none', background: booking.date ? 'linear-gradient(135deg, #4ECDC4, #44A08D)' : 'rgba(255,255,255,0.1)', color: booking.date ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 17, fontWeight: 700, cursor: booking.date ? 'pointer' : 'not-allowed' }}>
              {booking.date ? 'Add to Cart' : 'Select a date first'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // NIGHT BUILDER
  const NightBuilderView = () => (
    <div style={{ maxWidth: 900, margin: '0 auto', minHeight: '100vh', background: '#0D0D0D', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ position: 'sticky', top: 0, background: '#0D0D0D', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, zIndex: 30, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={() => { setView('home'); setNightStep(0); setNightPlan({ vibe: null, area: null, activities: [] }); }} style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><div style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Build Your Night</div><div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Step {nightStep + 1} of 3</div></div>
      </div>

      <div style={{ padding: 24 }}>
        {nightStep === 0 && (
          <>
            <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 800, marginBottom: 8, marginTop: 0 }}>What's the vibe? 🎭</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, marginTop: 0 }}>Pick the energy for your night</p>
            {nightVibes.map(v => (
              <button key={v.id} onClick={() => { setNightPlan({ ...nightPlan, vibe: v }); setNightStep(1); }} style={{ width: '100%', padding: 22, borderRadius: 18, border: '2px solid rgba(255,255,255,0.1)', background: '#161625', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14 }}>
                <div style={{ fontSize: 38, width: 60, height: 60, borderRadius: 30, background: `${v.color}22`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{v.emoji}</div>
                <div><div style={{ color: '#fff', fontSize: 19, fontWeight: 700 }}>{v.name}</div><div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>{v.desc}</div></div>
              </button>
            ))}
          </>
        )}

        {nightStep === 1 && (
          <>
            <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 800, marginBottom: 8, marginTop: 0 }}>Where to? 📍</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, marginTop: 0 }}>Pick your neighborhood</p>
            {nightAreas.map(a => (
              <button key={a.id} onClick={() => { setNightPlan({ ...nightPlan, area: a }); setNightStep(2); }} style={{ width: '100%', padding: 22, borderRadius: 18, border: '2px solid rgba(255,255,255,0.1)', background: '#161625', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 18, marginBottom: 14 }}>
                <div style={{ fontSize: 34, width: 60, height: 60, borderRadius: 30, background: 'rgba(78,205,196,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.emoji}</div>
                <div><div style={{ color: '#fff', fontSize: 19, fontWeight: 700 }}>{a.name}</div><div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 4 }}>{a.desc}</div></div>
              </button>
            ))}
            <button onClick={() => setNightStep(0)} style={{ marginTop: 10, padding: '12px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>← Back</button>
          </>
        )}

        {nightStep === 2 && (
          <>
            <h2 style={{ color: '#fff', fontSize: 26, fontWeight: 800, marginBottom: 8, marginTop: 0 }}>Pick activities 🌙</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 24, marginTop: 0 }}>Select what sounds good (pick as many as you want)</p>
            {nightActivities.map(a => {
              const selected = nightPlan.activities.find(x => x.id === a.id);
              return (
                <button key={a.id} onClick={() => setNightPlan({ ...nightPlan, activities: selected ? nightPlan.activities.filter(x => x.id !== a.id) : [...nightPlan.activities, a] })} style={{ width: '100%', padding: 18, borderRadius: 16, border: selected ? '2px solid #4ECDC4' : '2px solid rgba(255,255,255,0.1)', background: selected ? 'rgba(78,205,196,0.1)' : '#161625', cursor: 'pointer', textAlign: 'left', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 30 }}>{a.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: 17, fontWeight: 600 }}>{a.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{a.time} · {a.desc}</div>
                  </div>
                  <div style={{ color: '#4ECDC4', fontSize: 17, fontWeight: 700 }}>${a.price}</div>
                  {selected && <div style={{ width: 26, height: 26, borderRadius: 13, background: '#4ECDC4', color: '#0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700 }}>✓</div>}
                </button>
              );
            })}
            <button onClick={() => setNightStep(1)} style={{ marginTop: 10, padding: '12px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>← Back</button>
          </>
        )}
      </div>

      {nightStep === 2 && nightPlan.activities.length > 0 && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#161625', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
          <div><div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>${nightPlan.activities.reduce((s, a) => s + a.price, 0)}</div><div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{nightPlan.activities.length} selected</div></div>
          <button onClick={addNightToCart} style={{ padding: '14px 28px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg, #C44569, #FF6B6B)', color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>Add to Cart →</button>
        </div>
      )}
    </div>
  );

  // CONCIERGE
  const ConciergeView = () => (
    <div style={{ maxWidth: 900, margin: '0 auto', minHeight: '100vh', background: '#0D0D0D', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      <div style={{ position: 'sticky', top: 0, background: '#0D0D0D', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14, zIndex: 30, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button onClick={() => setView('home')} style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <span style={{ color: '#fff', fontSize: 16, fontWeight: 700 }}>Concierge</span>
      </div>

      <div style={{ padding: 24 }}>
        <div style={{ background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', borderRadius: 24, padding: 28, marginBottom: 28, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', right: -20, bottom: -20, fontSize: 90, opacity: 0.2 }}>💬</div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fff' }}>We'll make it happen ✨</h2>
          <p style={{ margin: '12px 0 0', fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>Custom requests, special occasions, whatever you need.</p>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 14, marginTop: 0, letterSpacing: 1 }}>QUICK REQUESTS</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {conciergeChips.map((c, i) => (
              <button key={i} onClick={() => setConciergeMsg(c.label)} style={{ padding: '12px 16px', borderRadius: 24, border: '1px solid rgba(255,255,255,0.15)', background: conciergeMsg === c.label ? 'rgba(78,205,196,0.2)' : 'rgba(255,255,255,0.05)', color: conciergeMsg === c.label ? '#4ECDC4' : 'rgba(255,255,255,0.8)', fontSize: 14, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                {c.emoji} {c.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, marginBottom: 12, marginTop: 0, letterSpacing: 1 }}>DETAILS</h3>
          <textarea value={conciergeMsg} onChange={e => setConciergeMsg(e.target.value)} placeholder="Tell us what you need..." rows={5} style={{ width: '100%', padding: 18, borderRadius: 16, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 16, resize: 'none', boxSizing: 'border-box', lineHeight: 1.5 }} />
        </div>

        <button onClick={() => { if (conciergeMsg.trim()) window.open(`https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hey! ${conciergeMsg}`)}`, '_blank'); }} disabled={!conciergeMsg.trim()} style={{ width: '100%', padding: 18, borderRadius: 16, border: 'none', background: conciergeMsg.trim() ? 'linear-gradient(135deg, #4ECDC4, #44A08D)' : 'rgba(255,255,255,0.1)', color: conciergeMsg.trim() ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 17, fontWeight: 700, cursor: conciergeMsg.trim() ? 'pointer' : 'not-allowed' }}>
          💬 Send on WhatsApp
        </button>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 14, marginTop: 14 }}>We usually reply within {HOST_INFO.responseTime}</p>
      </div>
    </div>
  );

  // CART
  const CartSheet = () => {
    if (!cartOpen) return null;
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }} onClick={() => setCartOpen(false)}>
        <div style={{ background: '#161625', width: '100%', maxWidth: 500, maxHeight: '80vh', borderRadius: '24px 24px 0 0', overflow: 'hidden' }} onClick={e => e.stopPropagation()}>
          <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: 20, fontWeight: 700 }}>Cart ({cart.length})</h3>
            <button onClick={() => setCartOpen(false)} style={{ width: 36, height: 36, borderRadius: 18, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', fontSize: 16, cursor: 'pointer' }}>✕</button>
          </div>
          <div style={{ padding: 20, maxHeight: '45vh', overflowY: 'auto' }}>
            {cart.map(item => (
              <div key={item.cartId} style={{ background: '#1a1a2e', borderRadius: 16, padding: 18, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 16 }}>
                <span style={{ fontSize: 32 }}>{item.emoji}</span>
                <div style={{ flex: 1 }}><div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{item.name}</div><div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{item.guests} guest{item.guests > 1 ? 's' : ''}</div></div>
                <div style={{ color: '#4ECDC4', fontSize: 18, fontWeight: 700 }}>${item.total}</div>
                <button onClick={() => setCart(cart.filter(c => c.cartId !== item.cartId))} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid rgba(255,107,107,0.3)', background: 'transparent', color: '#FF6B6B', fontSize: 12, cursor: 'pointer' }}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{ padding: '20px 24px 32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}><span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Total</span><span style={{ color: '#4ECDC4', fontSize: 28, fontWeight: 700 }}>${cartTotal}</span></div>
            <button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }} style={{ width: '100%', padding: 18, borderRadius: 16, border: 'none', background: 'linear-gradient(135deg, #4ECDC4, #44A08D)', color: '#fff', fontSize: 17, fontWeight: 700, cursor: 'pointer' }}>💳 Checkout</button>
          </div>
        </div>
      </div>
    );
  };

  // CHECKOUT
  const CheckoutModal = () => {
    const [info, setInfo] = useState({ name: '', whatsapp: '', email: '' });
    if (!checkoutOpen) return null;
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={() => setCheckoutOpen(false)}>
        <div style={{ background: '#161625', borderRadius: 24, width: '100%', maxWidth: 440, maxHeight: '90vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
          <div style={{ padding: 24, borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: 22, fontWeight: 700 }}>Complete Booking</h3>
            <button onClick={() => setCheckoutOpen(false)} style={{ width: 40, height: 40, borderRadius: 20, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', fontSize: 18 }}>✕</button>
          </div>
          <div style={{ padding: 24 }}>
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 12, marginTop: 0, letterSpacing: 1 }}>ORDER SUMMARY</h4>
              {cart.map(item => (
                <div key={item.cartId} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#fff' }}>{item.emoji} {item.name}</span>
                  <span style={{ color: '#4ECDC4', fontWeight: 600 }}>${item.total}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0', marginTop: 8 }}><span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Total</span><span style={{ color: '#4ECDC4', fontSize: 26, fontWeight: 700 }}>${cartTotal}</span></div>
            </div>

            <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 12, marginTop: 0, letterSpacing: 1 }}>YOUR DETAILS</h4>
            <input type="text" placeholder="Your Name" value={info.name} onChange={e => setInfo({ ...info, name: e.target.value })} style={{ width: '100%', padding: 16, borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 16, marginBottom: 12, boxSizing: 'border-box' }} />
            <input type="tel" placeholder="WhatsApp Number" value={info.whatsapp} onChange={e => setInfo({ ...info, whatsapp: e.target.value })} style={{ width: '100%', padding: 16, borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 16, marginBottom: 12, boxSizing: 'border-box' }} />
            <input type="email" placeholder="Email (optional)" value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} style={{ width: '100%', padding: 16, borderRadius: 14, border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 16, marginBottom: 20, boxSizing: 'border-box' }} />

            <button onClick={() => { showToast('Booking confirmed! Check WhatsApp for next steps.'); setCheckoutOpen(false); setCart([]); }} disabled={!info.name || !info.whatsapp} style={{ width: '100%', padding: 18, borderRadius: 16, border: 'none', background: info.name && info.whatsapp ? 'linear-gradient(135deg, #4ECDC4, #44A08D)' : 'rgba(255,255,255,0.1)', color: info.name && info.whatsapp ? '#fff' : 'rgba(255,255,255,0.3)', fontSize: 17, fontWeight: 700, cursor: info.name && info.whatsapp ? 'pointer' : 'not-allowed' }}>
              💳 Pay ${cartTotal} with Stripe
            </button>
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 14, lineHeight: 1.5 }}>We'll WhatsApp you within 2 hours to confirm everything.</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{`* { box-sizing: border-box; } body { margin: 0; background: #0D0D0D; } ::placeholder { color: rgba(255,255,255,0.4); }`}</style>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {view === 'home' && <HomeView />}
      {view === 'detail' && <DetailView />}
      {view === 'night-builder' && <NightBuilderView />}
      {view === 'concierge' && <ConciergeView />}
      <CartSheet />
      <CheckoutModal />
      <WhatsAppButton />
    </>
  );
}
