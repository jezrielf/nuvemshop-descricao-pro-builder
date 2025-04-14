
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import AdminTemplates from "./pages/AdminTemplates";
import Plans from "./pages/Plans";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import NuvemshopCallback from "./components/nuvemshop/NuvemshopCallback";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Reduce retry count to avoid cycles
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  console.log("App component renderizado");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={
                <ProtectedRoute requireAuth={false}>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/auth" element={<Auth />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/success" element={<Success />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-templates" element={<AdminTemplates />} />
              <Route path="/admin-auth" element={<AdminAuth />} />
              <Route path="/nuvemshop/callback" element={<NuvemshopCallback />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
