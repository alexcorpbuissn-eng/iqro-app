'use client';

import { useState, useEffect } from 'react';
import { OnboardingSlides } from '@/components/onboarding/OnboardingSlides';

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const [done, setDone] = useState(true); // default true = don't flash

  useEffect(() => {
    const seen = localStorage.getItem('iqro_onboarding_done');
    if (!seen) setDone(false);
  }, []);

  if (!done) {
    return (
      <OnboardingSlides
        onFinish={() => {
          localStorage.setItem('iqro_onboarding_done', '1');
          setDone(true);
        }}
      />
    );
  }
  return <>{children}</>;
}
