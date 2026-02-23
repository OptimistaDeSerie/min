import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import Index from "./pages/Index";
import ObjectivesPage from "./pages/ObjectivesPage";
import ProgramsPage from "./pages/ProgramsPage";
import EventsPage from "./pages/EventsPage";
import PartnershipPage from "./pages/PartnershipPage";
import ContactPage from "./pages/ContactPage";
import EventDetail from "./pages/EventDetail";
import NotFound from "./pages/NotFound";
import TestAPIPage from "./pages/TestApiPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/objectives" element={<ObjectivesPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/partnership" element={<PartnershipPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/test-api" element={<TestAPIPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

