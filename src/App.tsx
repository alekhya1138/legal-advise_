
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VictimDashboard from "./pages/dashboard/VictimDashboard";
import InternDashboard from "./pages/dashboard/InternDashboard";
import LawyerDashboard from "./pages/dashboard/LawyerDashboard";
import CaseDetails from "./pages/dashboard/CaseDetails";
import ProfileView from "./pages/dashboard/ProfileView";
import Chat from "./pages/dashboard/Chat";
import LawyerDirectory from "./pages/directory/LawyerDirectory";
import Messages from "./pages/dashboard/Messages";
import Settings from "./pages/dashboard/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard" element={<VictimDashboard />} />
          <Route path="/dashboard/intern" element={<InternDashboard />} />
          <Route path="/dashboard/lawyer" element={<LawyerDashboard />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          
          {/* Case related routes */}
          <Route path="/dashboard/cases/:caseId" element={<CaseDetails />} />
          
          {/* Profile related routes */}
          <Route path="/profile/:userId" element={<ProfileView />} />
          
          {/* Chat functionality */}
          <Route path="/chat/:userId" element={<Chat />} />
          
          {/* Lawyer directory */}
          <Route path="/directory" element={<LawyerDirectory />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
