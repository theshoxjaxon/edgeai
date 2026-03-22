// ============================================================================
// Configuration File for Football Betting SaaS
// ============================================================================
// AI-powered football predictions platform with premium subscriptions

// Hero Section Configuration
export interface HeroConfig {
  subtitle: string;
  titleLine1: string;
  titleLine2: string;
  tagline: string;
  badgeText: string;
  ctaPrimary: string;
  ctaSecondary: string;
  heroImage: string;
  floatingImages: [string, string];
}

export const heroConfig: HeroConfig = {
  subtitle: "AI-Powered Football Predictions",
  titleLine1: "BEAT THE",
  titleLine2: "MARKET",
  tagline: "Machine Learning · Value Detection · Kelly Staking",
  badgeText: "73% Win Rate on Value Bets",
  ctaPrimary: "Start Free Trial",
  ctaSecondary: "View Predictions",
  heroImage: "images/hero_football.jpg",
  floatingImages: ["images/football_1.png", "images/football_2.png"],
};

// Features Section Configuration (formerly Story)
export interface FeatureStatConfig {
  value: string;
  label: string;
}

export interface FeatureConfig {
  label: string;
  heading: string[];
  headingAccent: string;
  paragraphs: string[];
  stats: FeatureStatConfig[];
  featuresImage: string;
}

export const featuresConfig: FeatureConfig = {
  label: "Why Choose Us",
  heading: ["AI That Predicts", "Football Outcomes"],
  headingAccent: "With Precision",
  paragraphs: [
    "Our advanced machine learning models analyze millions of data points including team form, player injuries, historical matchups, and market odds to identify value bets that beat the bookmakers.",
    "Using Poisson distributions, Elo ratings, expected goals (xG), and real-time injury data, we calculate true probabilities and compare them against market odds to find edges.",
    "The Kelly Criterion staking strategy maximizes your bankroll growth while minimizing risk. Track every bet, monitor ROI, and watch your profits grow with detailed analytics."
  ],
  stats: [
    { value: "73%", label: "Win Rate" },
    { value: "+24%", label: "Average ROI" },
    { value: "50K+", label: "Active Users" },
    { value: "12M+", label: "Predictions Made" }
  ],
  featuresImage: "images/features_ai.jpg",
};

// Pricing Section Configuration (formerly Product)
export interface PricingConfig {
  label: string;
  heading: string[];
  headingAccent: string;
  description: string;
  plans: PricingPlanConfig[];
}

export interface PricingPlanConfig {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  features: string[];
  ctaText: string;
  highlighted: boolean;
  badge?: string;
}

export const pricingConfig: PricingConfig = {
  label: "Pricing Plans",
  heading: ["Choose Your"],
  headingAccent: "Winning Plan",
  description: "Start with our free tier and upgrade to unlock the full power of AI-driven betting predictions.",
  plans: [
    {
      id: "free",
      name: "Free",
      description: "Perfect for getting started",
      price: "$0",
      period: "/month",
      features: [
        "5 predictions per day",
        "Basic match analysis",
        "Limited league coverage",
        "Community support",
        "Email notifications"
      ],
      ctaText: "Get Started",
      highlighted: false
    },
    {
      id: "pro",
      name: "Pro",
      description: "For serious bettors",
      price: "$49",
      period: "/month",
      features: [
        "Unlimited predictions",
        "Full AI analysis & edges",
        "All leagues worldwide",
        "Kelly stake recommendations",
        "Bet tracking & analytics",
        "Email & SMS alerts",
        "Export to CSV",
        "Priority support"
      ],
      ctaText: "Start Pro Trial",
      highlighted: true,
      badge: "Most Popular"
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For professional traders",
      price: "$199",
      period: "/month",
      features: [
        "Everything in Pro",
        "API access",
        "Custom models",
        "White-label options",
        "Dedicated account manager",
        "SLA guarantee",
        "Team collaboration"
      ],
      ctaText: "Contact Sales",
      highlighted: false
    }
  ]
};

// Live Predictions Preview Section (formerly Explore)
export interface PredictionPreviewConfig {
  id: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  kickoff: string;
  homeProb: number;
  drawProb: number;
  awayProb: number;
  edge: number;
  recommendation: string;
}

export interface PredictionsPreviewConfig {
  label: string;
  heading: string[];
  headingAccent: string;
  description: string;
  hint: string;
  predictions: PredictionPreviewConfig[];
}

export const predictionsPreviewConfig: PredictionsPreviewConfig = {
  label: "Live Predictions",
  heading: ["Today's"],
  headingAccent: "Value Bets",
  description: "Our AI has analyzed today's matches and identified the best value opportunities. Click on any match to see detailed predictions.",
  hint: "Click matches to view full analysis",
  predictions: [
    {
      id: "1",
      homeTeam: "Manchester City",
      awayTeam: "Liverpool",
      league: "Premier League",
      kickoff: "Today 20:00",
      homeProb: 52,
      drawProb: 26,
      awayProb: 22,
      edge: 8.5,
      recommendation: "Home Win"
    },
    {
      id: "2",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      league: "La Liga",
      kickoff: "Today 21:00",
      homeProb: 45,
      drawProb: 28,
      awayProb: 27,
      edge: 6.2,
      recommendation: "Home Win"
    },
    {
      id: "3",
      homeTeam: "Bayern Munich",
      awayTeam: "Dortmund",
      league: "Bundesliga",
      kickoff: "Tomorrow 18:30",
      homeProb: 58,
      drawProb: 24,
      awayProb: 18,
      edge: 12.3,
      recommendation: "Home Win"
    },
    {
      id: "4",
      homeTeam: "Inter Milan",
      awayTeam: "Juventus",
      league: "Serie A",
      kickoff: "Tomorrow 20:45",
      homeProb: 38,
      drawProb: 32,
      awayProb: 30,
      edge: 4.8,
      recommendation: "Draw"
    }
  ]
};

// Performance/Stats Section Configuration (formerly Tasting)
export interface StatCardConfig {
  iconType: "trending" | "target" | "shield" | "zap";
  title: string;
  description: string;
  metrics: string[];
}

export interface PerformanceConfig {
  label: string;
  heading: string[];
  headingAccent: string;
  description: string;
  statCards: StatCardConfig[];
  chartData: {
    title: string;
    description: string;
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      color: string;
    }[];
  };
}

export const performanceConfig: PerformanceConfig = {
  label: "Performance",
  heading: ["Track Your"],
  headingAccent: "Success",
  description: "Monitor your betting performance with detailed analytics. See your win rate, ROI, and bankroll growth over time.",
  statCards: [
    {
      iconType: "trending",
      title: "Win Rate",
      description: "Our predictions maintain a consistent 73% win rate on value bets with edges above 5%.",
      metrics: ["73% Win Rate", "+156 units YTD"]
    },
    {
      iconType: "target",
      title: "ROI",
      description: "Average return on investment of 24% across all recommended bets using Kelly staking.",
      metrics: ["24% Average ROI", "Compound Growth"]
    },
    {
      iconType: "shield",
      title: "Bankroll Protection",
      description: "Kelly Criterion ensures optimal stake sizing to maximize growth while protecting your bankroll.",
      metrics: ["Risk Management", "Max 5% Stake"]
    },
    {
      iconType: "zap",
      title: "Edge Detection",
      description: "Our AI identifies value by comparing true probabilities against market odds in real-time.",
      metrics: ["Real-time Analysis", "500+ Bookmakers"]
    }
  ],
  chartData: {
    title: "Bankroll Growth",
    description: "Simulated growth using Kelly staking over 6 months",
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Bankroll",
        data: [1000, 1180, 1350, 1620, 1890, 2240],
        color: "#CCFF00"
      },
      {
        label: "Bets Placed",
        data: [0, 45, 92, 148, 201, 267],
        color: "#00F5FF"
      }
    ]
  }
};

// Testimonials Section
export interface TestimonialConfig {
  id: string;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

export interface TestimonialsConfig {
  label: string;
  heading: string[];
  headingAccent: string;
  description: string;
  testimonials: TestimonialConfig[];
}

export const testimonialsConfig: TestimonialsConfig = {
  label: "Testimonials",
  heading: ["What Our"],
  headingAccent: "Users Say",
  description: "Join thousands of successful bettors who have transformed their betting strategy with our AI predictions.",
  testimonials: [
    {
      id: "1",
      name: "Michael Chen",
      role: "Professional Bettor",
      avatar: "images/avatar_1.jpg",
      content: "I've tried many prediction services, but this is the only one that consistently delivers. The Kelly staking recommendations alone have doubled my bankroll in 3 months.",
      rating: 5
    },
    {
      id: "2",
      name: "Sarah Williams",
      role: "Sports Enthusiast",
      avatar: "images/avatar_2.jpg",
      content: "The edge detection is incredible. I can see exactly where the value is and why. The detailed analysis helps me understand each bet before placing it.",
      rating: 5
    },
    {
      id: "3",
      name: "James Rodriguez",
      role: "Data Analyst",
      avatar: "images/avatar_3.jpg",
      content: "As someone who works with data, I appreciate the transparency. The models are well-documented and the results speak for themselves. 24% ROI is no joke.",
      rating: 5
    }
  ]
};

// Footer Section Configuration
export interface FooterConfig {
  brandName: string;
  brandTagline: string;
  brandDescription: string;
  socialLinks: Array<{
    platform: "twitter" | "facebook" | "instagram" | "youtube";
    href: string;
  }>;
  navSectionTitle: string;
  navLinks: Array<{ label: string; href: string }>;
  contactSectionTitle: string;
  contactAddress: string;
  contactPhone: string;
  contactEmail: string;
  newsletterTitle: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  copyright: string;
  policyLinks: Array<{ label: string; href: string }>;
}

export const footerConfig: FooterConfig = {
  brandName: "BETWISE AI",
  brandTagline: "Beat the Bookmakers",
  brandDescription: "AI-powered football predictions that give you the edge. Join thousands of successful bettors today.",
  socialLinks: [
    { platform: "twitter", href: "https://twitter.com" },
    { platform: "facebook", href: "https://facebook.com" },
    { platform: "instagram", href: "https://instagram.com" },
    { platform: "youtube", href: "https://youtube.com" }
  ],
  navSectionTitle: "Quick Links",
  navLinks: [
    { label: "Dashboard", href: "#/dashboard" },
    { label: "Predictions", href: "#/predictions" },
    { label: "Bet Tracking", href: "#/bets" },
    { label: "Pricing", href: "#/pricing" },
    { label: "Profile", href: "#/profile" }
  ],
  contactSectionTitle: "Contact Us",
  contactAddress: "123 Betting Street\nLondon, EC1A 1BB",
  contactPhone: "+44 20 7123 4567",
  contactEmail: "support@betwise.ai",
  newsletterTitle: "Get Winning Tips",
  newsletterDescription: "Subscribe to receive daily value bet alerts and exclusive offers.",
  newsletterPlaceholder: "Enter your email",
  newsletterButton: "Subscribe",
  copyright: "© 2024 EdgeAI. All rights reserved.",
  policyLinks: [
    { label: "Privacy Policy", href: "#/privacy" },
    { label: "Terms of Service", href: "#/terms" },
    { label: "Responsible Gambling", href: "#/responsible" }
  ]
};

// Site Metadata
export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "EdgeAI - Football Betting Predictions",
  description: "AI-powered football predictions with value detection, Kelly staking, and performance tracking. Beat the bookmakers with machine learning.",
  language: "en"
};

// Navigation Configuration
export interface NavConfig {
  logo: string;
  links: Array<{ label: string; href: string; protected?: boolean }>;
  ctaText: string;
  ctaHref: string;
}

export const navConfig: NavConfig = {
  logo: "EdgeAI",
  links: [
    { label: "Home", href: "#/" },
    { label: "Dashboard", href: "#/dashboard", protected: true },
    { label: "Predictions", href: "#/predictions", protected: true },
    { label: "Pricing", href: "#/pricing" }
  ],
  ctaText: "Get Started",
  ctaHref: "#/dashboard"
};
