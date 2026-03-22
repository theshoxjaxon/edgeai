// Mock data for the Football Betting SaaS

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  kickoff: string;
  status: 'upcoming' | 'live' | 'finished';
  homeProb: number;
  drawProb: number;
  awayProb: number;
  edge: number;
  prediction: string;
  confidence: number;
  marketOdds: {
    home: number;
    draw: number;
    away: number;
  };
  fairOdds: {
    home: number;
    draw: number;
    away: number;
  };
  kellyStake: number;
  recentForm: {
    home: string[];
    away: string[];
  };
  h2h: {
    total: number;
    homeWins: number;
    draws: number;
    awayWins: number;
  };
}

export interface Bet {
  id: string;
  match: string;
  selection: string;
  odds: number;
  stake: number;
  result: 'win' | 'loss' | 'pending';
  profit: number;
  date: string;
}

export interface Stats {
  totalBets: number;
  wins: number;
  losses: number;
  winRate: number;
  roi: number;
  totalProfit: number;
  avgEdge: number;
  currentStreak: number;
}

export const mockMatches: Match[] = [
  {
    id: '1',
    homeTeam: 'Manchester City',
    awayTeam: 'Liverpool',
    league: 'Premier League',
    kickoff: '20:00',
    status: 'upcoming',
    homeProb: 52,
    drawProb: 26,
    awayProb: 22,
    edge: 8.5,
    prediction: 'Home Win',
    confidence: 72,
    marketOdds: { home: 2.10, draw: 3.40, away: 3.60 },
    fairOdds: { home: 1.92, draw: 3.85, away: 4.55 },
    kellyStake: 2.5,
    recentForm: {
      home: ['W', 'W', 'D', 'W', 'W'],
      away: ['W', 'D', 'W', 'L', 'W']
    },
    h2h: { total: 10, homeWins: 6, draws: 2, awayWins: 2 }
  },
  {
    id: '2',
    homeTeam: 'Real Madrid',
    awayTeam: 'Barcelona',
    league: 'La Liga',
    kickoff: '21:00',
    status: 'upcoming',
    homeProb: 45,
    drawProb: 28,
    awayProb: 27,
    edge: 6.2,
    prediction: 'Home Win',
    confidence: 65,
    marketOdds: { home: 2.40, draw: 3.30, away: 3.00 },
    fairOdds: { home: 2.22, draw: 3.57, away: 3.70 },
    kellyStake: 1.8,
    recentForm: {
      home: ['W', 'W', 'W', 'D', 'W'],
      away: ['W', 'W', 'L', 'W', 'D']
    },
    h2h: { total: 10, homeWins: 4, draws: 3, awayWins: 3 }
  },
  {
    id: '3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Dortmund',
    league: 'Bundesliga',
    kickoff: '18:30',
    status: 'upcoming',
    homeProb: 58,
    drawProb: 24,
    awayProb: 18,
    edge: 12.3,
    prediction: 'Home Win',
    confidence: 78,
    marketOdds: { home: 1.75, draw: 4.00, away: 4.50 },
    fairOdds: { home: 1.72, draw: 4.17, away: 5.56 },
    kellyStake: 3.2,
    recentForm: {
      home: ['W', 'W', 'W', 'W', 'D'],
      away: ['L', 'W', 'D', 'W', 'L']
    },
    h2h: { total: 10, homeWins: 7, draws: 1, awayWins: 2 }
  },
  {
    id: '4',
    homeTeam: 'Inter Milan',
    awayTeam: 'Juventus',
    league: 'Serie A',
    kickoff: '20:45',
    status: 'upcoming',
    homeProb: 38,
    drawProb: 32,
    awayProb: 30,
    edge: 4.8,
    prediction: 'Draw',
    confidence: 60,
    marketOdds: { home: 2.60, draw: 3.20, away: 2.80 },
    fairOdds: { home: 2.63, draw: 3.13, away: 3.33 },
    kellyStake: 1.2,
    recentForm: {
      home: ['W', 'D', 'W', 'W', 'L'],
      away: ['D', 'W', 'W', 'D', 'W']
    },
    h2h: { total: 10, homeWins: 3, draws: 4, awayWins: 3 }
  },
  {
    id: '5',
    homeTeam: 'PSG',
    awayTeam: 'Marseille',
    league: 'Ligue 1',
    kickoff: '21:00',
    status: 'upcoming',
    homeProb: 62,
    drawProb: 22,
    awayProb: 16,
    edge: 9.1,
    prediction: 'Home Win',
    confidence: 75,
    marketOdds: { home: 1.60, draw: 4.20, away: 5.50 },
    fairOdds: { home: 1.61, draw: 4.55, away: 6.25 },
    kellyStake: 2.8,
    recentForm: {
      home: ['W', 'W', 'D', 'W', 'W'],
      away: ['L', 'W', 'L', 'D', 'W']
    },
    h2h: { total: 10, homeWins: 6, draws: 2, awayWins: 2 }
  },
  {
    id: '6',
    homeTeam: 'Arsenal',
    awayTeam: 'Chelsea',
    league: 'Premier League',
    kickoff: '17:30',
    status: 'upcoming',
    homeProb: 48,
    drawProb: 28,
    awayProb: 24,
    edge: 5.5,
    prediction: 'Home Win',
    confidence: 68,
    marketOdds: { home: 2.20, draw: 3.40, away: 3.30 },
    fairOdds: { home: 2.08, draw: 3.57, away: 4.17 },
    kellyStake: 1.5,
    recentForm: {
      home: ['W', 'W', 'W', 'D', 'W'],
      away: ['D', 'L', 'W', 'W', 'D']
    },
    h2h: { total: 10, homeWins: 5, draws: 3, awayWins: 2 }
  },
  {
    id: '7',
    homeTeam: 'AC Milan',
    awayTeam: 'Napoli',
    league: 'Serie A',
    kickoff: '18:00',
    status: 'upcoming',
    homeProb: 42,
    drawProb: 30,
    awayProb: 28,
    edge: 3.2,
    prediction: 'Home Win',
    confidence: 62,
    marketOdds: { home: 2.40, draw: 3.30, away: 3.00 },
    fairOdds: { home: 2.38, draw: 3.33, away: 3.57 },
    kellyStake: 0.8,
    recentForm: {
      home: ['W', 'D', 'W', 'L', 'W'],
      away: ['W', 'W', 'D', 'W', 'L']
    },
    h2h: { total: 10, homeWins: 4, draws: 3, awayWins: 3 }
  },
  {
    id: '8',
    homeTeam: 'Atletico Madrid',
    awayTeam: 'Sevilla',
    league: 'La Liga',
    kickoff: '19:00',
    status: 'upcoming',
    homeProb: 55,
    drawProb: 25,
    awayProb: 20,
    edge: 7.8,
    prediction: 'Home Win',
    confidence: 70,
    marketOdds: { home: 1.85, draw: 3.50, away: 4.50 },
    fairOdds: { home: 1.82, draw: 4.00, away: 5.00 },
    kellyStake: 2.1,
    recentForm: {
      home: ['W', 'W', 'D', 'W', 'W'],
      away: ['L', 'D', 'W', 'L', 'W']
    },
    h2h: { total: 10, homeWins: 6, draws: 2, awayWins: 2 }
  }
];

export const mockBets: Bet[] = [
  {
    id: '1',
    match: 'Man City vs Arsenal',
    selection: 'Man City Win',
    odds: 1.85,
    stake: 50,
    result: 'win',
    profit: 42.50,
    date: '2024-03-20'
  },
  {
    id: '2',
    match: 'Liverpool vs Chelsea',
    selection: 'Over 2.5 Goals',
    odds: 1.95,
    stake: 30,
    result: 'win',
    profit: 28.50,
    date: '2024-03-19'
  },
  {
    id: '3',
    match: 'Real Madrid vs Valencia',
    selection: 'Real Madrid Win',
    odds: 1.65,
    stake: 40,
    result: 'loss',
    profit: 0,
    date: '2024-03-18'
  },
  {
    id: '4',
    match: 'Bayern vs Leipzig',
    selection: 'Bayern Win',
    odds: 1.75,
    stake: 60,
    result: 'win',
    profit: 45.00,
    date: '2024-03-17'
  },
  {
    id: '5',
    match: 'Inter vs Roma',
    selection: 'Draw',
    odds: 3.40,
    stake: 25,
    result: 'pending',
    profit: 0,
    date: '2024-03-21'
  }
];

export const mockStats: Stats = {
  totalBets: 267,
  wins: 195,
  losses: 72,
  winRate: 73,
  roi: 24.3,
  totalProfit: 1240,
  avgEdge: 8.5,
  currentStreak: 5
};

export const bankrollData = [
  { date: 'Jan 1', value: 1000 },
  { date: 'Jan 8', value: 1080 },
  { date: 'Jan 15', value: 1150 },
  { date: 'Jan 22', value: 1120 },
  { date: 'Jan 29', value: 1250 },
  { date: 'Feb 5', value: 1320 },
  { date: 'Feb 12', value: 1280 },
  { date: 'Feb 19', value: 1410 },
  { date: 'Feb 26', value: 1480 },
  { date: 'Mar 5', value: 1560 },
  { date: 'Mar 12', value: 1620 },
  { date: 'Mar 19', value: 1780 },
  { date: 'Mar 21', value: 1850 },
];

export const aiReasoning = {
  '1': `Based on our comprehensive analysis, Manchester City holds a significant advantage in this fixture:

**Key Factors:**
• City has won 8 of their last 10 home games against top-6 opposition
• Liverpool's defensive injuries (Van Dijk doubtful) weaken their backline
• City's xG differential of +1.2 per game is the league's best
• Liverpool have conceded first in 4 of their last 5 away games

**Model Projections:**
• Poisson: 2.1 - 1.2 scoreline favoring City
• Elo ratings give City a 180-point home advantage
• xG data suggests City creates 2.8xG per home game vs Liverpool's 1.4xG away

**Value Assessment:**
Market odds of 2.10 imply 47.6% probability. Our models calculate true probability at 52%, creating a 8.5% edge.`,

  '2': `El Clasico always brings unpredictability, but the data favors Madrid at home:

**Key Factors:**
• Madrid unbeaten in last 12 home games (W10 D2)
• Barcelona's away form has dipped (2 losses in last 5)
• Bellingham's form adds 0.3xG per game to Madrid's attack
• Barcelona missing key midfielder Pedri

**Model Projections:**
• Poisson: 1.8 - 1.3 favoring Madrid
• Historical Clasico data: Home team wins 42% of the time
• Pressure index favors Madrid (lower title pressure)

**Value Assessment:**
Market odds of 2.40 vs fair odds of 2.22 creates a 6.2% edge.`,

  '3': `Bayern's dominance over Dortmund is well-documented and continues:

**Key Factors:**
• Bayern have won 7 of last 8 home meetings with Dortmund
• Dortmund's defensive record away: 1.8 goals conceded per game
• Kane's integration adds 0.4xG to Bayern's attack
• Dortmund playing midweek European game (fatigue factor)

**Model Projections:**
• Poisson: 2.5 - 1.1 scoreline
• Bayern's home xG: 2.9 | Dortmund's away xG conceded: 1.9
• Elo gap: 220 points in Bayern's favor

**Value Assessment:**
12.3% edge represents excellent value. Market underestimates Bayern's home dominance.`,
};
