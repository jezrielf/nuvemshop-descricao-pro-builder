
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import AdminAuth from "./pages/AdminAuth";
import AdminTemplates from "./pages/AdminTemplates";
import Plans from "./pages/Plans";
import Success from "./pages/Success";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import NuvemshopConnect from "./pages/NuvemshopConnect";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import DescriptionsView from "./pages/DescriptionsView";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

const App = () => {
  console.log("App component renderizado");
  
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  <ProtectedRoute requireAuth={false}>
                    <Index />
                  </ProtectedRoute>
                } />
                <Route path="/auth" element={<Auth />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/success" element={<Success />} />
                <Route path="/admin" element={
                  <ProtectedRoute requireAuth={true} requiredRole="admin">
                    <Admin />
                  </ProtectedRoute>
                } />
                <Route path="/admin-templates" element={
                  <ProtectedRoute requireAuth={true} requiredRole="admin">
                    <AdminTemplates />
                  </ProtectedRoute>
                } />
                <Route path="/admin-auth" element={<AdminAuth />} />
                <Route path="/descriptions" element={
                  <ProtectedRoute requireAuth={true}>
                    <DescriptionsView />
                  </ProtectedRoute>
                } />
                <Route path="/nuvemshop-connect" element={<NuvemshopConnect />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
