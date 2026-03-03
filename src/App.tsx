import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { 
  Home, 
  Search, 
  ShoppingBag, 
  User, 
  Bell, 
  MapPin, 
  Star, 
  Calendar, 
  Heart, 
  Utensils, 
  MessageSquare,
  Share2,
  ChevronRight,
  Filter,
  Wifi,
  Battery,
  Signal,
  X,
  Zap,
  Bike,
  Waves,
  Dumbbell,
  ChevronLeft,
  Search as SearchIcon,
  Plus,
  Minus,
  Navigation,
  Layers,
  RefreshCw,
  CreditCard,
  Settings as SettingsIcon,
  Clock,
  Package,
  Coffee,
  LogOut,
  Shield,
  BellRing
} from 'lucide-react';
import { Business, Post } from './types';

// --- Components ---

const StatusBar = () => (
  <div className="px-6 py-2 flex justify-between items-center text-[10px] font-bold text-brand-dark/40 z-50">
    <span>9:41</span>
    <div className="flex items-center gap-1.5">
      <Signal size={10} />
      <Wifi size={10} />
      <Battery size={12} className="rotate-90" />
    </div>
  </div>
);

const HomeIndicator = () => (
  <div className="fixed bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full z-[60] max-w-md" />
);

const BottomNav = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-6 pt-3 pb-6 flex justify-between items-center z-50 max-w-md mx-auto">
    <button onClick={() => setActiveTab('home')} className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}>
      <Home size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Home</span>
    </button>
    <button onClick={() => setActiveTab('explore')} className={`nav-item ${activeTab === 'explore' ? 'active' : ''}`}>
      <Search size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Explore</span>
    </button>
    <button onClick={() => setActiveTab('shop')} className={`nav-item ${activeTab === 'shop' ? 'active' : ''}`}>
      <ShoppingBag size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Shop</span>
    </button>
    <button onClick={() => setActiveTab('social')} className={`nav-item ${activeTab === 'social' ? 'active' : ''}`}>
      <MessageSquare size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Feed</span>
    </button>
    <button onClick={() => setActiveTab('profile')} className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}>
      <User size={24} />
      <span className="text-[10px] font-medium uppercase tracking-wider">Profile</span>
    </button>
  </nav>
);

const Header = ({ onOpenAI }: { onOpenAI: () => void }) => (
  <header className="px-6 pt-4 pb-4 flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-display font-bold text-brand-dark tracking-tight">Strength Forged</h1>
      <p className="text-[10px] text-brand-bronze font-bold tracking-[0.2em] uppercase">Forged by effort</p>
    </div>
    <div className="flex gap-3">
      <button onClick={onOpenAI} className="p-2.5 glass-card rounded-full text-brand-teal hover:bg-brand-teal hover:text-white transition-all">
        <MessageSquare size={18} />
      </button>
      <button className="p-2.5 glass-card rounded-full text-brand-dark hover:bg-brand-dark hover:text-white transition-all">
        <Bell size={18} />
      </button>
    </div>
  </header>
);

const HomeScreen = ({ onExplore, onSelectBusiness, onSeeMoreCoaches, businesses }: { onExplore: () => void, onSelectBusiness: (b: Business) => void, onSeeMoreCoaches: () => void, businesses: Business[], key?: string }) => {
  const [showAllActions, setShowAllActions] = useState(false);

  const allCategories = [
    { icon: <Calendar size={20} />, label: 'Gyms', color: 'bg-orange-50 text-orange-500', id: 'gyms' },
    { icon: <Heart size={20} />, label: 'Yoga', color: 'bg-pink-50 text-pink-500', id: 'yoga' },
    { icon: <User size={20} />, label: 'Coaches', color: 'bg-blue-50 text-blue-500', id: 'coaches' },
    { icon: <Utensils size={20} />, label: 'Meals', color: 'bg-green-50 text-green-500', id: 'meals' },
    { icon: <ShoppingBag size={20} />, label: 'Shop', color: 'bg-purple-50 text-purple-500', id: 'shop' },
    { icon: <Zap size={20} />, label: 'Crossfit', color: 'bg-yellow-50 text-yellow-500', id: 'crossfit' },
    { icon: <Waves size={20} />, label: 'Swimming', color: 'bg-cyan-50 text-cyan-500', id: 'swimming' },
    { icon: <Bike size={20} />, label: 'Cycling', color: 'bg-indigo-50 text-indigo-500', id: 'cycling' },
    { icon: <Dumbbell size={20} />, label: 'Weights', color: 'bg-slate-50 text-slate-500', id: 'weights' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex-1 overflow-y-auto pb-24 space-y-8 no-scrollbar"
    >
      {/* Welcome & Daily Goal */}
      <section className="px-6 pt-2">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-brand-dark">Hello, Alex! 👋</h2>
            <p className="text-xs text-gray-400">Let's crush your goals today.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-brand-bronze/10 flex items-center justify-center text-brand-bronze">
            <Star size={24} fill="currentColor" />
          </div>
        </div>
        
        <div className="bg-brand-dark rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-bronze/20 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-bronze mb-1">Daily Goal</p>
                <h3 className="text-lg font-bold">10,000 Steps</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">7,420</p>
                <p className="text-[10px] text-gray-400 uppercase">Steps so far</p>
              </div>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '74%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-brand-bronze"
              />
            </div>
            <p className="text-[10px] mt-3 text-gray-400">Keep going! You're almost there.</p>
          </div>
        </div>
      </section>

      {/* Categories - Vibrant Style */}
      <section className="px-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-brand-dark">Quick Actions</h3>
          <button 
            onClick={() => setShowAllActions(true)}
            className="text-[10px] text-brand-bronze font-bold uppercase tracking-wider hover:text-brand-dark transition-colors"
          >
            View All
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
          {allCategories.slice(0, 5).map((cat, i) => (
            <button key={i} className="flex flex-col items-center gap-3 min-w-[70px]">
              <div className={`w-16 h-16 rounded-2xl ${cat.color} flex items-center justify-center shadow-sm hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Bottom Sheet for All Actions */}
      <AnimatePresence>
        {showAllActions && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAllActions(false)}
              className="fixed inset-0 bg-brand-dark/60 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[3rem] z-[70] max-h-[85vh] overflow-hidden flex flex-col shadow-2xl max-w-md mx-auto"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2" />
              
              <div className="px-8 py-6 flex justify-between items-center border-b border-gray-50">
                <div>
                  <h3 className="text-2xl font-bold text-brand-dark">Quick Actions</h3>
                  <p className="text-xs text-gray-400">Explore all services and categories</p>
                </div>
                <button 
                  onClick={() => setShowAllActions(false)}
                  className="p-3 bg-gray-100 rounded-full text-gray-500 hover:bg-brand-dark hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
                <div className="grid grid-cols-3 gap-8">
                  {allCategories.map((cat, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        // Handle category selection
                        setShowAllActions(false);
                      }}
                      className="flex flex-col items-center gap-3 group"
                    >
                      <div className={`w-20 h-20 rounded-3xl ${cat.color} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform group-active:scale-95`}>
                        {React.cloneElement(cat.icon as React.ReactElement, { size: 28 })}
                      </div>
                      <span className="text-[11px] font-bold text-brand-dark uppercase tracking-wider group-hover:text-brand-bronze transition-colors">
                        {cat.label}
                      </span>
                    </motion.button>
                  ))}
                </div>
                
                <div className="mt-12 p-6 bg-brand-dark rounded-[2rem] text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-brand-bronze/20 rounded-full -mr-12 -mt-12 blur-xl" />
                  <h4 className="text-lg font-bold mb-1">Premium Membership</h4>
                  <p className="text-[10px] text-gray-400 mb-4">Unlock all categories and get exclusive discounts.</p>
                  <button className="px-6 py-2 bg-brand-bronze rounded-full text-[10px] font-bold uppercase tracking-widest">Upgrade Now</button>
                </div>
              </div>
              
              <div className="p-8 pt-4 bg-white border-t border-gray-50">
                <button 
                  onClick={() => setShowAllActions(false)}
                  className="w-full py-5 bg-brand-dark text-white rounded-[2rem] font-bold text-sm uppercase tracking-[0.2em] shadow-lg active:scale-[0.98] transition-transform"
                >
                  Close Menu
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Featured Coaches - Horizontal Scroll */}
      <section>
        <div className="px-6 flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-brand-dark">Featured Coaches</h3>
          <button 
            onClick={onSeeMoreCoaches}
            className="text-[10px] text-brand-bronze font-bold uppercase tracking-wider hover:text-brand-dark transition-colors"
          >
            See More
          </button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-6 pb-4 no-scrollbar">
          {businesses.filter(b => b.category === 'Personal Trainer' && Number(b.is_online) === 0).length > 0 ? (
            businesses.filter(b => b.category === 'Personal Trainer' && Number(b.is_online) === 0).map((biz) => (
              <div 
                key={biz.id} 
                onClick={() => onSelectBusiness(biz)}
                className="min-w-[200px] glass-card overflow-hidden group cursor-pointer hover:shadow-lg transition-all"
              >
                <div className="relative h-32">
                  <img src={biz.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={biz.name} referrerPolicy="no-referrer" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
                    <Star size={10} fill="#D4AF37" className="text-brand-accent" />
                    <span className="text-[10px] font-bold text-brand-dark">{biz.rating}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 bg-brand-bronze text-[8px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider">Featured</div>
                </div>
                <div className="p-3">
                  <h4 className="font-bold text-sm text-brand-dark truncate">{biz.name}</h4>
                  <p className="text-[10px] text-gray-400 mb-2">{biz.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-brand-teal uppercase">{biz.category}</span>
                    <span className="text-[10px] font-bold text-brand-bronze">{biz.price_range}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-gray-400 text-xs italic">
              No featured coaches available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* Nearby Sessions */}
      <section className="px-6">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-lg font-bold text-brand-dark">Nearby Sessions</h3>
          <button onClick={onExplore} className="text-[10px] text-brand-bronze font-bold uppercase tracking-wider">Explore Map</button>
        </div>
        <div className="space-y-4">
          {businesses.filter(b => Number(b.is_online) === 0).map((biz, i) => (
            <motion.div 
              key={biz.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => onSelectBusiness(biz)}
              className="glass-card p-3 flex gap-4 items-center group cursor-pointer hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-brand-bronze"
            >
              <div className="relative">
                <img 
                  src={biz.image} 
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm" 
                  alt={biz.name}
                  referrerPolicy="no-referrer"
                />
                {biz.rating > 4.8 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full flex items-center justify-center border-2 border-white">
                    <Star size={8} fill="white" className="text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-brand-dark">{biz.name}</h4>
                  <span className="text-[10px] font-bold text-brand-bronze">{biz.price_range}</span>
                </div>
                <p className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                  <MapPin size={10} /> {biz.location}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded-full font-bold uppercase tracking-wider">{biz.category}</span>
                  <div className="flex items-center gap-0.5 text-brand-accent">
                    <Star size={10} fill="currentColor" />
                    <span className="text-[10px] font-bold">{biz.rating}</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-bronze group-hover:translate-x-1 transition-all" />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

const SocialFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/feed').then(res => res.json()).then(setPosts);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex-1 overflow-y-auto pb-24 px-6 space-y-6"
    >
      <div className="flex justify-between items-center py-4">
        <h2 className="text-xl font-bold text-brand-dark">Community Feed</h2>
        <button className="p-2 glass-card rounded-full text-brand-dark"><Filter size={18} /></button>
      </div>
      
      {posts.map(post => (
        <div key={post.id} className="glass-card overflow-hidden border border-gray-100 shadow-sm">
          <div className="p-4 flex items-center gap-3">
            <img src={post.business_logo} className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="Logo" referrerPolicy="no-referrer" />
            <div>
              <h4 className="font-bold text-sm text-brand-dark">{post.business_name}</h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">Sponsored</p>
            </div>
          </div>
          <img src={post.image} className="w-full aspect-square object-cover" alt="Post" referrerPolicy="no-referrer" />
          <div className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                  <span className="text-xs font-bold">{post.likes}</span>
                </button>
                <button className="text-gray-400 hover:text-brand-teal"><MessageSquare size={20} /></button>
                <button className="text-gray-400 hover:text-brand-bronze"><Share2 size={20} /></button>
              </div>
              <button className="text-xs font-bold text-brand-bronze uppercase tracking-widest">Book Now</button>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {post.content}
            </p>
          </div>
        </div>
      ))}
    </motion.div>
  );
};

const BusinessDetail = ({ business, onBack, onBook }: { business: Business, onBack: () => void, onBook: (slot: string) => void }) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const slots = ['08:00 AM', '10:00 AM', '02:00 PM', '05:00 PM', '07:00 PM'];

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="fixed inset-0 bg-brand-light z-[60] flex flex-col max-w-md mx-auto"
    >
      <div className="relative h-72">
        <img src={business.image} className="w-full h-full object-cover" alt={business.name} referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-light via-transparent to-black/20" />
        <button onClick={onBack} className="absolute top-8 left-6 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-lg text-brand-dark">
          <ChevronRight size={20} className="rotate-180" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 -mt-12 relative z-10 pb-12">
        <div className="glass-card p-6 mb-6 shadow-xl">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-brand-dark">{business.name}</h2>
            <div className="flex items-center gap-1 text-brand-accent">
              <Star size={16} fill="currentColor" />
              <span className="font-bold">{business.rating}</span>
            </div>
          </div>
          <p className="text-brand-teal font-bold uppercase tracking-widest text-xs mb-4">{business.category}</p>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{business.description}</p>
          
          <div className="flex items-center gap-2 text-gray-400 text-xs mb-6">
            <MapPin size={14} />
            <span>{business.location} • 1.2 miles away</span>
          </div>

          <h3 className="font-bold mb-4 text-brand-dark">Available Slots</h3>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {slots.map(slot => (
              <button 
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedSlot === slot 
                    ? 'bg-brand-bronze border-brand-bronze text-white shadow-md' 
                    : 'bg-gray-50 border-gray-100 text-gray-400'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <button 
            disabled={!selectedSlot}
            onClick={() => onBook(selectedSlot)}
            className="w-full btn-primary disabled:opacity-50 disabled:shadow-none"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const AIAssistant = ({ onClose }: { onClose: () => void }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hello! I'm your Strength Forged AI assistant. How can I help you with your fitness journey today?" }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const { GoogleGenAI } = await import("@google/genai");
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: "You are a professional fitness and health coach for the 'Strength Forged' app. Provide concise, encouraging, and scientifically-backed advice. Keep responses under 100 words."
        }
      });
      setMessages(prev => [...prev, { role: 'ai', text: response.text || "I'm sorry, I couldn't process that." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-0 bg-brand-light z-[70] flex flex-col max-w-md mx-auto"
    >
      <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center">
            <MessageSquare size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-brand-dark">Health AI</h3>
            <p className="text-[10px] text-brand-teal font-bold uppercase">Online</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 glass-card rounded-full text-brand-dark"><ChevronRight size={20} className="rotate-90" /></button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-brand-light">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm shadow-sm ${
              m.role === 'user' ? 'bg-brand-bronze text-white' : 'bg-white text-brand-dark border border-gray-100'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-xs text-gray-400 italic animate-pulse">AI is thinking...</div>}
      </div>

      <div className="p-6 border-t border-gray-100 flex gap-3 bg-white">
        <input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about workouts, diet, or recovery..."
          className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm outline-none focus:border-brand-teal transition-colors text-brand-dark"
        />
        <button onClick={handleSend} className="p-3 bg-brand-teal rounded-xl text-white shadow-lg shadow-brand-teal/20"><ChevronRight size={20} /></button>
      </div>
    </motion.div>
  );
};

const CoachesScreen = ({ coaches, onBack, onSelectCoach }: { coaches: Business[], onBack: () => void, onSelectCoach: (b: Business) => void, key?: string }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Strength', 'HIIT', 'Bodybuilding', 'Functional', 'Boxing'];
  
  const filteredCoaches = coaches.filter(coach => {
    const matchesFilter = filter === 'All' || coach.description.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch = coach.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         coach.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex-1 flex flex-col bg-white h-full overflow-hidden"
    >
      <div className="px-6 pt-4 pb-4 flex items-center gap-4 border-b border-gray-50">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
          <ChevronLeft size={24} className="text-brand-dark" />
        </button>
        <h2 className="text-xl font-bold text-brand-dark">Find Your Coach</h2>
      </div>

      <div className="px-6 py-4 space-y-4">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or specialty..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze/20 transition-all"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                filter === cat 
                ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20' 
                : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-24 space-y-4 no-scrollbar">
        {filteredCoaches.length > 0 ? (
          filteredCoaches.map((coach, i) => (
            <motion.div
              key={coach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelectCoach(coach)}
              className="glass-card p-4 flex gap-4 items-center group cursor-pointer hover:shadow-md transition-all"
            >
              <img 
                src={coach.image} 
                className="w-20 h-20 rounded-2xl object-cover shadow-sm" 
                alt={coach.name}
                referrerPolicy="no-referrer"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-base text-brand-dark">{coach.name}</h4>
                  <div className="flex items-center gap-1 text-brand-accent">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-bold">{coach.rating}</span>
                  </div>
                </div>
                <p className="text-[10px] text-brand-bronze font-bold uppercase tracking-wider mb-1">{coach.location}</p>
                <p className="text-xs text-gray-500 line-clamp-1 mb-2">{coach.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded-full font-bold uppercase tracking-wider">
                    {coach.category}
                  </span>
                  <span className="text-sm font-bold text-brand-dark">{coach.price_range}</span>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
              <SearchIcon size={32} />
            </div>
            <h3 className="font-bold text-brand-dark mb-1">No coaches found</h3>
            <p className="text-xs text-gray-400">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ExploreScreen = ({ businesses, onSelectBusiness }: { businesses: Business[], onSelectBusiness: (b: Business) => void, key?: string }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = ['All', 'Gyms', 'Coaches', 'Yoga', 'Crossfit'];
  
  const filteredBusinesses = businesses.filter(biz => {
    const isGymOrCoach = biz.category === 'Gym' || biz.category === 'Personal Trainer' || biz.category === 'Yoga Studio' || biz.category === 'Crossfit Box';
    if (!isGymOrCoach) return false;

    const matchesFilter = filter === 'All' || 
                         (filter === 'Gyms' && biz.category === 'Gym') ||
                         (filter === 'Coaches' && biz.category === 'Personal Trainer') ||
                         (filter === 'Yoga' && biz.category === 'Yoga Studio') ||
                         (filter === 'Crossfit' && biz.category === 'Crossfit Box');
    
    const matchesSearch = biz.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         biz.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col bg-white h-full overflow-hidden"
    >
      <div className="px-6 pt-4 pb-4">
        <h2 className="text-xl font-bold text-brand-dark mb-4">Discovery Engine</h2>
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search gyms, coaches, yoga..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze/20 transition-all text-brand-dark"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Map Card */}
        <div className="px-6 mb-6">
          <div className="relative h-72 rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white">
            {/* Google-like Map Background */}
            <img 
              src="https://picsum.photos/seed/google-maps-manila/1200/900" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[5000ms]" 
              alt="Map" 
              referrerPolicy="no-referrer" 
            />
            <div className="absolute inset-0 bg-brand-dark/5" />
            
            {/* Search This Area Button (Google Maps Style) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <button className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border border-gray-100 flex items-center gap-2 text-[10px] font-bold text-brand-teal uppercase tracking-widest hover:bg-white transition-colors">
                <RefreshCw size={12} className="animate-spin-slow" />
                Search this area
              </button>
            </div>

            {/* Map UI Elements - Right Side */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <div className="w-9 h-9 bg-white/95 backdrop-blur-md rounded-xl shadow-lg flex items-center justify-center text-brand-dark hover:bg-white cursor-pointer transition-colors">
                <Layers size={18} />
              </div>
              <div className="flex flex-col bg-white/95 backdrop-blur-md rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="w-9 h-9 flex items-center justify-center text-brand-dark hover:bg-gray-50 cursor-pointer border-bottom border-gray-100">
                  <Plus size={18} />
                </div>
                <div className="w-9 h-9 flex items-center justify-center text-brand-dark hover:bg-gray-50 cursor-pointer">
                  <Minus size={18} />
                </div>
              </div>
            </div>

            {/* Bottom Info & Navigation */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-20">
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-[1.5rem] shadow-2xl border border-white/50 max-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-brand-teal rounded-full animate-ping" />
                  <p className="text-[9px] font-bold text-brand-dark uppercase tracking-widest">Live Location</p>
                </div>
                <h3 className="text-xs font-bold text-brand-dark flex items-center gap-1.5">
                  <MapPin size={14} className="text-brand-teal" /> Ayala Ave, Makati
                </h3>
              </div>
              <div className="w-12 h-12 bg-brand-teal rounded-2xl shadow-xl flex items-center justify-center text-white border-2 border-white/20 hover:scale-110 transition-transform cursor-pointer">
                <Navigation size={24} />
              </div>
            </div>
            
            {/* Health Centre Markers - Teardrop Style */}
            <div className="absolute top-[20%] left-[30%] group/marker cursor-pointer z-10">
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-all scale-90 group-hover/marker:scale-100 pointer-events-none">
                  <p className="text-[10px] font-bold">St. Luke's Medical Center</p>
                  <p className="text-[8px] text-gray-400">Open 24/7 • 0.8km away</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full rounded-bl-none rotate-45 border-2 border-white shadow-xl flex items-center justify-center animate-bounce">
                    <Heart size={14} className="text-white -rotate-45" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-[45%] right-[25%] group/marker cursor-pointer z-10">
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-all scale-90 group-hover/marker:scale-100 pointer-events-none">
                  <p className="text-[10px] font-bold">Makati Health Hub</p>
                  <p className="text-[8px] text-gray-400">Closing soon • 1.2km away</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full rounded-bl-none rotate-45 border-2 border-white shadow-xl flex items-center justify-center">
                    <Heart size={14} className="text-white -rotate-45" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-[30%] left-[45%] group/marker cursor-pointer z-10">
              <div className="relative">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-3 py-1.5 rounded-xl shadow-2xl whitespace-nowrap opacity-0 group-hover/marker:opacity-100 transition-all scale-90 group-hover/marker:scale-100 pointer-events-none">
                  <p className="text-[10px] font-bold">Wellness Point Clinic</p>
                  <p className="text-[8px] text-gray-400">Highly Rated • 2.5km away</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-red-500 rounded-full rounded-bl-none rotate-45 border-2 border-white shadow-xl flex items-center justify-center animate-pulse">
                    <Heart size={14} className="text-white -rotate-45" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-6 mb-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === cat 
                  ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results List */}
        <div className="px-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider">Nearby Results</h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{filteredBusinesses.length} Found</span>
          </div>
          
          {filteredBusinesses.length > 0 ? (
            filteredBusinesses.map((biz, i) => (
              <motion.div
                key={biz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelectBusiness(biz)}
                className="glass-card p-3 flex gap-4 items-center group cursor-pointer hover:shadow-md transition-all"
              >
                <div className="relative">
                  <img 
                    src={biz.image} 
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm" 
                    alt={biz.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-50">
                    <Star size={10} fill="#D4AF37" className="text-brand-accent" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-brand-dark">{biz.name}</h4>
                  <p className="text-[10px] text-gray-400 mb-1 flex items-center gap-1">
                    <MapPin size={10} /> {biz.location}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] px-2 py-0.5 bg-brand-teal/10 text-brand-teal rounded-full font-bold uppercase tracking-wider">
                      {biz.category}
                    </span>
                    <span className="text-[10px] font-bold text-brand-bronze">{biz.price_range}</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-gray-300 group-hover:text-brand-bronze group-hover:translate-x-1 transition-all" />
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <SearchIcon size={24} />
              </div>
              <h3 className="font-bold text-brand-dark text-sm mb-1">No results found</h3>
              <p className="text-[10px] text-gray-400">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ShopScreen = ({ cart, setCart }: { cart: any[], setCart: (c: any[]) => void, key?: string }) => {
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [offers, setOffers] = useState([
    { id: 1, title: 'Summer Sale', discount: '30% OFF', description: 'On all protein supplements', color: 'bg-brand-dark', image: 'https://picsum.photos/seed/offer1/800/400' },
    { id: 2, title: 'New Arrival', discount: 'FREE SHIPPING', description: 'On orders over $100', color: 'bg-brand-teal', image: 'https://picsum.photos/seed/offer2/800/400' },
    { id: 3, title: 'Bundle Deal', discount: 'BUY 2 GET 1', description: 'On selected gym equipment', color: 'bg-brand-bronze', image: 'https://picsum.photos/seed/offer3/800/400' },
  ]);

  const [products, setProducts] = useState([
    { id: 1, name: 'Whey Protein Isolate', category: 'Supplements', price: 59.99, rating: 4.8, image: 'https://picsum.photos/seed/prod1/400/400', badge: 'Best Seller' },
    { id: 2, name: 'Adjustable Dumbbells', category: 'Equipment', price: 199.99, rating: 4.9, image: 'https://picsum.photos/seed/prod2/400/400', badge: 'New' },
    { id: 3, name: 'Performance Leggings', category: 'Apparel', price: 45.00, rating: 4.7, image: 'https://picsum.photos/seed/prod3/400/400' },
    { id: 4, name: 'Smart Fitness Watch', category: 'Accessories', price: 129.99, rating: 4.6, image: 'https://picsum.photos/seed/prod4/400/400', badge: 'Sale' },
    { id: 5, name: 'Keto Meal Plan', category: 'Meals', price: 89.99, rating: 4.5, image: 'https://picsum.photos/seed/prod5/400/400' },
    { id: 6, name: 'Resistance Bands Set', category: 'Equipment', price: 24.99, rating: 4.8, image: 'https://picsum.photos/seed/prod6/400/400' },
    { id: 7, name: 'Pre-Workout Energy', category: 'Supplements', price: 34.99, rating: 4.4, image: 'https://picsum.photos/seed/prod7/400/400' },
    { id: 8, name: 'Yoga Mat Pro', category: 'Equipment', price: 55.00, rating: 4.9, image: 'https://picsum.photos/seed/prod8/400/400' },
  ]);

  useEffect(() => {
    const hasGenerated = sessionStorage.getItem('shop_images_generated');
    if (!hasGenerated) {
      generateShopImages();
    }
  }, []);

  const generateShopImages = async () => {
    setIsGenerating(true);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    
    try {
      // Generate Product Images
      const updatedProducts = [...products];
      for (let i = 0; i < updatedProducts.length; i++) {
        const prod = updatedProducts[i];
        const prompt = `A high-quality, professional product photograph of ${prod.name}, a fitness ${prod.category} product. Clean white background, studio lighting, 8k resolution, commercial photography style.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            updatedProducts[i] = { ...prod, image: `data:image/png;base64,${part.inlineData.data}` };
            setProducts([...updatedProducts]);
            break;
          }
        }
      }

      // Generate Offer Images
      const updatedOffers = [...offers];
      for (let i = 0; i < updatedOffers.length; i++) {
        const offer = updatedOffers[i];
        const prompt = `A dynamic, high-energy fitness lifestyle photograph representing ${offer.title}: ${offer.description}. Professional lighting, cinematic style, 8k resolution.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] },
        });

        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            updatedOffers[i] = { ...offer, image: `data:image/png;base64,${part.inlineData.data}` };
            setOffers([...updatedOffers]);
            break;
          }
        }
      }

      sessionStorage.setItem('shop_images_generated', 'true');
    } catch (error) {
      console.error("Error generating shop images:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const categories = ['All', 'Supplements', 'Equipment', 'Apparel', 'Accessories', 'Meals'];

  const filteredProducts = products.filter(prod => {
    const matchesFilter = filter === 'All' || prod.category === filter;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col bg-white h-full overflow-hidden"
    >
      <div className="px-6 pt-4 pb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-brand-dark">Shop & Nutrition</h2>
          {isGenerating && (
            <div className="flex items-center gap-2 px-3 py-1 bg-brand-teal/10 rounded-full">
              <RefreshCw size={12} className="text-brand-teal animate-spin" />
              <span className="text-[10px] font-bold text-brand-teal uppercase tracking-widest">AI Generating...</span>
            </div>
          )}
        </div>
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products, supplements..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-bronze/20 transition-all text-brand-dark"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Offers Carousel */}
        <div className="px-6 mb-8">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {offers.map(offer => (
              <div key={offer.id} className={`min-w-[280px] h-40 rounded-[2rem] ${offer.color} p-6 relative overflow-hidden shadow-xl group`}>
                <img src={offer.image} className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-1000" alt={offer.title} referrerPolicy="no-referrer" />
                <div className="relative z-10 flex flex-col justify-between h-full text-white">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-bronze">{offer.title}</span>
                    <h3 className="text-2xl font-bold leading-tight">{offer.discount}</h3>
                  </div>
                  <p className="text-xs text-gray-200">{offer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="px-6 mb-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${
                  filter === cat 
                  ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/20' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="px-6 grid grid-cols-2 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod, i) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden group hover:shadow-lg transition-all"
              >
                <div className="relative aspect-square">
                  <img src={prod.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={prod.name} referrerPolicy="no-referrer" />
                  {prod.badge && (
                    <div className="absolute top-2 left-2 bg-brand-bronze text-[8px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider">
                      {prod.badge}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-1">
                    <Star size={10} fill="#D4AF37" className="text-brand-accent" />
                    <span className="text-[10px] font-bold text-brand-dark">{prod.rating}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest mb-1">{prod.category}</p>
                  <h4 className="text-xs font-bold text-brand-dark mb-2 line-clamp-1">{prod.name}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-bold text-brand-bronze">${prod.price}</p>
                    <button 
                      onClick={() => setCart([...cart, prod])}
                      className="p-2 bg-brand-teal rounded-xl text-white shadow-lg shadow-brand-teal/20 hover:scale-110 transition-transform active:scale-95"
                    >
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-2 flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <ShoppingBag size={24} />
              </div>
              <h3 className="font-bold text-brand-dark text-sm mb-1">No products found</h3>
              <p className="text-[10px] text-gray-400">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProfileScreen = ({ key }: { key?: string }) => {
  const [subScreen, setSubScreen] = useState<string | null>(null);

  const menuItems = [
    { id: 'bookings', label: 'My Bookings', icon: <Calendar size={18} />, color: 'text-brand-teal' },
    { id: 'orders', label: 'Order History', icon: <Package size={18} />, color: 'text-brand-bronze' },
    { id: 'food', label: 'Food Subscription', icon: <Coffee size={18} />, color: 'text-orange-500' },
    { id: 'payment', label: 'Payment Methods', icon: <CreditCard size={18} />, color: 'text-blue-500' },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={18} />, color: 'text-gray-500' },
  ];

  const renderSubScreen = () => {
    switch (subScreen) {
      case 'bookings':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setSubScreen(null)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft size={24} className="text-brand-dark" />
              </button>
              <h3 className="text-xl font-bold text-brand-dark">My Bookings</h3>
            </div>
            {[1, 2, 3].map(i => (
              <div key={i} className="glass-card p-4 flex gap-4 items-center bg-white border border-gray-100">
                <div className="w-12 h-12 bg-brand-teal/10 rounded-2xl flex items-center justify-center text-brand-teal">
                  <Zap size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-brand-dark">HIIT Session with Coach Marco</h4>
                  <p className="text-[10px] text-gray-400 flex items-center gap-1 mt-1">
                    <Clock size={10} /> Tomorrow, 10:00 AM • Makati Central
                  </p>
                </div>
                <span className="text-[10px] px-2 py-1 bg-brand-teal text-white rounded-full font-bold uppercase tracking-wider">Confirmed</span>
              </div>
            ))}
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setSubScreen(null)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft size={24} className="text-brand-dark" />
              </button>
              <h3 className="text-xl font-bold text-brand-dark">Order History</h3>
            </div>
            {[1, 2].map(i => (
              <div key={i} className="glass-card p-4 flex gap-4 items-center bg-white border border-gray-100">
                <div className="w-12 h-12 bg-brand-bronze/10 rounded-2xl flex items-center justify-center text-brand-bronze">
                  <Package size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm text-brand-dark">Order #SF-2024-{i}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">2 Items • Delivered on March {10 + i}, 2024</p>
                </div>
                <p className="text-sm font-bold text-brand-dark">$84.99</p>
              </div>
            ))}
          </div>
        );
      case 'food':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setSubScreen(null)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft size={24} className="text-brand-dark" />
              </button>
              <h3 className="text-xl font-bold text-brand-dark">Food Subscription</h3>
            </div>
            <div className="glass-card p-6 bg-brand-dark text-white rounded-[2rem] relative overflow-hidden shadow-xl mb-6">
              <div className="relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-bronze">Active Plan</span>
                <h4 className="text-2xl font-bold mb-1">Keto Performance</h4>
                <p className="text-xs text-gray-400 mb-4">Next delivery: Tomorrow, 8:00 AM</p>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-brand-teal rounded-xl text-[10px] font-bold uppercase tracking-widest">Manage Plan</button>
                  <button className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl text-[10px] font-bold uppercase tracking-widest">View Menu</button>
                </div>
              </div>
              <Coffee size={120} className="absolute -right-8 -bottom-8 text-white/5 rotate-12" />
            </div>
            <h4 className="text-sm font-bold text-brand-dark uppercase tracking-wider px-2">Recent Deliveries</h4>
            {[1, 2].map(i => (
              <div key={i} className="glass-card p-4 flex gap-4 items-center bg-white border border-gray-100">
                <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-500">
                  <Utensils size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-brand-dark">Grilled Salmon & Asparagus</h4>
                  <p className="text-[10px] text-gray-400">Delivered Yesterday • 540 kcal</p>
                </div>
                <Star size={14} className="text-brand-accent" fill="currentColor" />
              </div>
            ))}
          </div>
        );
      case 'payment':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setSubScreen(null)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft size={24} className="text-brand-dark" />
              </button>
              <h3 className="text-xl font-bold text-brand-dark">Payment Methods</h3>
            </div>
            <div className="glass-card p-6 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-[2rem] shadow-xl mb-6 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <CreditCard size={32} />
                  <span className="text-xs font-bold tracking-widest uppercase">Primary</span>
                </div>
                <p className="text-lg font-mono tracking-[0.2em] mb-4">•••• •••• •••• 4242</p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-blue-200">Card Holder</p>
                    <p className="text-xs font-bold uppercase">Alex Johnson</p>
                  </div>
                  <div>
                    <p className="text-[8px] uppercase tracking-widest text-blue-200">Expires</p>
                    <p className="text-xs font-bold">12/26</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
            </div>
            <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-[1.5rem] text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:border-brand-teal hover:text-brand-teal transition-all">
              <Plus size={16} /> Add New Card
            </button>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <button onClick={() => setSubScreen(null)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                <ChevronLeft size={24} className="text-brand-dark" />
              </button>
              <h3 className="text-xl font-bold text-brand-dark">Settings</h3>
            </div>
            <div className="space-y-2">
              {[
                { label: 'Notifications', icon: <BellRing size={18} />, color: 'text-brand-teal' },
                { label: 'Privacy & Security', icon: <Shield size={18} />, color: 'text-blue-500' },
                { label: 'Language', icon: <Share2 size={18} />, color: 'text-brand-bronze' },
                { label: 'Help & Support', icon: <MessageSquare size={18} />, color: 'text-orange-500' },
              ].map(item => (
                <button key={item.label} className="w-full glass-card p-4 flex justify-between items-center bg-white border border-gray-100 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`${item.color}`}>{item.icon}</div>
                    <span className="text-sm font-medium text-brand-dark">{item.label}</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300" />
                </button>
              ))}
              <button className="w-full glass-card p-4 flex justify-between items-center bg-red-50 border border-red-100 mt-8 hover:bg-red-100 transition-colors">
                <div className="flex items-center gap-3 text-red-500">
                  <LogOut size={18} />
                  <span className="text-sm font-bold">Log Out</span>
                </div>
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex-1 flex flex-col bg-white h-full overflow-hidden"
    >
      <div className="flex-1 overflow-y-auto no-scrollbar px-6 pt-8 pb-24">
        <AnimatePresence mode="wait">
          {!subScreen ? (
            <motion.div 
              key="main-profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full border-4 border-brand-bronze p-1 shadow-2xl">
                    <img src="https://i.pravatar.cc/150?u=user" className="w-full h-full rounded-full object-cover" alt="User" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute bottom-1 right-1 w-8 h-8 bg-brand-teal rounded-full border-4 border-white flex items-center justify-center text-white shadow-lg">
                    <Plus size={16} />
                  </div>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-brand-dark tracking-tight">Alex Johnson</h2>
                  <p className="text-xs text-gray-400 font-medium">Member since March 2024 • Pro Athlete</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-5 text-center bg-white border border-gray-100 shadow-sm">
                  <p className="text-3xl font-bold text-brand-teal">12</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Bookings</p>
                </div>
                <div className="glass-card p-5 text-center bg-white border border-gray-100 shadow-sm">
                  <p className="text-3xl font-bold text-brand-bronze">4</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mt-1">Subscriptions</p>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-brand-dark uppercase tracking-widest px-2 mb-4">Account Overview</h3>
                {menuItems.map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => setSubScreen(item.id)}
                    className="w-full glass-card p-4 flex justify-between items-center hover:bg-gray-50 transition-all bg-white border border-gray-100 group active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${item.color} group-hover:bg-white transition-colors`}>
                        {item.icon}
                      </div>
                      <span className="text-sm font-bold text-brand-dark">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-300 group-hover:text-brand-dark group-hover:translate-x-1 transition-all" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sub-screen"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {renderSubScreen()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showAI, setShowAI] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [isGeneratingImages, setIsGeneratingImages] = useState(false);

  useEffect(() => {
    fetch('/api/businesses')
      .then(res => res.json())
      .then(data => {
        console.log('App fetched businesses:', data);
        setBusinesses(data);
        generateCoachImages(data);
      })
      .catch(err => console.error('Error fetching businesses:', err));
  }, []);

  const generateCoachImages = async (allBusinesses: Business[]) => {
    const coaches = allBusinesses.filter(b => b.category === 'Personal Trainer');
    if (coaches.length === 0) return;

    setIsGeneratingImages(true);
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
    
    try {
      const updatedBusinesses = [...allBusinesses];
      
      for (let i = 0; i < coaches.length; i++) {
        const coach = coaches[i];
        if (coach.image.includes('pinoy')) {
          const prompt = `A professional, high-quality, realistic portrait of a young Filipino male fitness coach, ${coach.description}. He is wearing athletic gear, smiling confidently, in a modern gym setting. Cinematic lighting, 8k resolution.`;
          
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: prompt }] },
          });

          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64Data = part.inlineData.data;
              const imageUrl = `data:image/png;base64,${base64Data}`;
              
              const index = updatedBusinesses.findIndex(b => b.id === coach.id);
              if (index !== -1) {
                updatedBusinesses[index] = { ...updatedBusinesses[index], image: imageUrl };
              }
            }
          }
        }
      }
      setBusinesses(updatedBusinesses);
    } catch (error) {
      console.error("Error generating coach images:", error);
    } finally {
      setIsGeneratingImages(false);
    }
  };

  const handleBook = async (slot: string) => {
    if (!selectedBusiness) return;
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: 1, business_id: selectedBusiness.id, slot })
      });
      if (res.ok) {
        alert('Booking Confirmed! Check your profile for details.');
        setSelectedBusiness(null);
      }
    } catch (err) {
      alert('Booking failed. Please try again.');
    }
  };

  const renderContent = () => {
    if (activeTab === 'coaches') {
      return (
        <CoachesScreen 
          key="coaches"
          coaches={businesses.filter(b => b.category === 'Personal Trainer')}
          onBack={() => setActiveTab('home')}
          onSelectCoach={(b: Business) => setSelectedBusiness(b)}
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeScreen 
            key="home" 
            onExplore={() => setActiveTab('explore')} 
            onSelectBusiness={(b: Business) => setSelectedBusiness(b)}
            onSeeMoreCoaches={() => setActiveTab('coaches')}
            businesses={businesses}
          />
        );
      case 'explore':
        return (
          <ExploreScreen 
            key="explore"
            businesses={businesses}
            onSelectBusiness={(b: Business) => setSelectedBusiness(b)}
          />
        );
      case 'shop':
        return (
          <ShopScreen 
            key="shop"
            cart={cart}
            setCart={setCart}
          />
        );
      case 'social':
        return <SocialFeed key="social" />;
      case 'profile':
        return <ProfileScreen key="profile" />;
      default:
        return null;
    }
  };

  return (
    <div className="mobile-container">
      <StatusBar />
      <Header onOpenAI={() => setShowAI(true)} />
      
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>

      <AnimatePresence>
        {selectedBusiness && (
          <BusinessDetail 
            business={selectedBusiness} 
            onBack={() => setSelectedBusiness(null)} 
            onBook={handleBook}
          />
        )}
        {showAI && <AIAssistant onClose={() => setShowAI(false)} />}
      </AnimatePresence>

      {/* Loading Overlay for Image Generation */}
      <AnimatePresence>
        {isGeneratingImages && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/80 backdrop-blur-md z-[100] flex flex-col items-center justify-center text-white p-8 text-center"
          >
            <div className="w-20 h-20 border-4 border-brand-bronze border-t-transparent rounded-full animate-spin mb-6" />
            <h3 className="text-xl font-bold mb-2 tracking-tight">Forging Your Experience</h3>
            <p className="text-xs text-gray-400 max-w-[240px]">We're using AI to generate personalized coach profiles just for you...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomeIndicator />
    </div>
  );
}
