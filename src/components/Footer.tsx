import { SunMedium, Phone, Mail, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import { siteContent } from '../content/siteContent';

interface FooterProps {
  onNavigate: (page: 'home' | 'services' | 'about' | 'contact') => void;
  onOpenQuoteModal: () => void;
}

export default function Footer({ onNavigate, onOpenQuoteModal }: FooterProps) {
  const handleNav = (page: 'home' | 'services' | 'about' | 'contact') => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#09251C] text-white border-t border-[#144233] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1A4D3B]">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E5A93C] flex items-center justify-center text-[#09251C] shadow-sm">
                <SunMedium className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-wider text-white font-heading">
                {siteContent.companyName}
              </span>
            </div>

            <p className="text-[#E5A93C] text-base font-semibold">
              {siteContent.tagline}
            </p>

            <p className="text-sm text-[#CBD5CE] leading-relaxed max-w-sm">
              Providing practical, dependable solar equipment, inverter systems, and clean installation services for residential and commercial power reliability across Nigeria.
            </p>

            {/* WhatsApp Quick Pill */}
            <div className="pt-2">
              <a
                href={`https://wa.me/${siteContent.contact.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp ({siteContent.contact.whatsappDisplay})</span>
              </a>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E5A93C]">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#CBD5CE]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Sizing Assistant
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Hybrid Solar
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact & Location
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenQuoteModal}
                  className="text-[#E5A93C] font-semibold hover:underline cursor-pointer"
                >
                  Request a Formal Quote &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Offerings list */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E5A93C]">
              Our Solutions
            </h4>
            <ul className="space-y-2 text-xs text-[#CBD5CE]">
              <li>Solar Panel Sales</li>
              <li>Inverter Systems</li>
              <li>Battery Storage</li>
              <li>Solar Installation</li>
              <li>System Maintenance</li>
              <li>Energy Consultation</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#E5A93C]">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-[#CBD5CE]">
              <a
                href={`tel:${siteContent.contact.phoneRaw}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <span>{siteContent.contact.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${siteContent.contact.email}`}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <span>{siteContent.contact.email}</span>
              </a>

              <div className="flex items-center gap-2.5 text-[#CBD5CE]">
                <MapPin className="w-4 h-4 text-[#E5A93C] shrink-0" />
                <span>{siteContent.contact.location}</span>
              </div>

              <div className="pt-2 text-xs text-[#8FA193]">
                <div className="flex items-center gap-1.5 text-white font-medium mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E5A93C]" />
                  Standard Electrical Workmanship
                </div>
                Pure Sine Wave &bull; LiFePO4 Chemistry &bull; Surge Isolation
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8FA193]">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="font-semibold text-white">{siteContent.companyName}</span>
            <span>{siteContent.tagline}</span>
            <span>{siteContent.contact.location}</span>
          </div>

          <div className="text-center md:text-right">
            &copy; 2026 Hybrid Solar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
