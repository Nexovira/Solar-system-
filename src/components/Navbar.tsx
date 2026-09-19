import { useState } from 'react';
import { Menu, X, Phone, MessageCircle, ArrowRight, SunMedium } from 'lucide-react';
import { siteContent } from '../content/siteContent';

interface NavbarProps {
  currentPage: 'home' | 'services' | 'about' | 'contact';
  onNavigate: (page: 'home' | 'services' | 'about' | 'contact') => void;
  onOpenQuoteModal: () => void;
}

export default function Navbar({ currentPage, onNavigate, onOpenQuoteModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: 'home' | 'services' | 'about' | 'contact') => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F392B] text-white border-b border-[#1A4D3B] shadow-sm">
      {/* Quick utility bar on top */}
      <div className="hidden md:block bg-[#09251C] text-xs text-[#CBD5CE] border-b border-[#144233] px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-[#E5A93C] font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse"></span>
              Lagos, Nigeria &bull; Clean Power Installations
            </span>
            <span className="text-[#8FA193]">
              {siteContent.contact.workingHours}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${siteContent.contact.phoneRaw}`}
              className="hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Phone className="w-3 h-3 text-[#E5A93C]" />
              <span>Call: {siteContent.contact.phoneDisplay}</span>
            </a>
            <span className="text-[#1A4D3B]">|</span>
            <a
              href={`https://wa.me/${siteContent.contact.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#25D366] hover:text-[#42E07E] flex items-center gap-1.5 font-medium transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp: {siteContent.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none cursor-pointer"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#E5A93C] to-[#D99426] p-0.5 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0F392B] rounded-[10px] flex items-center justify-center">
                <SunMedium className="w-6 h-6 text-[#E5A93C]" />
              </div>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-heading block leading-none">
                {siteContent.companyName}
              </span>
              <span className="text-[10px] sm:text-xs text-[#CBD5CE] tracking-wider uppercase font-medium mt-0.5 block">
                {siteContent.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {siteContent.navigation.map(item => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.page)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#E5A93C] bg-[#164D3B]/60'
                      : 'text-[#E2E8E3] hover:text-white hover:bg-[#164D3B]/30'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Primary CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 rounded-xl bg-[#E5A93C] hover:bg-[#D99426] text-[#09251C] font-bold text-sm tracking-wide flex items-center gap-2 shadow-sm transition-all hover:shadow-md active:scale-98 cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenQuoteModal}
              className="px-3 py-1.5 rounded-lg bg-[#E5A93C] text-[#09251C] font-bold text-xs"
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#CBD5CE] hover:text-white hover:bg-[#164D3B] transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09251C] border-b border-[#1A4D3B] px-4 pt-2 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="space-y-1">
            {siteContent.navigation.map(item => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-[#0F392B] text-[#E5A93C]'
                      : 'text-[#E2E8E3] hover:bg-[#144233]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#E5A93C]"></span>}
                </button>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#144233] space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuoteModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#E5A93C] text-[#09251C] font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`https://wa.me/${siteContent.contact.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {siteContent.contact.whatsappDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
