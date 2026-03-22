import { mockMatches, mockBets, mockStats, bankrollData, aiReasoning } from '../data/mockData';
import type { Match, Bet, Stats } from '../data/mockData';

// TODO: Replace with real backend URL in production
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  getUpcomingMatches: async (): Promise<Match[]> => {
    // TODO: Implement real API call
    // const response = await fetch(`${API_BASE_URL}/matches/upcoming`);
    // return response.json();
    await delay(600);
    return mockMatches;
  },
  getMatchDetail: async (id: string) => {
    // TODO: Implement real API call
    // const response = await fetch(`${API_BASE_URL}/matches/${id}`);
    // return response.json();
    await delay(600);
    const match = mockMatches.find(m => m.id === id);
    if (!match) throw new Error('Match not found');
    return { 
      ...match, 
      reasoning: (aiReasoning as Record<string, string>)[id] || 'Standard analysis applied. No detailed reasoning available for this specific match yet.' 
    };
  },
  getBets: async (): Promise<Bet[]> => {
    // TODO: Implement real API call
    // const response = await fetch(`${API_BASE_URL}/bets`);
    // return response.json();
    await delay(500);
    return mockBets;
  },
  placeBet: async (betData: Partial<Bet>) => {
    // TODO: Implement real API call
    // const response = await fetch(`${API_BASE_URL}/bets`, { method: 'POST', body: JSON.stringify(betData) });
    // return response.json();
    await delay(800);
    return { success: true, id: Math.random().toString(36).substr(2, 9) };
  },
  getDashboardStats: async () => {
    // TODO: Implement real API call
    // const response = await fetch(`${API_BASE_URL}/stats/dashboard`);
    // return response.json();
    await delay(700);
    return { stats: mockStats, bankroll: bankrollData };
  },
  getUserProfile: async () => {
    // TODO: Implement real API call
    // const response = await fetch(`${API_BASE_URL}/user/profile`);
    // return response.json();
    await delay(400);
    return {
      name: 'Alex Bettor',
      email: 'alex@example.com',
      tier: 'Pro',
      renewalDate: '2024-04-15'
    };
  }
};
