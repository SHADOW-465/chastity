import { Routes, Route, Navigate } from 'react-router-dom';
import { SignIn, SignUp } from '@clerk/clerk-react';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import DashboardPage from './pages/Dashboard';
import DailyLogsPage from './pages/DailyLogs';
import ChallengesPage from './pages/Challenges';
import ProgressPage from './pages/Progress';
import SettingsPage from './pages/Settings';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route 
        path="/sign-in" 
        element={
          <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <SignIn 
              routing="path" 
              path="/sign-in"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-slate-900 border-slate-800",
                  headerTitle: "text-slate-100",
                  headerSubtitle: "text-slate-400",
                  socialButtonsBlockButton: "bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-700",
                  formButtonPrimary: "bg-emerald-600 hover:bg-emerald-500",
                  footerActionLink: "text-emerald-400 hover:text-emerald-300",
                  formFieldInput: "bg-slate-800 border-slate-700 text-slate-100",
                  formFieldLabel: "text-slate-300",
                  identityPreviewText: "text-slate-300",
                  formFieldSuccessText: "text-emerald-400",
                  formFieldErrorText: "text-red-400",
                }
              }}
            />
          </div>
        } 
      />
      <Route 
        path="/sign-up" 
        element={
          <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <SignUp 
              routing="path" 
              path="/sign-up"
              appearance={{
                elements: {
                  rootBox: "mx-auto",
                  card: "bg-slate-900 border-slate-800",
                  headerTitle: "text-slate-100",
                  headerSubtitle: "text-slate-400",
                  socialButtonsBlockButton: "bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-700",
                  formButtonPrimary: "bg-emerald-600 hover:bg-emerald-500",
                  footerActionLink: "text-emerald-400 hover:text-emerald-300",
                  formFieldInput: "bg-slate-800 border-slate-700 text-slate-100",
                  formFieldLabel: "text-slate-300",
                  identityPreviewText: "text-slate-300",
                  formFieldSuccessText: "text-emerald-400",
                  formFieldErrorText: "text-red-400",
                }
              }}
            />
          </div>
        } 
      />
      <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/logs" element={<ProtectedRoute><DailyLogsPage /></ProtectedRoute>} />
      <Route path="/challenges" element={<ProtectedRoute><ChallengesPage /></ProtectedRoute>} />
      <Route path="/progress" element={<ProtectedRoute><ProgressPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
