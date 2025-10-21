import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider, useAuth } from '@clerk/clerk-react'; // Import useAuth
import { BrowserRouter } from 'react-router-dom';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { Toaster } from 'sonner';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
const convexUrl = import.meta.env.VITE_CONVEX_URL as string;

if (!clerkPublishableKey) {
  throw new Error('VITE_CLERK_PUBLISHABLE_KEY is not set in .env.local');
}

if (!convexUrl) {
  throw new Error('VITE_CONVEX_URL is not set in .env.local');
}

const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ClerkProvider 
          publishableKey={clerkPublishableKey}
          // Use modern redirect props
          signInFallbackRedirectUrl="/dashboard"
          signUpFallbackRedirectUrl="/onboarding"
        >
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <App />
            <Toaster theme="dark" />
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
