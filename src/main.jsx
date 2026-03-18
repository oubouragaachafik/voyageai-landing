import { inject } from '@vercel/analytics';
inject();
import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './Landing.jsx'
import App from './App.jsx'

function Router() {
  const [page, setPage] = useState(window.location.hash === '#app' ? 'app' : 'landing');
  window.addEventListener('hashchange', () => {
    setPage(window.location.hash === '#app' ? 'app' : 'landing');
  });
  if (page === 'app') return <App />;
  return <Landing onLaunch={() => { window.location.hash = '#app'; setPage('app'); }} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
20 destinations avec des catalogues complets
"5", "Catégories"
"Street food, Temples, Night" },
  { city: "Phuket", emoji: "🇹🇭", gradient: "linear-gradient(135deg,#00BCD4,#006064)", tag: "Plages, Îles, Plongée" },
  { city: "Kuala Lumpur", emoji: "🇲🇾", gradient: "linear-gradient(135deg,#FFD600,#0D47A1)", tag: "Tours, Street food, Culture" },
  { city: "Los Angeles", emoji: "🇺🇸", gradient: "linear-gradient(135deg,#FF8F00,#E91E63)", tag: "Hollywood, Surf, Sunset" },
  { city: "Londres", emoji: "🇬🇧", gradient: "linear-gradient(135deg,#1A237E,#C62828)", tag: "Pubs, Musées, Camden" },
  { city: "Marbella", emoji: "🇪🇸", gradient: "linear-gradient(135deg,#F57F17,#00897B)", tag: "Beach clubs, Luxe, Tapas" },
  { city: "Istanbul", emoji: "🇹🇷", gradient: "linear-gradient(135deg,#C62828,#ECEFF1)", tag: "Bosphore, Bazars, Kebab" },
  { city: "Amsterdam", emoji: "🇳🇱", gradient: "linear-gradient(135deg,#FF6F00,#1565C0)", tag: "Canaux, Vélos, Musées" },
  { city: "Cancún", emoji: "🇲🇽", gradient: "linear-gradient(135deg,#00BFA5,#FFD600)", tag: "Cenotes, Plage, Maya" },
  { city: "Rio de Janeiro", emoji: "🇧🇷", gradient: "linear-gradient(135deg,#2E7D32,#FFD600)", tag: "Samba, Plages, Cristo" },
  { city: "Mykonos", emoji: "🇬🇷", gradient: "linear-gradient(135deg,#1565C0,#FFFFFF)", tag: "Cyclades, Fêtes, Soleil" },
  { city: "Séoul", emoji: "🇰🇷", gradient: "linear-gradient(135deg,#D81B60,#1A237E)", tag: "K-pop, BBQ, Palais" },
];