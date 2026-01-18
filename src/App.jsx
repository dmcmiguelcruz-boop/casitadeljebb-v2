import React, { useState, useEffect, useMemo, useCallback } from 'react';

// =============================================
// MEDELLÍN CONCIERGE - Personality Edition v3
// Bigger cards, more soul, warmer everything
// =============================================

// Your Info (EDIT THIS)
const HOST_INFO = {
  name: 'Jeb',
  photo: 'https://i.ibb.co/8gTcfDLy/carlos.jpg',
  whatsapp: '+573001234567',
  responseTime: '< 2 hours',
  tagline: "I moved to Medellín 5 years ago and never looked back. Now I help travelers skip the tourist traps and experience the city like a local — the hidden spots, the real food, the nights that turn into stories.",
  quickBio: "5 years here. 2,400+ happy guests. Your trip, handled.",
  stats: {
    guests: '2,400+',
    rating: '4.9',
    reviews: '847',
    years: '5',
  }
};

// Testimonials with personality
const testimonials = [
  {
    name: 'Sarah & Mike',
    location: 'Austin, TX',
    text: "We were SO nervous about planning Medellín ourselves. Jeb made everything easy — and the coffee farm? Life-changing. We're already planning our next trip.",
    rating: 5,
    trip: 'Coffee Farm + Guatapé',
    emoji: '☕',
  },
  {
    name: 'James',
    location: 'London, UK',
    text: "That speakeasy behind the bookshelf?? I never would've found that. The whole night felt like we had a local friend showing us the real city.",
    rating: 5,
    trip: 'Night Out Package',
    emoji: '🥃',
  },
  {
    name: 'Ana & Friends',
    location: 'Miami, FL',
    text: "Bachelorette party for 6 girls — Jeb handled EVERYTHING. Safe drivers, incredible restaurants, backup plans when places were packed. 10/10 would trust him again.",
    rating: 5,
    trip: 'Bachelorette Weekend',
    emoji: '👯‍♀️',
  },
];

// FAQ with personality and warmth
const faqs = [
  {
    q: "How does this actually work?",
    a: "Super simple! Browse what sounds good, add it to your cart, and check out. I'll WhatsApp you within a couple hours to say hi, confirm the details, and answer any questions. Think of me as your friend in Medellín who just happens to know everyone.",
    emoji: "💬"
  },
  {
    q: "What if my plans change?",
    a: "Life happens! Free cancellation up to 24 hours before for most stuff. Airport transfers? Cancel anytime. I'm not going to hold your money hostage — we're all adults here.",
    emoji: "🔄"
  },
  {
    q: "Is Medellín actually safe?",
    a: "I wouldn't be here if it wasn't. That said, I only work with drivers and guides I personally know and trust. I've used every single service myself. Your safety isn't something I wing.",
    emoji: "🛡️"
  },
  {
    q: "My flight's probably going to be delayed...",
    a: "No stress! For airport pickups, I track your actual flight. If it's delayed, your driver adjusts automatically. No extra charge, no frantic WhatsApp messages. It just works.",
    emoji: "✈️"
  },
  {
    q: "Can you plan something totally custom?",
    a: "That's literally my favorite thing to do. Proposals, surprise birthdays, specific vibes — use the concierge section or just text me directly. The weirder the request, the more fun it is to figure out.",
    emoji: "✨"
  },
  {
    q: "Why you instead of Airbnb Experiences?",
    a: "Because I actually live here and I actually care. You're not a booking number — you're texting me, a real person, who's going to make sure your trip is amazing. And if something goes wrong? I fix it.",
    emoji: "🤝"
  },
];

// Concierge quick chips
const conciergeChips = [
  { label: 'Restaurant reservation', emoji: '🍽️' },
  { label: 'Birthday surprise', emoji: '🎂' },
  { label: 'Spa day', emoji: '💆' },
  { label: 'Custom tour', emoji: '🗺️' },
  { label: 'Private security', emoji: '🛡️' },
  { label: 'Yacht rental', emoji: '🛥️' },
  { label: 'Event tickets', emoji: '🎫' },
  { label: 'Something wild...', emoji: '🎲' },
];

// Night Builder Options
const nightVibes = [
  { id: 'chill', name: 'Chill Vibes', emoji: '🌅', desc: 'Good drinks, good talks, no rush. Rooftops with views, cocktails you can actually taste.', color: '#4ECDC4' },
  { id: 'party', name: 'Full Send', emoji: '🔥', desc: "Dancing until the sun comes up. Clubs, energy, stories you'll tell forever.", color: '#FF6B6B' },
  { id: 'date', name: 'Date Night', emoji: '💕', desc: 'Romantic, intimate, impressive. Whether it\'s a first date or a 10th anniversary.', color: '#C44569' },
  { id: 'local', name: 'Local Experience', emoji: '🇨🇴', desc: 'Where paisas actually hang. Less English, more salsa, 100% authentic.', color: '#F8B500' },
];

const nightAreas = [
  { id: 'provenza', name: 'Provenza', desc: 'The trendy neighborhood. Great restaurants, upscale bars, beautiful people everywhere.', emoji: '✨' },
  { id: 'poblado', name: 'Parque Lleras', desc: 'Classic nightlife hub. More tourists, yes, but also more energy. Things get wild.', emoji: '🎉' },
  { id: 'laureles', name: 'Laureles', desc: 'Local neighborhood vibes. Less English spoken, more dancing, real Medellín.', emoji: '🏘️' },
  { id: 'centro', name: 'Centro', desc: 'Raw, gritty, real. Not for everyone — but if you want authentic, this is it.', emoji: '🎭' },
];

const nightActivities = [
  {
    id: 'dinner',
    name: 'Dinner',
    price: 50,
    emoji: '🍽️',
    time: '7-9pm',
    desc: 'Reserved table at somewhere actually good',
    vibe: "I'll book you a table at a place I'd take my own friends — not a tourist trap.",
    hasOptions: true,
    subOptions: [
      { id: 'd1', name: 'Carmen', vibe: 'Michelin-recommended. French-Colombian magic. Dress up, take photos, impress everyone.', price: 85, emoji: '🏆', popular: true },
      { id: 'd2', name: 'Alambique', vibe: 'Best steak in the city. Incredible wine list. Special occasion energy.', price: 70, emoji: '🥩' },
      { id: 'd3', name: 'OCI.Mde', vibe: 'Nikkei (Japanese-Peruvian). Trendy crowd. Your Instagram will thank you.', price: 60, emoji: '🍱' },
      { id: 'd4', name: 'El Cielo', vibe: 'Tasting menu experience. 2 Michelin stars. Bucket list dining.', price: 150, emoji: '⭐', premium: true },
      { id: 'd5', name: 'Hacienda', vibe: 'Traditional paisa food. Where I take my family. Huge portions, real flavors.', price: 35, emoji: '🥘' },
      { id: 'd-surprise', name: "Surprise me", vibe: "Tell me your vibe and budget — I'll pick somewhere perfect.", price: 50, emoji: '🎁' },
    ]
  },
  {
    id: 'rooftop',
    name: 'Rooftop Drinks',
    price: 30,
    emoji: '🌃',
    time: '9-11pm',
    desc: 'City views + cocktails = magic',
    vibe: "Nothing beats Medellín at golden hour from a rooftop. I'll pick the perfect spot.",
    hasOptions: true,
    subOptions: [
      { id: 'r1', name: 'Enso Rooftop', vibe: '360° views of the entire city. Chill house music. Best at sunset but gorgeous anytime.', price: 35, emoji: '🏙️', popular: true },
      { id: 'r2', name: 'The Charlee', vibe: 'Hotel pool vibes. See-and-be-seen crowd. Bottle service if you\'re feeling fancy.', price: 40, emoji: '🏊' },
      { id: 'r3', name: 'Selina Rooftop', vibe: 'Social and fun. Great for meeting people. Good energy without pretense.', price: 25, emoji: '🎒' },
      { id: 'r4', name: 'Cielo Sky Bar', vibe: 'Quieter, more intimate. Perfect if you actually want to have a conversation.', price: 25, emoji: '🌙' },
      { id: 'r-surprise', name: "You pick", vibe: "I'll match the vibe to your group.", price: 30, emoji: '🎁' },
    ]
  },
  {
    id: 'speakeasy',
    name: 'Hidden Speakeasy',
    price: 35,
    emoji: '🥃',
    time: '9-11pm',
    desc: 'Secret bars you\'d never find alone',
    vibe: "These places don't advertise. Secret entrances, craft cocktails, very cool.",
    hasOptions: true,
    subOptions: [
      { id: 's1', name: 'La Octava', vibe: 'Behind a bookshelf in a "law office". Jazz, dim lights, unreal cocktails.', price: 40, emoji: '📚', popular: true },
      { id: 's2', name: 'El Apartamento', vibe: 'Ring the doorbell of an unmarked door. Max 20 people. Feels illegal (it\'s not).', price: 35, emoji: '🚪' },
      { id: 's3', name: 'Clandestino', vibe: 'Underground — literally. Edgier crowd, great whiskey, zero tourists.', price: 35, emoji: '🕶️' },
      { id: 's-surprise', name: "Surprise me", vibe: "I'll send you the address and instructions.", price: 35, emoji: '🎁' },
    ]
  },
  {
    id: 'salsa',
    name: 'Salsa Lesson',
    price: 40,
    emoji: '💃',
    time: '8-9pm',
    desc: 'Learn the basics (even if you have two left feet)',
    vibe: "You're in Colombia — you have to at least try. I promise it's more fun than scary.",
    hasOptions: true,
    subOptions: [
      { id: 'sa1', name: 'Private Lesson', vibe: 'Just you (or your group) and an instructor. No embarrassment, go at your own pace.', price: 60, emoji: '🎯' },
      { id: 'sa2', name: 'Small Group', vibe: '4-8 people. More fun, social, includes a drink to loosen up.', price: 40, emoji: '👯', popular: true },
      { id: 'sa3', name: 'Lesson + Club', vibe: 'Learn for an hour, then practice at Son Havana with a live band.', price: 55, emoji: '🎺' },
      { id: 'sa-surprise', name: "You pick", vibe: "Based on your dance experience (or lack of it).", price: 40, emoji: '🎁' },
    ]
  },
  {
    id: 'pregame',
    name: 'Pre-Game Setup',
    price: 50,
    emoji: '🍾',
    time: '9-10pm',
    desc: 'Everything delivered to start the night right',
    vibe: "Bottles, mixers, ice — waiting at your place when you're ready.",
    hasOptions: true,
    subOptions: [
      { id: 'p1', name: 'Starter Pack', vibe: 'Aguardiente, rum, Coca-Cola, limes, ice. The Colombian essentials.', price: 40, emoji: '🧊' },
      { id: 'p2', name: 'Premium Pack', vibe: 'Grey Goose or Buchanan\'s, premium mixers, all the garnishes.', price: 80, emoji: '✨', popular: true },
      { id: 'p3', name: 'Champagne Setup', vibe: '2 bottles of Moët, strawberries, proper glasses. Celebration mode.', price: 160, emoji: '🍾', premium: true },
      { id: 'p4', name: 'Bartender Experience', vibe: 'An actual bartender comes to you for 2 hours. Cocktails made to order.', price: 150, emoji: '🍹' },
      { id: 'p-surprise', name: "You pick", vibe: "Tell me how many people and your budget.", price: 50, emoji: '🎁' },
    ]
  },
  {
    id: 'club',
    name: 'Club + Table',
    price: 100,
    emoji: '🎵',
    time: '11pm-late',
    desc: 'Skip the line, table reserved, bottle included',
    vibe: "The VIP experience without having to figure out how VIP works here.",
    hasOptions: true,
    subOptions: [
      { id: 'c1', name: 'Dulce', vibe: 'Electronic/house. International DJs. Young, fashionable, serious dancing.', price: 120, emoji: '🎧', popular: true },
      { id: 'c2', name: 'Vintrash', vibe: 'Reggaeton & Latin hits. High energy. Everyone\'s moving.', price: 100, emoji: '🔥' },
      { id: 'c3', name: 'La Whiskería', vibe: 'Hip hop & R&B. More intimate. Good if you want to actually talk too.', price: 80, emoji: '🎤' },
      { id: 'c4', name: 'Son Havana', vibe: 'Live salsa band. Mostly locals. You WILL dance whether you planned to or not.', price: 60, emoji: '🎺' },
      { id: 'c5', name: 'Kukaramakara', vibe: 'Huge venue. Crossover music. Big groups welcome.', price: 150, emoji: '👑', premium: true },
      { id: 'c-surprise', name: "You pick", vibe: "Based on your music taste and group size.", price: 100, emoji: '🎁' },
    ]
  },
  {
    id: 'latenight',
    name: 'Late Night Food',
    price: 15,
    emoji: '🌮',
    time: '2-4am',
    desc: 'Where to eat when everywhere else is closed',
    vibe: "The best food in Medellín happens at 3am. Trust me on this one.",
    hasOptions: true,
    subOptions: [
      { id: 'l1', name: 'Empanada Corner', vibe: 'THE spot. Everyone ends up here. Cash only, always worth it.', price: 10, emoji: '🥟', popular: true },
      { id: 'l2', name: 'Perros Locos', vibe: 'Colombian hot dogs loaded with EVERYTHING. You haven\'t lived until...', price: 12, emoji: '🌭' },
      { id: 'l3', name: 'Arepas 24hr', vibe: 'Stuffed arepas. Get the one with cheese and chicharrón. Thank me later.', price: 12, emoji: '🫓' },
      { id: 'l4', name: '24hr Diner', vibe: 'When you need to sit, have coffee, and eat a full meal at 3am.', price: 25, emoji: '☕' },
      { id: 'l-surprise', name: "Surprise me", vibe: "I'll text you the exact spot when you're ready.", price: 15, emoji: '🎁' },
    ]
  },
  {
    id: 'saferide',
    name: 'Safe Ride Home',
    price: 25,
    emoji: '🚗',
    time: 'End of night',
    desc: 'Trusted driver gets everyone home safe',
    vibe: "Not a random Uber. A driver I actually know. Everyone gets home.",
    hasOptions: true,
    subOptions: [
      { id: 'sr1', name: 'Single Drop-off', vibe: 'One location, up to 4 people. Driver I personally vouch for.', price: 25, emoji: '📍', popular: true },
      { id: 'sr2', name: 'Multiple Stops', vibe: 'Up to 3 different locations. Nobody left behind.', price: 40, emoji: '📍📍' },
      { id: 'sr3', name: 'SUV (6 people)', vibe: 'Bigger group, one destination.', price: 35, emoji: '🚙' },
      { id: 'sr4', name: 'On-Call Driver', vibe: 'Driver waits for you. Leave whenever you feel like it.', price: 60, emoji: '⏰', premium: true },
      { id: 'sr-surprise', name: "You pick", vibe: "Just tell me where everyone is staying.", price: 25, emoji: '🎁' },
    ]
  },
];

// Services Data with soul
const services = {
  tours: [
    {
      id: 't1',
      name: 'Comuna 13 Street Art Tour',
      price: 45,
      time: '3 hours',
      emoji: '🎨',
      color: '#FF6B6B',
      tag: 'MOST POPULAR',
      tagColor: '#FF6B6B',
      rating: 4.9,
      reviews: 847,
      spotsLeft: 4,
      shortDesc: 'The transformation story that defines modern Medellín.',
      soulDesc: "This isn't just murals and escalators. Your guide grew up here during the worst years and watched it transform. It's raw, it's real, and it's the story that makes you understand why people fall in love with this city.",
      fullDesc: "This isn't a walking tour — it's a story. Your guide grew up in Comuna 13 during the worst years and watched it transform into what it is today. You'll ride the famous outdoor escalators, see world-class street art, and hear stories you won't find in any guidebook. This is why people come to Medellín.",
      includes: [
        'Local guide FROM Comuna 13 (not just about it)',
        'Outdoor escalator ride',
        'Street art walking tour',
        'Traditional snacks & fresh juice',
        'Small group (max 10 people)',
        'Photos at the best spots',
      ],
      whatToExpect: "We meet at San Javier metro station at 9am. From there, it's about 3 hours of walking (with breaks). Moderate fitness required — there are stairs but we take it easy. We finish around noon.",
      whatToBring: ['Comfortable walking shoes', 'Sunscreen & water', 'Cash for souvenirs (optional)', 'Camera'],
      notIncluded: ['Transport to/from meeting point', 'Lunch'],
      meetingPoint: 'San Javier Metro Station (Exit 1)',
      cancellation: 'Free cancellation up to 24 hours before',
    },
    {
      id: 't2',
      name: 'Private Coffee Farm Experience',
      price: 89,
      time: '6 hours',
      emoji: '☕',
      color: '#06D6A0',
      tag: 'TOP RATED',
      tagColor: '#06D6A0',
      rating: 4.95,
      reviews: 423,
      spotsLeft: 2,
      shortDesc: 'From bean to cup at a third-generation family finca.',
      soulDesc: "You'll pick beans, learn the whole process, roast your own coffee, and have lunch with the family who's been doing this for three generations. You'll never drink instant again.",
      fullDesc: "Escape the city for a day. We drive 90 minutes into the mountains to a third-generation coffee farm. You'll pick your own beans, learn the entire process, roast coffee yourself, and sit down for a traditional campo lunch. You leave with 500g of fresh coffee and a completely different understanding of your morning cup.",
      includes: [
        'Private transport from your accommodation',
        'English-speaking farm guide',
        'Coffee picking & processing experience',
        'Roasting demonstration',
        'Farm lunch (vegetarian option available)',
        '500g fresh roasted coffee to take home',
        'All entrance fees',
      ],
      whatToExpect: "Pickup at 8am from your place. 90 min scenic drive. 3-4 hours at the farm with lunch. Back in Medellín by 3pm. It's a full morning but worth every minute.",
      whatToBring: ['Layers (mountains are cooler)', 'Closed-toe shoes', 'Camera', 'Cash for tips (optional)'],
      notIncluded: ['Alcoholic beverages', 'Additional souvenirs'],
      meetingPoint: 'Hotel pickup included',
      cancellation: 'Free cancellation up to 48 hours before',
    },
    {
      id: 't3',
      name: 'Guatapé & El Peñol Full Day',
      price: 95,
      time: '10 hours',
      emoji: '🪨',
      color: '#4CC9F0',
      tag: 'BUCKET LIST',
      tagColor: '#4CC9F0',
      rating: 4.9,
      reviews: 1205,
      spotsLeft: 6,
      shortDesc: '740 steps, one view, zero regrets.',
      soulDesc: "Yes, it's 740 steps to the top of that famous rock. Yes, it's totally worth it. The view is insane, the colorful town is adorable, and the boat ride across the reservoir is the perfect way to end the day.",
      fullDesc: "If you only do ONE day trip from Medellín, this is it. We start early to beat the crowds at El Peñol — that famous rock with 740 steps to the top. The view is insane. Then we explore Guatapé's colorful streets, have lunch, and take a boat ride on the reservoir. Long day, but you'll remember it forever.",
      includes: [
        'Comfortable transport with AC',
        'Breakfast (coffee & snacks for the drive)',
        'El Peñol entrance fee',
        'Boat ride on the reservoir',
        'Lunch in Guatapé',
        'English-speaking guide',
        'Free time to explore',
      ],
      whatToExpect: "Early pickup (7am) to beat crowds. 2-hour drive. Climb the rock, spend time in town, boat ride after lunch. Back around 5-6pm. It's a long day but paced well.",
      whatToBring: ['Comfortable shoes for climbing', 'Sunscreen & hat', 'Swimsuit (some boats allow swimming)', 'Camera', 'Cash for souvenirs'],
      notIncluded: ['Alcoholic beverages', 'Personal purchases'],
      meetingPoint: 'Hotel pickup at 7:00 AM',
      cancellation: 'Free cancellation up to 24 hours before',
    },
    {
      id: 't4',
      name: 'Hidden Food Markets Tour',
      price: 55,
      time: '4 hours',
      emoji: '🥘',
      color: '#FFD93D',
      tag: null,
      rating: 4.85,
      reviews: 312,
      shortDesc: 'Eat where locals actually eat.',
      soulDesc: "Skip the places with English menus. We're going to the markets guidebooks don't mention, the hole-in-the-wall spots where you'd never walk in alone. By the end, you'll know what to order for the rest of your trip.",
      fullDesc: "This tour is for people who actually love food, not just Instagram. We hit the markets that guidebooks don't mention, try fruits you've never seen, and eat at hole-in-the-wall spots where you'd never walk in alone. By the end, you'll know what to order and where to go for the rest of your trip.",
      includes: [
        '10+ food tastings',
        'Local market visits (2 markets)',
        'Exotic fruit sampling',
        'Empanada making demonstration',
        'Local foodie guide',
        'All food included',
      ],
      whatToExpect: "We meet downtown and eat our way through the city. Pace yourself — there's a LOT of food. We finish around lunchtime and you won't need dinner.",
      whatToBring: ['Empty stomach (seriously)', 'Comfortable shoes', 'Adventurous attitude', 'Cash for extra purchases'],
      notIncluded: ['Transport to meeting point', 'Alcoholic beverages'],
      meetingPoint: 'Parque Berrío Metro Station',
      cancellation: 'Free cancellation up to 24 hours before',
    },
    {
      id: 't5',
      name: 'Paragliding Tandem Flight',
      price: 75,
      time: '2-3 hours',
      emoji: '🪂',
      color: '#7209B7',
      tag: 'ADVENTURE',
      tagColor: '#7209B7',
      rating: 4.9,
      reviews: 567,
      shortDesc: 'Fly over Medellín. No experience needed.',
      soulDesc: "You're strapped to a certified pilot who's been doing this for 10+ years. You run, you jump, and suddenly you're floating over the city. It's 20 minutes of pure magic and you get all the photos/videos.",
      fullDesc: "No experience needed — you fly tandem with a certified pilot who has 10+ years of experience. Launch from the hills above the city, soar for 15-25 minutes (weather dependent), and get photos/videos of the whole thing. It's the most memorable way to see Medellín.",
      includes: [
        'Transport to launch site',
        'All safety equipment',
        'Certified tandem pilot',
        '15-25 minute flight',
        'Photos & video of your flight',
        'Return transport',
      ],
      whatToExpect: "Pickup, 30 min drive to launch site, safety briefing, flight, landing in a field below. Total time including transport is 2-3 hours. Flight itself is 15-25 min.",
      whatToBring: ['Closed-toe shoes (required)', 'Long pants recommended', 'Light jacket', 'Sense of adventure'],
      notIncluded: ['Food', 'Tips'],
      meetingPoint: 'Hotel pickup included',
      cancellation: 'Free cancellation up to 24 hours before (weather dependent)',
    },
  ],
  transport: [
    {
      id: 'tr1',
      name: 'Airport Pickup',
      price: 35,
      time: 'Any time',
      emoji: '✈️',
      color: '#00B4D8',
      tag: 'ESSENTIAL',
      tagColor: '#00B4D8',
      rating: 4.95,
      reviews: 2341,
      shortDesc: 'Skip the taxi chaos. Your driver is waiting.',
      soulDesc: "After a long flight, the last thing you want is to negotiate with taxi drivers. Your driver will be there with your name, help with bags, and get you to your place in a clean, AC car. I track your flight, so delays don't matter.",
      fullDesc: "After a long flight, the last thing you want is to negotiate with taxi drivers. Your driver will be waiting in arrivals with your name, help with bags, and get you to your accommodation in a clean, air-conditioned car. I track your flight so if you're delayed, they wait.",
      includes: [
        'Meet & greet in arrivals',
        'Flight tracking',
        'Luggage assistance',
        'AC vehicle',
        'Cold water bottles',
        'Up to 4 passengers',
      ],
      whatToExpect: "Exit customs, look for your name. Driver helps with bags, walk to car (2 min), 45-60 min drive to Poblado/Laureles depending on traffic.",
      notIncluded: ['More than 4 passengers (upgrade to SUV)'],
      cancellation: 'Free cancellation up to 12 hours before',
    },
    {
      id: 'tr2',
      name: 'Airport Drop-off',
      price: 30,
      time: 'Any time',
      emoji: '🛫',
      color: '#0077B6',
      tag: null,
      rating: 4.95,
      reviews: 1654,
      shortDesc: 'On-time guarantee. Never miss your flight.',
      soulDesc: "We pick you up with plenty of buffer time. Driver knows exactly how long it takes and monitors traffic. No stressing about Uber surge pricing at 5am.",
      fullDesc: "We pick you up with plenty of buffer time. Driver knows exactly how long it takes and monitors traffic. You're not stressing about Uber surge pricing at 5am or finding your way to the airport. Just pack, get in, and arrive relaxed.",
      includes: [
        'Pickup from your door',
        'Flight monitoring',
        'Luggage assistance',
        'Cold water bottles',
        'On-time guarantee',
        'Up to 4 passengers',
      ],
      whatToExpect: "Driver arrives 10 min before scheduled time. Helps with bags. Gets you there 2+ hours before domestic, 3+ hours before international.",
      notIncluded: ['More than 4 passengers (upgrade to SUV)'],
      cancellation: 'Free cancellation up to 12 hours before',
    },
    {
      id: 'tr3',
      name: 'Private Driver Full Day',
      price: 140,
      time: '8 hours',
      emoji: '🚗',
      color: '#023E8A',
      tag: 'BEST VALUE',
      tagColor: '#F8B500',
      rating: 4.9,
      reviews: 567,
      shortDesc: 'Your own driver for the day. Go wherever.',
      soulDesc: "This is how you see Medellín if time is tight. Your driver picks you up, you point where you want to go, they handle everything. No Ubers, no navigation, no parking drama.",
      fullDesc: "This is the best way to see Medellín if you have limited time or don't want to deal with logistics. Driver picks you up, you tell them where to go (or ask for recommendations), and they handle everything. Shopping, neighborhoods, restaurants — no waiting for Ubers, no navigation, no parking.",
      includes: [
        '8 hours of drive time',
        'AC vehicle (sedan or SUV)',
        'English-speaking driver',
        'Local recommendations',
        'Flexible itinerary',
        'Unlimited stops within city',
      ],
      whatToExpect: "Tell me what you want to do and I'll suggest an efficient route. Or just wing it — driver goes wherever you point.",
      notIncluded: ['Fuel for trips outside Medellín area', 'Entrance fees to attractions', 'Food'],
      cancellation: 'Free cancellation up to 24 hours before',
    },
    {
      id: 'tr4',
      name: 'Private Driver Half Day',
      price: 80,
      time: '4 hours',
      emoji: '🚙',
      color: '#0096C7',
      tag: null,
      rating: 4.85,
      reviews: 423,
      shortDesc: 'Perfect for errands or exploring one area.',
      soulDesc: "4 hours is enough to hit a few neighborhoods, do some shopping, or run errands without juggling multiple Ubers. Great for your first day to get oriented.",
      fullDesc: "4 hours is enough to hit a few neighborhoods, do some shopping, or run errands without the hassle of multiple Ubers. Great for your first day to get oriented or your last day before airport.",
      includes: [
        '4 hours of drive time',
        'AC vehicle',
        'Local recommendations',
        'Multiple stops within city',
      ],
      whatToExpect: "Let me know what you want to accomplish and I'll make sure 4 hours is enough. If you need more, upgrade to full day.",
      notIncluded: ['Fuel for trips outside city', 'Entrance fees', 'Food'],
      cancellation: 'Free cancellation up to 24 hours before',
    },
  ],
  food: [
    {
      id: 'm1',
      name: 'Luxury Welcome Package',
      price: 65,
      time: 'Pre-arrival delivery',
      emoji: '🧺',
      color: '#E63946',
      tag: 'GUEST FAVORITE',
      tagColor: '#E63946',
      rating: 4.95,
      reviews: 234,
      shortDesc: 'Arrive to a stocked apartment.',
      soulDesc: "You land tired, get to your place, and everything's waiting: fresh tropical fruit, premium coffee, a nice bottle of wine, artisan chocolates, and a guide with my actual recommendations for your neighborhood.",
      fullDesc: "You land tired, you get to your place, and everything is waiting: fresh tropical fruits (mango, passion fruit, guava), premium Colombian coffee, a nice bottle of wine, artisan chocolates, and a guide I wrote with my actual recommendations for your neighborhood. Start your trip right.",
      includes: [
        'Fresh tropical fruit basket',
        'Premium Colombian coffee (whole bean or ground)',
        'Bottle of wine (red or white, specify preference)',
        'Artisan chocolate selection',
        'Personalized neighborhood guide',
        'Delivered before your arrival',
      ],
      whatToExpect: "Give me your check-in time and address. Package will be inside your accommodation waiting for you.",
      notIncluded: ['Accommodation access (you need to arrange with your host)'],
      cancellation: 'Free cancellation up to 48 hours before',
    },
    {
      id: 'm2',
      name: 'Private Chef Experience',
      price: 120,
      time: '3-4 hours',
      emoji: '👨‍🍳',
      color: '#F4A261',
      tag: 'PREMIUM',
      tagColor: '#F4A261',
      rating: 5.0,
      reviews: 156,
      shortDesc: 'A real chef comes to your place.',
      soulDesc: "Not meal delivery — an actual professional chef shows up to YOUR kitchen and cooks a 4-course Colombian tasting menu while you watch (or don't). Wine pairing included. They clean everything after.",
      fullDesc: "This isn't meal delivery — a professional chef comes to YOUR kitchen and cooks a 4-course Colombian tasting menu while you watch (or don't). Wine pairing included. They bring everything, cook everything, and clean everything. You just show up hungry.",
      includes: [
        '4-course tasting menu',
        'Wine pairing (2 bottles)',
        'All ingredients & equipment',
        'Full kitchen cleanup',
        'Menu customization',
        'Dietary accommodations',
        'Serves 2-6 guests',
      ],
      whatToExpect: "Chef arrives 1 hour before dinner time to set up. Dinner takes about 2 hours at your pace. Cleanup takes 30-45 min. You do nothing.",
      notIncluded: ['Additional wine beyond pairing', 'Guests beyond 6 (ask for pricing)'],
      cancellation: 'Free cancellation up to 48 hours before',
    },
    {
      id: 'm3',
      name: 'Daily Breakfast Delivery',
      price: 22,
      time: 'Every morning',
      emoji: '🥐',
      color: '#E9C46A',
      tag: null,
      rating: 4.8,
      reviews: 387,
      shortDesc: 'Real Colombian breakfast at your door.',
      soulDesc: "Not hotel breakfast. Real food: fresh arepas, farm eggs your way, tropical fruit, fresh juice, and proper coffee. Delivered hot to your door every morning.",
      fullDesc: "Not hotel breakfast. Real food: fresh arepas (corn cakes), farm eggs cooked your way, tropical fruit plate, fresh-squeezed juice, and proper Colombian coffee. Delivered hot to your door each morning. Pick your delivery time and it'll be there.",
      includes: [
        'Fresh arepas',
        'Farm eggs (your style)',
        'Tropical fruit plate',
        'Fresh juice',
        'Colombian coffee',
        'Delivered to your door',
      ],
      whatToExpect: "Tell me what time you want it and any dietary restrictions. It shows up hot.",
      notIncluded: ['Specific dietary substitutions may cost extra'],
      cancellation: 'Cancel individual days anytime before 8pm the night before',
      priceNote: 'Per person, per day. Discounts for 3+ days.',
    },
    {
      id: 'm4',
      name: 'Healthy Meal Prep (5 meals)',
      price: 95,
      time: 'One-time delivery',
      emoji: '🍱',
      color: '#2A9D8F',
      tag: 'NEW',
      tagColor: '#2A9D8F',
      rating: 4.85,
      reviews: 98,
      shortDesc: 'Chef meals ready in 5 minutes.',
      soulDesc: "For people who want to eat well but don't have time. 5 complete meals, chef-prepared, balanced, ready to heat. Way better than delivery apps, healthier than restaurants every night.",
      fullDesc: "For people who want to eat well but don't have time. 5 complete meals, chef-prepared, macro-balanced, ready to heat in 5 minutes. Way better than delivery apps, healthier than restaurants every night. Great for digital nomads or longer stays.",
      includes: [
        '5 complete meals',
        'Chef-prepared fresh',
        'Eco-friendly packaging',
        'Reheating instructions',
        'Balanced macros',
        'Rotates weekly (no repeats)',
      ],
      whatToExpect: "Meals delivered in a cooler bag. Keep in fridge up to 5 days. Microwave or stovetop to reheat.",
      notIncluded: ['Delivery outside Poblado/Laureles (ask for availability)'],
      cancellation: 'Free cancellation up to 48 hours before delivery',
      dietary: 'Keto, vegan, gluten-free options available',
    },
  ],
};

// =============================================
// VALIDATION HELPERS
// =============================================
const validateEmail = (email) => {
  if (!email) return true;
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validateWhatsApp = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned.length >= 10;
};

// =============================================
// TOAST NOTIFICATION
// =============================================
const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'rgba(78,205,196,0.95)' :
                  type === 'error' ? 'rgba(255,107,107,0.95)' :
                  'rgba(248,181,0,0.95)';
  const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

  return (
    <div
      role="alert"
      style={{
        position: 'fixed',
        top: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: bgColor,
        color: type === 'warning' ? '#0D0D0D' : '#fff',
        padding: '14px 24px',
        borderRadius: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        zIndex: 1000,
        boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
        animation: 'toastSlideIn 0.3s ease',
        maxWidth: 'calc(100vw - 40px)',
      }}
    >
      <span style={{ fontSize: 18, fontWeight: 700 }}>{icon}</span>
      <span style={{ fontSize: 15, fontWeight: 500 }}>{message}</span>
    </div>
  );
};

// =============================================
// LOADING SPINNER
// =============================================
const LoadingSpinner = ({ size = 20, color = '#fff' }) => (
  <div
    style={{
      width: size,
      height: size,
      border: `2px solid ${color}33`,
      borderTop: `2px solid ${color}`,
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }}
  />
);

// =============================================
// MAIN APP COMPONENT
// =============================================
export default function MedellinApp() {
  const [view, setView] = useState('home');
  const [activeTab, setActiveTab] = useState('tours');
  const [selectedService, setSelectedService] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [booking, setBooking] = useState({ date: '', time: '09:00', guests: 2, name: '', whatsapp: '', email: '', notes: '' });
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [toast, setToast] = useState(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  // Form validation
  const [errors, setErrors] = useState({});

  // Night Builder State
  const [nightStep, setNightStep] = useState(0);
  const [nightPlan, setNightPlan] = useState({ vibe: null, area: null, activities: [] });
  const [optionsSheet, setOptionsSheet] = useState({ open: false, activity: null });

  // Concierge State
  const [conciergeMsg, setConciergeMsg] = useState('');

  // Persist cart
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('medellin-cart');
      if (savedCart) setCart(JSON.parse(savedCart));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('medellin-cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const dates = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() + i + 1);
      return {
        date: d,
        dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: d.getDate(),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
        isWeekend: d.getDay() === 0 || d.getDay() === 6,
        isTomorrow: i === 0,
      };
    });
  }, []);

  const validateBookingForm = useCallback(() => {
    const newErrors = {};
    if (!booking.name.trim()) newErrors.name = 'Please enter your name';
    if (!validateWhatsApp(booking.whatsapp)) newErrors.whatsapp = 'Please enter a valid WhatsApp number';
    if (booking.email && !validateEmail(booking.email)) newErrors.email = 'Please enter a valid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [booking]);

  const addToCart = useCallback((item, details = booking) => {
    const cartItem = {
      ...item,
      ...details,
      cartId: Date.now(),
      total: item.price * (details.guests || 1)
    };
    setCart(prev => [...prev, cartItem]);
    setSelectedService(null);
    setView('home');
    setCartOpen(true);
    setBooking({ date: '', time: '09:00', guests: 2, name: '', whatsapp: '', email: '', notes: '' });
    showToast(`${item.name} added to cart!`);
  }, [booking, showToast]);

  const removeFromCart = useCallback((cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
    showToast('Item removed', 'warning');
  }, [showToast]);

  const handleActivityClick = (activity) => {
    if (activity.hasOptions) {
      setOptionsSheet({ open: true, activity });
    } else {
      toggleActivity(activity);
    }
  };

  const toggleActivity = (activity, selectedOption = null) => {
    const existing = nightPlan.activities.find(a => a.id === activity.id);

    if (existing && !selectedOption) {
      setNightPlan({ ...nightPlan, activities: nightPlan.activities.filter(a => a.id !== activity.id) });
    } else {
      const filtered = nightPlan.activities.filter(a => a.id !== activity.id);
      const activityToAdd = {
        ...activity,
        selectedOption,
        price: selectedOption ? selectedOption.price : activity.price,
        displayName: selectedOption ? `${activity.name}: ${selectedOption.name}` : activity.name
      };
      setNightPlan({ ...nightPlan, activities: [...filtered, activityToAdd] });
    }
    setOptionsSheet({ open: false, activity: null });
  };

  const addNightToCart = () => {
    const nightTotal = nightPlan.activities.reduce((sum, a) => sum + a.price, 0) * booking.guests;
    const cartItem = {
      id: 'night-' + Date.now(),
      name: `${nightPlan.vibe.name} in ${nightPlan.area.name}`,
      emoji: '🌙',
      color: nightPlan.vibe.color,
      activities: nightPlan.activities,
      ...booking,
      cartId: Date.now(),
      total: nightTotal,
      isNight: true
    };
    setCart(prev => [...prev, cartItem]);
    setNightStep(0);
    setNightPlan({ vibe: null, area: null, activities: [] });
    setView('home');
    setCartOpen(true);
    showToast('Night plan added to cart!');
  };

  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.total, 0), [cart]);

  // =============================================
  // SUB OPTIONS SHEET
  // =============================================
  const SubOptionsSheet = () => {
    if (!optionsSheet.open || !optionsSheet.activity) return null;
    const activity = optionsSheet.activity;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'flex-end',
        }}
        onClick={() => setOptionsSheet({ open: false, activity: null })}
      >
        <div
          style={{
            background: '#161625',
            width: '100%',
            maxHeight: '85vh',
            borderRadius: '28px 28px 0 0',
            overflow: 'hidden',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{
            padding: '24px 24px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 40 }}>{activity.emoji}</span>
              <div>
                <h3 style={{ margin: 0, color: '#fff', fontSize: 22, fontWeight: 700 }}>
                  Pick Your {activity.name}
                </h3>
                <p style={{ margin: '4px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>
                  {activity.time}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOptionsSheet({ open: false, activity: null })}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >✕</button>
          </div>

          <div style={{ padding: 20, maxHeight: '60vh', overflowY: 'auto' }}>
            {activity.subOptions.map(option => (
              <button
                key={option.id}
                onClick={() => toggleActivity(activity, option)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: '#1a1a2e',
                  border: '2px solid rgba(255,255,255,0.08)',
                  borderRadius: 20,
                  padding: 20,
                  marginBottom: 14,
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                {option.popular && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#4ECDC4',
                    color: '#0D0D0D',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '6px 12px',
                    borderRadius: '0 16px 0 12px',
                  }}>POPULAR</div>
                )}
                {option.premium && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: '#F8B500',
                    color: '#0D0D0D',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '6px 12px',
                    borderRadius: '0 16px 0 12px',
                  }}>PREMIUM</div>
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ fontSize: 32, flexShrink: 0 }}>{option.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
                      {option.name}
                    </div>
                    <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                      {option.vibe}
                    </div>
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#4ECDC4', flexShrink: 0 }}>
                    ${option.price}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ padding: '16px 20px 32px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <button
              onClick={() => setOptionsSheet({ open: false, activity: null })}
              style={{
                width: '100%',
                padding: 16,
                borderRadius: 14,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Skip {activity.name}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =============================================
  // STRIPE CHECKOUT MODAL
  // =============================================
  const CheckoutModal = () => {
    if (!checkoutOpen) return null;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.9)',
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
        onClick={() => setCheckoutOpen(false)}
      >
        <div
          style={{
            background: '#161625',
            borderRadius: 24,
            width: '100%',
            maxWidth: 450,
            maxHeight: '90vh',
            overflow: 'auto',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{
            padding: 24,
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: 22, fontWeight: 700 }}>
              Complete Your Booking
            </h3>
            <button
              onClick={() => setCheckoutOpen(false)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >✕</button>
          </div>

          <div style={{ padding: 24 }}>
            {/* Order Summary */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 12, letterSpacing: 1 }}>ORDER SUMMARY</h4>
              {cart.map(item => (
                <div key={item.cartId} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)'
                }}>
                  <div>
                    <span style={{ marginRight: 8 }}>{item.emoji}</span>
                    <span style={{ color: '#fff', fontSize: 15 }}>{item.name}</span>
                  </div>
                  <span style={{ color: '#4ECDC4', fontWeight: 600 }}>${item.total}</span>
                </div>
              ))}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0 0',
                marginTop: 8,
              }}>
                <span style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Total</span>
                <span style={{ color: '#4ECDC4', fontSize: 24, fontWeight: 700 }}>${cartTotal}</span>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 12, letterSpacing: 1 }}>YOUR DETAILS</h4>
              <input
                type="text"
                placeholder="Your Name"
                value={booking.name}
                onChange={e => setBooking({ ...booking, name: e.target.value })}
                style={{
                  width: '100%',
                  padding: 16,
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 16,
                  marginBottom: 12,
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={booking.whatsapp}
                onChange={e => setBooking({ ...booking, whatsapp: e.target.value })}
                style={{
                  width: '100%',
                  padding: 16,
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 16,
                  marginBottom: 12,
                  boxSizing: 'border-box',
                }}
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={booking.email}
                onChange={e => setBooking({ ...booking, email: e.target.value })}
                style={{
                  width: '100%',
                  padding: 16,
                  borderRadius: 14,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#fff',
                  fontSize: 16,
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Pay button */}
            <button
              onClick={() => {
                if (validateBookingForm()) {
                  showToast('Redirecting to payment...');
                  setTimeout(() => {
                    setCheckoutOpen(false);
                    setCartOpen(false);
                    setCart([]);
                    showToast('Booking confirmed! Check WhatsApp for details.');
                  }, 1500);
                }
              }}
              style={{
                width: '100%',
                padding: 18,
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                color: '#fff',
                fontSize: 17,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              <span>💳</span> Pay ${cartTotal} with Stripe
            </button>

            <p style={{
              textAlign: 'center',
              color: 'rgba(255,255,255,0.4)',
              fontSize: 13,
              marginTop: 16,
              lineHeight: 1.5,
            }}>
              Secure payment by Stripe. I'll WhatsApp you within 2 hours to confirm everything.
            </p>
          </div>
        </div>
      </div>
    );
  };

  // =============================================
  // HOME VIEW
  // =============================================
  const HomeView = () => (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      minHeight: '100vh',
      background: '#0D0D0D',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>

      {/* Hero Section - More personality */}
      <header style={{
        position: 'relative',
        padding: '60px 28px 50px',
        background: 'linear-gradient(165deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
        borderBottom: '4px solid #FF6B6B',
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Local tagline */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            background: 'rgba(255,107,107,0.2)',
            border: '1px solid rgba(255,107,107,0.4)',
            borderRadius: 30,
            padding: '10px 18px',
            marginBottom: 24,
          }}>
            <span style={{ fontSize: 20 }}>🇨🇴</span>
            <span style={{ color: '#fff', fontSize: 15, fontWeight: 600 }}>Parce, let's make it happen</span>
          </div>

          {/* Main headline */}
          <h1 style={{
            margin: 0,
            fontSize: 'clamp(36px, 8vw, 48px)',
            fontWeight: 800,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Your Medellín trip,<br />
            <span style={{
              background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>actually sorted.</span>
          </h1>

          {/* Value prop with personality */}
          <p style={{
            margin: 0,
            fontSize: 18,
            color: 'rgba(255,255,255,0.85)',
            lineHeight: 1.6,
            maxWidth: 420,
          }}>
            Skip the research rabbit holes. I live here — I'll plan your tours, arrange your transport, and set up nights you'll actually remember.
          </p>

          {/* Quick stats */}
          <div style={{
            display: 'flex',
            gap: 28,
            marginTop: 32,
            flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
                <span>⭐</span> {HOST_INFO.stats.rating}
              </div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>{HOST_INFO.stats.reviews} reviews</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{HOST_INFO.stats.guests}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>happy guests</div>
            </div>
            <div style={{ width: 1, background: 'rgba(255,255,255,0.2)' }} />
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>{HOST_INFO.stats.years} years</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>in Medellín</div>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Actions - BIGGER, more inviting */}
      <section style={{ padding: '24px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Build Your Night - HERO CARD */}
        <button
          onClick={() => setView('night-builder')}
          style={{
            gridColumn: 'span 2',
            background: 'linear-gradient(135deg, #C44569 0%, #FF6B6B 50%, #F8B500 100%)',
            borderRadius: 24,
            padding: 32,
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            border: 'none',
            textAlign: 'left',
            minHeight: 180,
          }}
        >
          <div style={{ position: 'absolute', right: -30, bottom: -30, fontSize: 140, opacity: 0.25 }}>🌙</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: 20,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 700,
              color: '#fff',
              marginBottom: 12,
              letterSpacing: 0.5,
            }}>
              ✨ MOST POPULAR
            </div>
            <div style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 12 }}>Build Your Night</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, maxWidth: 320 }}>
              Dinner → Drinks → Dancing. Pick your vibe, pick your spots — I'll handle all the reservations and logistics.
            </div>
          </div>
        </button>

        {/* Concierge - BIGGER */}
        <button
          onClick={() => setView('concierge')}
          style={{
            gridColumn: 'span 2',
            background: '#161625',
            border: '2px solid #4ECDC4',
            borderRadius: 24,
            padding: 28,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            textAlign: 'left',
            minHeight: 120,
          }}
        >
          <div style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            background: 'rgba(78,205,196,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            flexShrink: 0,
          }}>💬</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 6 }}>Need something specific?</div>
            <div style={{ fontSize: 15, color: '#4ECDC4', lineHeight: 1.4 }}>Custom requests, special occasions, weird ideas — tell me and I'll make it happen.</div>
          </div>
        </button>
      </section>

      {/* Meet Your Host - Compact but warm */}
      <section style={{ padding: '8px 20px 24px' }}>
        <div style={{
          background: '#161625',
          borderRadius: 24,
          padding: 24,
          display: 'flex',
          gap: 20,
          alignItems: 'flex-start',
          border: '1px solid rgba(255,255,255,0.08)',
        }}>
          <img
            src={HOST_INFO.photo}
            alt={HOST_INFO.name}
            style={{
              width: 70,
              height: 70,
              borderRadius: 35,
              objectFit: 'cover',
              flexShrink: 0,
              border: '3px solid #4ECDC4',
            }}
          />
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6, marginTop: 0 }}>
              Hey, I'm {HOST_INFO.name} 👋
            </h2>
            <p style={{ margin: 0, fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              {HOST_INFO.quickBio}
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <nav style={{
        padding: '8px 20px 20px',
        display: 'flex',
        gap: 10,
        position: 'sticky',
        top: 0,
        background: '#0D0D0D',
        zIndex: 20,
      }}>
        {[
          { id: 'tours', label: 'Tours', emoji: '🎯' },
          { id: 'transport', label: 'Transport', emoji: '🚗' },
          { id: 'food', label: 'Food & Drink', emoji: '🍽️' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '16px 12px',
              borderRadius: 16,
              border: activeTab === tab.id ? '2px solid #FF6B6B' : '2px solid transparent',
              background: activeTab === tab.id ? 'rgba(255,107,107,0.15)' : 'rgba(255,255,255,0.05)',
              color: activeTab === tab.id ? '#FF6B6B' : 'rgba(255,255,255,0.6)',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              transition: 'all 0.2s ease',
            }}
          >
            <span>{tab.emoji}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Services Grid - BIGGER CARDS with soul */}
      <section style={{ padding: '0 20px 24px', display: 'grid', gap: 20 }}>
        {services[activeTab].map(service => (
          <article
            key={service.id}
            onClick={() => { setSelectedService(service); setView('detail'); }}
            style={{
              background: '#161625',
              borderRadius: 24,
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.08)',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Card header with emoji */}
            <div style={{
              height: 140,
              background: `linear-gradient(135deg, ${service.color}dd, ${service.color}66)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <span style={{ fontSize: 72 }}>{service.emoji}</span>
              {service.tag && (
                <div style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  background: 'rgba(0,0,0,0.5)',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '6px 12px',
                  borderRadius: 20,
                  letterSpacing: 0.5,
                }}>
                  {service.tag}
                </div>
              )}
              {service.spotsLeft && service.spotsLeft <= 5 && (
                <div style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'rgba(255,107,107,0.9)',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '6px 12px',
                  borderRadius: 20,
                }}>
                  {service.spotsLeft} spots left
                </div>
              )}
            </div>

            {/* Card content - BIGGER */}
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                <h3 style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#fff',
                  lineHeight: 1.3,
                  flex: 1,
                  paddingRight: 16,
                }}>
                  {service.name}
                </h3>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#4ECDC4' }}>${service.price}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>per person</div>
                </div>
              </div>

              {/* Soul description */}
              <p style={{
                margin: '0 0 16px',
                fontSize: 15,
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.6,
              }}>
                {service.soulDesc || service.shortDesc}
              </p>

              {/* Meta info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                color: 'rgba(255,255,255,0.5)',
                fontSize: 13,
              }}>
                <span>⏱️ {service.time}</span>
                <span>⭐ {service.rating}</span>
                <span>💬 {service.reviews} reviews</span>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* Testimonials - with more personality */}
      <section style={{ padding: '32px 20px', background: '#161625' }}>
        <h2 style={{
          fontSize: 24,
          fontWeight: 800,
          color: '#fff',
          marginBottom: 8,
          marginTop: 0,
        }}>
          Real people, real trips 💬
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 15,
          marginBottom: 24,
          marginTop: 0,
        }}>
          Here's what guests are saying about their Medellín experience
        </p>

        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 8 }}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                minWidth: 300,
                background: '#1a1a2e',
                borderRadius: 20,
                padding: 24,
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 24,
                }}>
                  {t.emoji}
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{t.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{t.location}</div>
                </div>
              </div>
              <p style={{
                margin: 0,
                color: 'rgba(255,255,255,0.85)',
                fontSize: 15,
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}>
                "{t.text}"
              </p>
              <div style={{
                marginTop: 16,
                fontSize: 13,
                color: '#4ECDC4',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}>
                <span>{'⭐'.repeat(t.rating)}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)' }}>· {t.trip}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ - Warmer, more conversational */}
      <section style={{ padding: '32px 20px 100px' }}>
        <h2 style={{
          fontSize: 24,
          fontWeight: 800,
          color: '#fff',
          marginBottom: 8,
          marginTop: 0,
        }}>
          Questions? I got you 🤙
        </h2>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 15,
          marginBottom: 24,
          marginTop: 0,
        }}>
          Or just message me directly — I'm pretty responsive
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                background: '#161625',
                borderRadius: 20,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <button
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                style={{
                  width: '100%',
                  padding: 20,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: 24 }}>{faq.emoji}</span>
                <span style={{
                  flex: 1,
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}>
                  {faq.q}
                </span>
                <span style={{
                  color: '#4ECDC4',
                  fontSize: 20,
                  transition: 'transform 0.2s',
                  transform: expandedFaq === i ? 'rotate(180deg)' : 'rotate(0)',
                }}>
                  ▼
                </span>
              </button>
              {expandedFaq === i && (
                <div style={{
                  padding: '0 20px 20px 58px',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 15,
                  lineHeight: 1.7,
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Sticky Cart Bar */}
      {cart.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50,
          boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
        }}>
          <div>
            <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>${cartTotal}</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>{cart.length} item{cart.length > 1 ? 's' : ''}</div>
          </div>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              padding: '14px 28px',
              borderRadius: 14,
              border: 'none',
              background: '#fff',
              color: '#0D0D0D',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            View Cart →
          </button>
        </div>
      )}
    </div>
  );

  // =============================================
  // DETAIL VIEW
  // =============================================
  const DetailView = () => {
    if (!selectedService) return null;
    const service = selectedService;

    return (
      <div style={{
        maxWidth: 800,
        margin: '0 auto',
        minHeight: '100vh',
        background: '#0D0D0D',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: '#0D0D0D',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          zIndex: 30,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          <button
            onClick={() => { setSelectedService(null); setView('home'); }}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              fontSize: 20,
              cursor: 'pointer',
            }}
          >←</button>
          <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>{service.name}</span>
        </div>

        {/* Hero Image */}
        <div style={{
          height: 220,
          background: `linear-gradient(135deg, ${service.color}dd, ${service.color}66)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{ fontSize: 100 }}>{service.emoji}</span>
        </div>

        {/* Content */}
        <div style={{ padding: 24 }}>
          {/* Title & Price */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>
              {service.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#4ECDC4' }}>${service.price}</span>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>per person</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#F8B500', fontSize: 16 }}>⭐ {service.rating}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>({service.reviews})</span>
              </div>
            </div>
          </div>

          {/* Full Description */}
          <div style={{ marginBottom: 32 }}>
            <p style={{
              margin: 0,
              fontSize: 17,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.7,
            }}>
              {service.fullDesc}
            </p>
          </div>

          {/* What's Included */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 16, marginTop: 0 }}>
              What's included
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {service.includes?.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span style={{ color: '#4ECDC4', fontSize: 18 }}>✓</span>
                  <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div style={{
            background: '#161625',
            borderRadius: 24,
            padding: 24,
            marginBottom: 100,
          }}>
            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 20, marginTop: 0 }}>
              Book this experience
            </h3>

            {/* Date Selection */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, display: 'block', marginBottom: 10 }}>
                Pick a date
              </label>
              <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8 }}>
                {dates.slice(0, 7).map((d, i) => (
                  <button
                    key={i}
                    onClick={() => setBooking({ ...booking, date: d.date.toISOString() })}
                    style={{
                      minWidth: 70,
                      padding: '14px 12px',
                      borderRadius: 14,
                      border: booking.date === d.date.toISOString() ? '2px solid #4ECDC4' : '2px solid rgba(255,255,255,0.1)',
                      background: booking.date === d.date.toISOString() ? 'rgba(78,205,196,0.15)' : 'transparent',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, marginBottom: 4 }}>
                      {d.isTomorrow ? 'Tomorrow' : d.dayName}
                    </div>
                    <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{d.dayNum}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{d.month}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Guests */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, display: 'block', marginBottom: 10 }}>
                How many guests?
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <button
                  onClick={() => setBooking({ ...booking, guests: Math.max(1, booking.guests - 1) })}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: '#fff',
                    fontSize: 24,
                    cursor: 'pointer',
                  }}
                >−</button>
                <span style={{ color: '#fff', fontSize: 24, fontWeight: 700, minWidth: 40, textAlign: 'center' }}>
                  {booking.guests}
                </span>
                <button
                  onClick={() => setBooking({ ...booking, guests: Math.min(20, booking.guests + 1) })}
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 24,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: '#fff',
                    fontSize: 24,
                    cursor: 'pointer',
                  }}
                >+</button>
              </div>
            </div>

            {/* Total */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              marginBottom: 20,
            }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15 }}>
                ${service.price} × {booking.guests} guest{booking.guests > 1 ? 's' : ''}
              </span>
              <span style={{ color: '#4ECDC4', fontSize: 24, fontWeight: 700 }}>
                ${service.price * booking.guests}
              </span>
            </div>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(service)}
              disabled={!booking.date}
              style={{
                width: '100%',
                padding: 18,
                borderRadius: 16,
                border: 'none',
                background: booking.date ? 'linear-gradient(135deg, #4ECDC4, #44A08D)' : 'rgba(255,255,255,0.1)',
                color: booking.date ? '#fff' : 'rgba(255,255,255,0.3)',
                fontSize: 17,
                fontWeight: 700,
                cursor: booking.date ? 'pointer' : 'not-allowed',
              }}
            >
              {booking.date ? 'Add to Cart' : 'Select a date'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =============================================
  // NIGHT BUILDER VIEW
  // =============================================
  const NightBuilderView = () => (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      minHeight: '100vh',
      background: '#0D0D0D',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#0D0D0D',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        zIndex: 30,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <button
          onClick={() => { setView('home'); setNightStep(0); setNightPlan({ vibe: null, area: null, activities: [] }); }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            fontSize: 20,
            cursor: 'pointer',
          }}
        >←</button>
        <div>
          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Build Your Night</div>
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>Step {nightStep + 1} of 3</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{ padding: '0 20px', marginBottom: 24 }}>
        <div style={{
          height: 6,
          background: 'rgba(255,255,255,0.1)',
          borderRadius: 3,
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${((nightStep + 1) / 3) * 100}%`,
            background: 'linear-gradient(135deg, #C44569, #FF6B6B)',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>

      {/* Step Content */}
      <div style={{ padding: '0 20px' }}>
        {/* Step 1: Vibe */}
        {nightStep === 0 && (
          <>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 12, marginTop: 0 }}>
              What's the vibe? 🎭
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, marginTop: 0, lineHeight: 1.5 }}>
              Set the tone for your night — I'll pick spots that match your energy.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {nightVibes.map(vibe => (
                <button
                  key={vibe.id}
                  onClick={() => { setNightPlan({ ...nightPlan, vibe }); setNightStep(1); }}
                  style={{
                    width: '100%',
                    padding: 24,
                    borderRadius: 20,
                    border: '2px solid rgba(255,255,255,0.1)',
                    background: '#161625',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 18,
                  }}
                >
                  <div style={{
                    fontSize: 40,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    background: `${vibe.color}22`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {vibe.emoji}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{vibe.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.5 }}>{vibe.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2: Area */}
        {nightStep === 1 && (
          <>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 12, marginTop: 0 }}>
              Where to? 📍
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, marginTop: 0, lineHeight: 1.5 }}>
              Each neighborhood has its own personality. Pick your base for the night.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {nightAreas.map(area => (
                <button
                  key={area.id}
                  onClick={() => { setNightPlan({ ...nightPlan, area }); setNightStep(2); }}
                  style={{
                    width: '100%',
                    padding: 24,
                    borderRadius: 20,
                    border: '2px solid rgba(255,255,255,0.1)',
                    background: '#161625',
                    cursor: 'pointer',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 18,
                  }}
                >
                  <div style={{
                    fontSize: 36,
                    width: 60,
                    height: 60,
                    borderRadius: 30,
                    background: 'rgba(78,205,196,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {area.emoji}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontSize: 20, fontWeight: 700, marginBottom: 6 }}>{area.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.5 }}>{area.desc}</div>
                  </div>
                </button>
              ))}
            </div>
            <button
              onClick={() => setNightStep(0)}
              style={{
                marginTop: 24,
                padding: '12px 20px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              ← Back to vibe
            </button>
          </>
        )}

        {/* Step 3: Activities */}
        {nightStep === 2 && (
          <>
            <h2 style={{ color: '#fff', fontSize: 28, fontWeight: 800, marginBottom: 12, marginTop: 0 }}>
              Build your night 🌙
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 16, marginBottom: 28, marginTop: 0, lineHeight: 1.5 }}>
              Mix and match what sounds good. I'll make all the reservations and logistics work.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 120 }}>
              {nightActivities.map(activity => {
                const selected = nightPlan.activities.find(a => a.id === activity.id);
                return (
                  <button
                    key={activity.id}
                    onClick={() => handleActivityClick(activity)}
                    style={{
                      width: '100%',
                      padding: 20,
                      borderRadius: 20,
                      border: selected ? '2px solid #4ECDC4' : '2px solid rgba(255,255,255,0.1)',
                      background: selected ? 'rgba(78,205,196,0.1)' : '#161625',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{ fontSize: 32, flexShrink: 0 }}>{activity.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: 6,
                        }}>
                          <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{activity.name}</div>
                          <div style={{ color: '#4ECDC4', fontSize: 18, fontWeight: 700 }}>
                            ${selected?.selectedOption?.price || activity.price}
                          </div>
                        </div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, marginBottom: 6 }}>{activity.time}</div>
                        <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.5 }}>
                          {activity.vibe || activity.desc}
                        </div>
                        {selected?.selectedOption && (
                          <div style={{
                            marginTop: 10,
                            padding: '8px 12px',
                            background: 'rgba(78,205,196,0.15)',
                            borderRadius: 10,
                            color: '#4ECDC4',
                            fontSize: 14,
                          }}>
                            ✓ {selected.selectedOption.name}
                          </div>
                        )}
                      </div>
                      {selected && (
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: 14,
                          background: '#4ECDC4',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0D0D0D',
                          fontSize: 16,
                          fontWeight: 700,
                          flexShrink: 0,
                        }}>✓</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setNightStep(1)}
              style={{
                padding: '12px 20px',
                borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: 'rgba(255,255,255,0.6)',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              ← Back to area
            </button>
          </>
        )}
      </div>

      {/* Sticky Bottom Bar */}
      {nightStep === 2 && nightPlan.activities.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#161625',
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 50,
        }}>
          <div>
            <div style={{ color: '#fff', fontSize: 20, fontWeight: 700 }}>
              ${nightPlan.activities.reduce((sum, a) => sum + a.price, 0)}
            </div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
              {nightPlan.activities.length} item{nightPlan.activities.length > 1 ? 's' : ''} selected
            </div>
          </div>
          <button
            onClick={addNightToCart}
            style={{
              padding: '14px 28px',
              borderRadius: 14,
              border: 'none',
              background: 'linear-gradient(135deg, #C44569, #FF6B6B)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Add Night to Cart →
          </button>
        </div>
      )}
    </div>
  );

  // =============================================
  // CONCIERGE VIEW
  // =============================================
  const ConciergeView = () => (
    <div style={{
      maxWidth: 800,
      margin: '0 auto',
      minHeight: '100vh',
      background: '#0D0D0D',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#0D0D0D',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        zIndex: 30,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <button
          onClick={() => setView('home')}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            color: '#fff',
            fontSize: 20,
            cursor: 'pointer',
          }}
        >←</button>
        <div style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>Concierge</div>
      </div>

      <div style={{ padding: 24 }}>
        {/* Hero Card */}
        <div style={{
          background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
          borderRadius: 24,
          padding: 28,
          marginBottom: 32,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -20, bottom: -20, fontSize: 100, opacity: 0.2 }}>💬</div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, color: '#fff' }}>
              I'll make it happen ✨
            </h2>
            <p style={{ margin: 0, fontSize: 16, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, maxWidth: 340 }}>
              Custom requests, special occasions, weird ideas — tell me what you need and I'll figure it out.
            </p>
          </div>
        </div>

        {/* Quick Request Chips */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: 1, marginBottom: 16, marginTop: 0 }}>
            QUICK REQUESTS
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {conciergeChips.map((chip, i) => (
              <button
                key={i}
                onClick={() => setConciergeMsg(chip.label)}
                style={{
                  padding: '12px 18px',
                  borderRadius: 30,
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: conciergeMsg === chip.label ? 'rgba(78,205,196,0.2)' : 'rgba(255,255,255,0.05)',
                  color: conciergeMsg === chip.label ? '#4ECDC4' : 'rgba(255,255,255,0.8)',
                  fontSize: 14,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>{chip.emoji}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, letterSpacing: 1, marginBottom: 12, marginTop: 0 }}>
            TELL ME MORE
          </h3>
          <textarea
            value={conciergeMsg}
            onChange={e => setConciergeMsg(e.target.value)}
            placeholder="Describe what you're looking for... The more details, the better I can help!"
            rows={5}
            style={{
              width: '100%',
              padding: 18,
              borderRadius: 18,
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'rgba(255,255,255,0.05)',
              color: '#fff',
              fontSize: 16,
              resize: 'none',
              boxSizing: 'border-box',
              lineHeight: 1.5,
            }}
          />
        </div>

        {/* Send Button */}
        <button
          onClick={() => {
            if (conciergeMsg.trim()) {
              const whatsappUrl = `https://wa.me/${HOST_INFO.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hey ${HOST_INFO.name}! I'm looking for help with: ${conciergeMsg}`)}`;
              window.open(whatsappUrl, '_blank');
            }
          }}
          disabled={!conciergeMsg.trim()}
          style={{
            width: '100%',
            padding: 18,
            borderRadius: 16,
            border: 'none',
            background: conciergeMsg.trim() ? 'linear-gradient(135deg, #4ECDC4, #44A08D)' : 'rgba(255,255,255,0.1)',
            color: conciergeMsg.trim() ? '#fff' : 'rgba(255,255,255,0.3)',
            fontSize: 17,
            fontWeight: 700,
            cursor: conciergeMsg.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          <span>💬</span> Send to {HOST_INFO.name} on WhatsApp
        </button>

        <p style={{
          textAlign: 'center',
          color: 'rgba(255,255,255,0.4)',
          fontSize: 14,
          marginTop: 16,
          lineHeight: 1.5,
        }}>
          Usually responds within {HOST_INFO.responseTime}
        </p>
      </div>
    </div>
  );

  // =============================================
  // CART SHEET
  // =============================================
  const CartSheet = () => {
    if (!cartOpen) return null;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'flex-end',
        }}
        onClick={() => setCartOpen(false)}
      >
        <div
          style={{
            background: '#161625',
            width: '100%',
            maxHeight: '85vh',
            borderRadius: '28px 28px 0 0',
            overflow: 'hidden',
          }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{
            padding: '24px 24px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <h3 style={{ margin: 0, color: '#fff', fontSize: 22, fontWeight: 700 }}>
              Your Cart ({cart.length})
            </h3>
            <button
              onClick={() => setCartOpen(false)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                color: '#fff',
                fontSize: 18,
                cursor: 'pointer',
              }}
            >✕</button>
          </div>

          <div style={{ padding: 20, maxHeight: '50vh', overflowY: 'auto' }}>
            {cart.map(item => (
              <div
                key={item.cartId}
                style={{
                  background: '#1a1a2e',
                  borderRadius: 18,
                  padding: 20,
                  marginBottom: 14,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    background: `linear-gradient(135deg, ${item.color || '#4ECDC4'}dd, ${item.color || '#4ECDC4'}66)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 28,
                    flexShrink: 0,
                  }}>
                    {item.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: 17, fontWeight: 600, marginBottom: 4 }}>{item.name}</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                      {item.guests} guest{item.guests > 1 ? 's' : ''}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: '#4ECDC4', fontSize: 18, fontWeight: 700 }}>${item.total}</div>
                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      style={{
                        marginTop: 8,
                        padding: '6px 12px',
                        borderRadius: 8,
                        border: '1px solid rgba(255,107,107,0.3)',
                        background: 'transparent',
                        color: '#FF6B6B',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{
            padding: '20px 24px 32px',
            borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}>
              <span style={{ color: '#fff', fontSize: 18, fontWeight: 600 }}>Total</span>
              <span style={{ color: '#4ECDC4', fontSize: 28, fontWeight: 700 }}>${cartTotal}</span>
            </div>
            <button
              onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
              style={{
                width: '100%',
                padding: 18,
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #4ECDC4, #44A08D)',
                color: '#fff',
                fontSize: 17,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              💳 Checkout with Stripe
            </button>
          </div>
        </div>
      </div>
    );
  };

  // =============================================
  // RENDER
  // =============================================
  return (
    <>
      <style>{`
        @keyframes toastSlideIn {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; background: #0D0D0D; }
        ::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {view === 'home' && <HomeView />}
      {view === 'detail' && <DetailView />}
      {view === 'night-builder' && <NightBuilderView />}
      {view === 'concierge' && <ConciergeView />}

      <CartSheet />
      <CheckoutModal />
      <SubOptionsSheet />
    </>
  );
}
