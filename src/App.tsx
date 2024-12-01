import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "./components/layout/Navigation";
import "./i18n";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import RecordMatch from "./pages/RecordMatch";
import VerifyMatch from "./pages/VerifyMatch";
import FindPlayers from "./pages/FindPlayers";
import Rules from "./pages/Rules";
import Connections from "./pages/Connections";
import ProfileSettings from "./pages/ProfileSettings";
import Legal from "./pages/Legal";
import Leaderboard from "./pages/Leaderboard";
import MatchDetails from "./pages/MatchDetails";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <div className="min-h-screen bg-background font-sans">
            <Toaster />
            <Sonner />
            <Navigation />
            <div className="pt-16 pb-16 md:pb-0">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/onboarding" element={
                  <ProtectedRoute>
                    <Onboarding />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <Messages />
                  </ProtectedRoute>
                } />
                <Route path="/notifications" element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                } />
                <Route path="/record-match" element={
                  <ProtectedRoute>
                    <RecordMatch />
                  </ProtectedRoute>
                } />
                <Route path="/verify-match/:matchId" element={
                  <ProtectedRoute>
                    <VerifyMatch />
                  </ProtectedRoute>
                } />
                <Route path="/match/:matchId" element={
                  <ProtectedRoute>
                    <MatchDetails />
                  </ProtectedRoute>
                } />
                <Route path="/find-players" element={
                  <ProtectedRoute>
                    <FindPlayers />
                  </ProtectedRoute>
                } />
                <Route path="/rules" element={<Rules />} />
                <Route path="/connections" element={
                  <ProtectedRoute>
                    <Connections />
                  </ProtectedRoute>
                } />
                <Route path="/profile-settings" element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                } />
                <Route path="/legal" element={<Legal />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
              </Routes>
            </div>
          </div>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;