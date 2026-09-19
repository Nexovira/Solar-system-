import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import QuoteModal from './components/QuoteModal';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutContactPage from './pages/AboutContactPage';
import { SolarEstimate } from './components/SolarAssistant';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'about' | 'contact'>('home');
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState<string>('Solar System Installation');
  const [activeEstimate, setActiveEstimate] = useState<SolarEstimate | null>(null);

  // Handle navigation
  const handleNavigate = (page: 'home' | 'services' | 'about' | 'contact') => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If clicking contact directly, scroll to contact form on about/contact page
    if (page === 'contact') {
      setTimeout(() => {
        const el = document.getElementById('contact-form');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleOpenQuoteModal = (serviceName?: string) => {
    if (serviceName) {
      setSelectedServiceForQuote(serviceName);
    }
    setQuoteModalOpen(true);
  };

  const handleSelectEstimateForQuote = (estimate: SolarEstimate, userInput: any) => {
    setActiveEstimate(estimate);
    setSelectedServiceForQuote(estimate.systemTier);
    // Navigate directly to contact page with pre-filled estimate
    setCurrentPage('contact');
    setTimeout(() => {
      const el = document.getElementById('contact-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF8] text-[#16201A]">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Main Page Routing */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenQuoteModal={() => handleOpenQuoteModal()}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenQuoteModal={handleOpenQuoteModal}
            onSelectEstimateForQuote={handleSelectEstimateForQuote}
          />
        )}

        {(currentPage === 'about' || currentPage === 'contact') && (
          <AboutContactPage attachedEstimate={activeEstimate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenQuoteModal={() => handleOpenQuoteModal()}
      />

      {/* Global Quote Request Modal */}
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        initialService={selectedServiceForQuote}
        attachedEstimate={activeEstimate}
      />
    </div>
  );
}
