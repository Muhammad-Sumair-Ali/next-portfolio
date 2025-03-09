'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function VisitorTracker() {
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (tracked) return;

    const trackVisitor = async () => {
      try {
        await axios.post('/api/visitors');
        setTracked(true);
        
        // Optionally store in localStorage to avoid tracking again in the same session
        // Can be set to expire after certain time period by storing timestamp
        const now = new Date().getTime();
        localStorage.setItem('visitorTracked', now.toString());
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    // Check if already tracked in this browser session (within last 24 hours)
    const lastTracked = localStorage.getItem('visitorTracked');
    if (lastTracked) {
      const lastTrackedTime = parseInt(lastTracked, 10);
      const now = new Date().getTime();
      const hoursPassed = (now - lastTrackedTime) / (1000 * 60 * 60);
      
      if (hoursPassed < 24) {
        setTracked(true);
        return;
      }
    }
    
    trackVisitor();
  }, [tracked]);

  return null;
}