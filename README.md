# MoneyTree

AI-powered personal finance dashboard built with Next.js, Tailwind CSS, Framer Motion, NextAuth.js, Firebase, Plaid, and OpenAI. Features animated pages, professional UI, dark/light mode, sidebar navigation, real account linking, AI advice, and data persistence.

## Features
- **Authentication**: Sign in with Google via NextAuth.js (cookies-based)
- **Dashboard**: Animated tree growth, stat cards, bills/subscriptions, AI coach, goal setting, spending charts, auto-pay scheduler, budget tracker, subscription, financial calculator
- **Account Linking**: Plaid sandbox integration for real transaction data
- **AI Advice**: Personalized financial suggestions using OpenAI GPT-3.5
- **Data Persistence**: Firestore for user data (goals, budgets, auto-pay); localStorage fallback
- **Email Notifications**: Send bill reminders and welcome emails via Gmail
- **Subscription**: Newsletter signup for updates
- **PWA Support**: Installable on mobile devices
- **Error Handling**: Error boundaries for graceful failures
- **Tabs**: Dashboard, Accounts, Invest, Insurance, Settings
- **UI/UX**: Responsive design, dark/light mode, toasts, animations
- **Free to Run**: Sandbox APIs, optional real keys

## Getting Started
1. Clone the repo
2. Install dependencies: `npm install`
3. Set up environment variables (see below)
4. Run the development server: `npm run dev`
5. Visit `http://localhost:3001` to view the app

## Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project or select an existing one.
3. Enable the Google+ API.
4. Go to "Credentials" > "Create Credentials" > "OAuth 2.0 Client IDs".
5. Set application type to "Web application".
6. Add authorized redirect URIs: `http://localhost:3001/api/auth/callback/google` (for dev) and your production URL.
7. Copy the Client ID and Client Secret to your `.env.local`:
   ```
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   ```

## Environment Variables
Create a `.env.local` file with:

```env
# Firebase (for auth and Firestore)
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Google OAuth (for sign-in)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Plaid (optional, uses sandbox by default)
PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret

# OpenAI (optional, uses mock by default)
OPENAI_API_KEY=your_openai_api_key

# Email (optional, for reminders)
GMAIL_USER=your_gmail@gmail.com
GMAIL_PASS=your_app_password
```

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Animations**: Framer Motion
- **Auth**: NextAuth.js with Google provider
- **Database**: Firebase Firestore
- **APIs**: Plaid (transactions), OpenAI (advice)
- **Charts**: Recharts
- **Icons**: Heroicons

## Deployment
Deploy for free on Vercel. Add env vars in Vercel dashboard.

### Vercel Setup
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and sign in with GitHub.
3. Click "New Project" and import your repo.
4. In project settings, add environment variables:
   - All the ones listed above (Firebase, Google, etc.)
5. Deploy! Your app will be live at `your-project.vercel.app`.

For custom domain, buy one from Namecheap and link it in Vercel.

## Addons Included
- Plaid Link for account linking
- OpenAI-powered AI advice
- Firestore data persistence
- Toast notifications
- Recurring transaction detection
- Responsive mobile/desktop UI

---

Built for the future of personal finance!
