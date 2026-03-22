const USAGE_KEY = 'edgeai_weekly_usage';
const RESET_KEY = 'edgeai_usage_last_reset';
const WEEKLY_LIMIT = 5;

function getCurrentWeekKey() {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getUTCFullYear()}-W${weekNo}`;
}

export function resetWeeklyUsageIfNeeded() {
  const currentWeek = getCurrentWeekKey();
  const lastReset = localStorage.getItem(RESET_KEY);
  
  if (lastReset !== currentWeek) {
    localStorage.setItem(USAGE_KEY, '0');
    localStorage.setItem(RESET_KEY, currentWeek);
  }
}

export function getRemainingPredictions(userTier: string): number {
  if (userTier === 'pro') return Infinity;
  
  resetWeeklyUsageIfNeeded();
  const used = parseInt(localStorage.getItem(USAGE_KEY) || '0', 10);
  return Math.max(0, WEEKLY_LIMIT - used);
}

export function usePrediction(userTier: string): boolean {
  if (userTier === 'pro') return true;
  
  resetWeeklyUsageIfNeeded();
  let used = parseInt(localStorage.getItem(USAGE_KEY) || '0', 10);
  
  if (used < WEEKLY_LIMIT) {
    used += 1;
    localStorage.setItem(USAGE_KEY, used.toString());
    return true;
  }
  return false;
}
