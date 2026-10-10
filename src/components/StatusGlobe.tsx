import { useState, useEffect } from 'react';
import './StatusGlobe.css';

function isOnline() {
  const now = new Date();
  const istHour = (now.getUTCHours() + 5 + (now.getUTCMinutes() + 30 >= 60 ? 1 : 0)) % 24;
  return istHour >= 8;
}

export function StatusGlobe() {
  const [online, setOnline] = useState(isOnline);

  useEffect(() => {
    const id = setInterval(() => setOnline(isOnline()), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="status-globe" title={online ? 'Available (IST 08:00–00:00)' : 'Away (IST 00:00–08:00)'}>
      <div className="status-globe__sphere">
        <div className="status-globe__dots">
          <div className="status-globe__dots-inner">
            <div className="status-globe__dots-half" />
            <div className="status-globe__dots-half" />
          </div>
        </div>
        <div className="status-globe__equator" />
        <div className="status-globe__meridian" />
      </div>
      <div className={`status-globe__indicator status-globe__indicator--${online ? 'online' : 'offline'}`} />
    </div>
  );
}
