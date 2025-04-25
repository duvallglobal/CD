"use client";

import { useEffect } from 'react';
import { initializeParse } from '@/lib/parse';

export function ParseInitializer() {
  useEffect(() => {
    // Initialize Parse when the component mounts
    initializeParse();
  }, []);

  return null; // This component doesn't render anything
}
