
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { CategoryPage } from "./pages/CategoryPage";
import { NewArrivalsPage } from "./pages/NewArrivalsPage";
import { SalePage } from "./pages/SalePage";
import { NotFound } from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/sale" element={<SalePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
