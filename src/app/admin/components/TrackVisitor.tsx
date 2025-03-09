'use client';

import { useEffect, useRef } from 'react';
import axios from 'axios';

export default function VisitorTracker() {
  const hasTracked = useRef(false); // Prevent duplicate calls in strict mode

  useEffect(() => {
    if (hasTracked.current) return;
    const now = Date.now();

    const trackVisitor = async () => {
      try {
        await axios.post('/api/visitors');
      } catch (error) {
        console.error('Error tracking visit:', error);
      }
    };

    trackVisitor();
    hasTracked.current = true;
  }, []);

  return null;
}
