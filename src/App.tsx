import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Navigation />
          <div className="pt-16 pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/record-match" element={<RecordMatch />} />
              <Route path="/verify-match/:matchId" element={<VerifyMatch />} />
              <Route path="/match/:matchId" element={<MatchDetails />} />
              <Route path="/find-players" element={<FindPlayers />} />
              <Route path="/rules" element={<Rules />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/profile-settings" element={<ProfileSettings />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;