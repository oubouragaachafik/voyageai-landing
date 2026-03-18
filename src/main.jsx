import { inject } from '@vercel/analytics';
inject();
import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Landing from './Landing.jsx'
import App from './App.jsx'

function Router() {
  const [page, setPage] = useState(window.location.hash === '#app' ? 'app' : 'landing');

  useEffect(() => {
    const handler = () => {
      setPage(window.location.hash === '#app' ? 'app' : 'landing');
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  if (page === 'app') return <App />;
  return <Landing onLaunch={() => { window.location.hash = '#app'; setPage('app'); }} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
