import { useState, useEffect } from 'react';
import { getRemainingPredictions, usePrediction } from '../mock/usage';

export function useUsage(userTier: 'free' | 'pro') {
  const [remaining, setRemaining] = useState<number>(() => getRemainingPredictions(userTier));

  useEffect(() => {
    // Keep in sync when tier might change
    setRemaining(getRemainingPredictions(userTier));
  }, [userTier]);

  const consumePrediction = (): boolean => {
    const success = usePrediction(userTier);
    if (success) {
      setRemaining(getRemainingPredictions(userTier));
    }
    return success;
  };

  return { remaining, consumePrediction };
}
