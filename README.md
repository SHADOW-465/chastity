# DisciplineForge - Self-Discipline & Chastity Tracker

A production-grade web app built with Vite + React + TypeScript, Convex, and Clerk for tracking self-discipline via daily logging, challenges, achievements, and analytics. It supports two programs: **Solo Chastity** and **Keyholder Chastity**.

## 🎯 Overview

DisciplineForge is designed to help users build and maintain self-discipline through a gamified experience. It combines daily compliance tracking, challenge-based progression, and detailed analytics to create a comprehensive self-improvement platform.

### Core Philosophy
- **Structured Progress**: Break down self-discipline into manageable, trackable components
- **Gamification**: Use challenges, streaks, and achievements to maintain motivation
- **Personalization**: Two distinct programs tailored to different user needs
- **Privacy-First**: Secure, private tracking with optional keyholder controls

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Vite + React + TypeScript
- **Backend/DB**: Convex (queries, mutations, actions)
- **Authentication**: Clerk
- **UI**: Tailwind CSS + shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts

### Database Schema
The application uses Convex with the following main entities:
- **Users**: User profiles and program selection
- **Sessions**: Chastity session management (Keyholder program)
- **Keyholders**: Password-protected session controls
- **Challenges**: System and custom self-discipline challenges
- **UserChallenges**: User progress on specific challenges
- **DailyLogs**: Daily compliance and mood tracking
- **Statistics**: Cached performance metrics

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Convex account
- Clerk account

### Local Development (Vite + Convex + Clerk)

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd discipline-forge
   npm install
   ```

2. **Environment Setup**
   Create `.env.local` with:
   ```bash
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
   VITE_CONVEX_URL=https://<your>.convex.cloud
   ```
   In Convex dashboard add secret:
   - `CLERK_SECRET_KEY=sk_test_...`

3. **Convex Setup**
   ```bash
   npm run convex:dev
   # Follow prompts to link the project; keep this running
   ```

4. **Start Development Server**
```bash
npm run dev
   ```

5. **Access Application**
   Open `http://localhost:5173`

### Production Deployment

#### Environment Variables for Deployment

Create a `.env.production` file with the following variables:

```bash
# Client-side environment variables (Vite)
VITE_CLERK_PUBLISHABLE_KEY=pk_live_...
VITE_CONVEX_URL=https://your-deployment.convex.cloud

# Server-side environment variables (Convex Dashboard)
CLERK_SECRET_KEY=sk_live_...
```

#### Deployment Platforms

**Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

**Netlify**
1. Connect repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

**Railway/Render**
1. Connect repository
2. Set build command: `npm run build`
3. Set start command: `npm run preview`
4. Configure environment variables

#### Convex Deployment
1. Run `npx convex deploy` to deploy functions
2. Set production environment variables in Convex dashboard
3. Update `VITE_CONVEX_URL` with production URL

## 📱 Features

### Solo Program
- Personal challenge tracking
- Daily compliance logging
- Progress analytics
- Achievement system
- Streak monitoring

### Keyholder Program
- Session management with start/stop controls
- Password-protected keyholder access
- Advanced security features
- Session history tracking
- Enhanced monitoring capabilities

### Universal Features
- Daily mood and compliance tracking
- Challenge browsing and management
- Comprehensive progress analytics
- Responsive mobile-first design
- Dark theme interface

## 📁 Project Structure

```
discipline-forge/
├── src/                         # React source code
│   ├── components/              # Reusable UI components
│   │   ├── auth/               # Authentication components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── layout/             # Layout components
│   │   │   └── AppShell.tsx
│   │   ├── dashboard/          # Dashboard components
│   │   │   ├── SoloDashboard.tsx
│   │   │   └── KeyholderDashboard.tsx
│   │   ├── logs/               # Daily logging components
│   │   │   ├── DailyLogForm.tsx
│   │   │   └── DailyLogList.tsx
│   │   ├── challenges/         # Challenge components
│   │   │   ├── ChallengeList.tsx
│   │   │   └── RandomChallengeButton.tsx
│   │   └── stats/              # Statistics components
│   │       ├── StatsCards.tsx
│   │       ├── ComplianceChart.tsx
│   │       └── AchievementsGrid.tsx
│   ├── pages/                  # Page components
│   │   ├── Landing.tsx
│   │   ├── Onboarding.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DailyLogs.tsx
│   │   ├── Challenges.tsx
│   │   ├── Progress.tsx
│   │   └── Settings.tsx
│   ├── main.tsx                # React entry point
│   ├── App.tsx                 # Main app component
│   └── index.css               # Global styles
├── convex/                     # Convex backend
│   ├── _generated/             # Auto-generated files
│   ├── functions/              # Convex functions
│   │   ├── profiles.ts         # User profile management
│   │   ├── challenges.ts       # Challenge management
│   │   ├── userChallenges.ts   # User challenge progress
│   │   ├── dailyLogs.ts        # Daily logging functions
│   │   ├── achievements.ts     # Achievement system
│   │   ├── userAchievements.ts # User achievements
│   │   ├── statistics.ts       # Analytics functions
│   │   ├── sessions.ts         # Session management
│   │   ├── keyholders.ts       # Keyholder management
│   │   ├── tasks.ts            # Task management
│   │   ├── actions.ts          # Scheduled actions
│   │   └── seed.ts             # Seed data functions
│   ├── schema.ts               # Database schema
│   └── auth.config.js          # Clerk authentication config
├── public/                     # Static assets
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── .env.example                # Environment variables template
```

## 🔧 Configuration

### Environment Variables

#### Required Environment Variables

**Client-side (Vite)**
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_... # or pk_live_... for production
VITE_CONVEX_URL=https://your-deployment.convex.cloud
```

**Server-side (Convex Dashboard)**
```bash
CLERK_SECRET_KEY=sk_test_... # or sk_live_... for production
```

#### Environment Setup Steps

1. **Clerk Setup**
   - Create account at [clerk.com](https://clerk.com)
   - Create new application
   - Copy publishable key and secret key
   - Configure allowed origins for your domain

2. **Convex Setup**
   - Create account at [convex.dev](https://convex.dev)
   - Create new project
   - Run `npx convex dev` to link project
   - Copy deployment URL
   - Add `CLERK_SECRET_KEY` in Convex dashboard secrets

3. **Local Development**
   - Copy `.env.example` to `.env.local`
   - Fill in your environment variables
   - Run `npm run dev` to start development server

### Database Configuration
Convex schema is defined in `convex/schema.ts` with tables: `profiles`, `challenges`, `user_challenges`, `daily_logs`, `achievements`, `user_achievements`, `statistics`, `sessions`, `keyholders`, `tasks`.

### Authentication Setup
Clerk integration is configured in `convex/auth.config.js` and `src/main.tsx` (via `ClerkProvider` and `ConvexProviderWithClerk`).

## 🎨 Design System

### Color Palette
- **Primary**: Slate gray backgrounds (slate-800, slate-900)
- **Accent**: Emerald and teal (emerald-600, teal-600)
- **Text**: White and slate variations
- **Status**: Green (success), Yellow (warning), Red (error), Blue (info)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, accessible contrast

### Components
Built with shadcn/ui for consistency and accessibility:
- Buttons, Cards, Dialogs, Forms
- Inputs, Labels, Textareas
- Badges, Avatars, Progress indicators

## 📊 Data Flow

1. **User Authentication**: Clerk handles user creation and authentication
2. **Program Selection**: New users choose Solo or Keyholder program
3. **Daily Logging**: Users track compliance, mood, and journal entries
4. **Challenge Management**: Browse, start, and complete self-discipline challenges
5. **Progress Tracking**: Real-time statistics and analytics
6. **Session Management**: Keyholder users can manage chastity sessions

## 🔒 Security

- **Authentication**: Clerk provides secure user management
- **Authorization**: Convex handles data access control
- **Password Protection**: Keyholder sessions require password verification
- **Data Privacy**: All user data is encrypted and secure

## 🚀 Performance

- **Real-time Updates**: Convex provides instant data synchronization
- **Optimistic UI**: Immediate feedback for user actions
- **Caching**: Statistics are cached for better performance
- **Responsive**: Mobile-first design with optimal loading

## 📈 Analytics

The application tracks:
- Daily compliance ratings (1-5 scale)
- Mood patterns (Great, Okay, Difficult)
- Challenge completion rates
- Streak tracking and history
- Session duration and goals
- Progress trends over time

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the [FEATURES.md](./FEATURES.md) for detailed feature documentation
- Review [ENVIRONMENT.md](./ENVIRONMENT.md) for setup issues
- See [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help

---

**DisciplineForge** - Building self-discipline through structured progress tracking and gamified challenges.