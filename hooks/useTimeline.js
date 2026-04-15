"use client";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useTimeline() {
  const [timeline, setTimeline] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('keenkeeper_timeline') : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTimeline(parsed);
      } catch (e) {
        console.error('Failed to parse timeline', e);
      }
    }
    setLoading(false);
  }, []);

  const addInteraction = (friendId, friendName, type) => {
    const newEntry = {
      id: Math.random().toString(36).substr(2, 9),
      friendId,
      friendName,
      type,
      date: new Date().toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }),
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} with ${friendName}`
    };

    const updated = [newEntry, ...timeline];
    setTimeline(updated);
    localStorage.setItem('keenkeeper_timeline', JSON.stringify(updated));
    
    toast.success(`Interaction logged!`, {
      description: `Successfully added ${type} entry with ${friendName}.`
    });
  };

  return { timeline, addInteraction, loading };
}
