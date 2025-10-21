import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import { BrowserRouter } from 'react-router-dom';
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk';
import { Toaster } from 'sonner';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

// Extend Window interface for Clerk
declare global {
  interface Window {
    Clerk: unknown;
  }
}

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string;
const convexUrl = import.meta.env.VITE_CONVEX_URL as string;

if (!clerkPublishableKey) {
  throw new Error('VITE_CLERK_PUBLISHABLE_KEY is not set');
}

if (!convexUrl) {
  throw new Error('VITE_CONVEX_URL is not set');
}

const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ClerkProvider 
        publishableKey={clerkPublishableKey} 
        afterSignInUrl="/dashboard" 
        afterSignUpUrl="/onboarding"
      >
        <ConvexProviderWithClerk client={convex} useAuth={() => (window as { Clerk?: { auth: unknown } }).Clerk?.auth}>
          <BrowserRouter>
            <App />
            <Toaster theme="dark" />
          </BrowserRouter>
        </ConvexProviderWithClerk>
      </ClerkProvider>
    </ErrorBoundary>
  </StrictMode>
);
