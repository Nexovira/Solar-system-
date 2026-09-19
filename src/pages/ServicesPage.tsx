import {
  Sun,
  Cpu,
  BatteryCharging,
  Wrench,
  ShieldCheck,
  Compass,
  ArrowRight,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  HelpCircle,
  Zap
} from 'lucide-react';
import { siteContent, ServiceItem } from '../content/siteContent';
import SolarAssistant, { SolarEstimate } from '../components/SolarAssistant';

interface ServicesPageProps {
  onOpenQuoteModal: (serviceName?: string) => void;
  onSelectEstimateForQuote: (estimate: SolarEstimate, userInput: any) => void;
}

export default function ServicesPage({
  onOpenQuoteModal,
  onSelectEstimateForQuote,
}: ServicesPageProps) {
  // Map icon names to Lucide icons
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="w-6 h-6 text-[#E5A93C]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#E5A93C]" />;
      case 'BatteryCharging':
        return <BatteryCharging className="w-6 h-6 text-[#E5A93C]" />;
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-[#E5A93C]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#E5A93C]" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#E5A93C]" />;
      default:
        return <Zap className="w-6 h-6 text-[#E5A93C]" />;
    }
  };

  return (
    <div className="w-full bg-[#F8FAF8]">
      {/* 1. HERO SECTION */}
      <section className="bg-[#09251C] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-[#144233]">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#164D3B]/70 border border-[#236852] text-[#E5A93C] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C]"></span>
            Hybrid Solar &bull; Comprehensive Services
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-heading max-w-4xl mx-auto leading-tight">
            {siteContent.servicesPage.headline}
          </h1>

          <p className="mt-5 text-base sm:text-xl text-[#CBD5CE] max-w-2xl mx-auto leading-relaxed">
            {siteContent.servicesPage.supportingText}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-[#E2E8E3]">
            <a
              href="#solar-assistant"
              className="px-4 py-2 rounded-lg bg-[#E5A93C] text-[#09251C] font-bold hover:bg-[#D99426] transition-colors"
            >
              Try System Sizing Assistant &darr;
            </a>
            <a
              href="#all-services"
              className="px-4 py-2 rounded-lg bg-[#144233] text-white hover:bg-[#1A4D3B] transition-colors"
            >
              Browse All 6 Services &darr;
            </a>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE SOLAR SYSTEM ASSISTANT (Visually integrated into Services Page) */}
      <SolarAssistant onSelectForQuote={onSelectEstimateForQuote} />

      {/* 3. SIX SERVICE SECTIONS */}
      <section id="all-services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E2E8E3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#0F392B] uppercase tracking-wider mb-2 block">
              Our Service Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16201A] font-heading tracking-tight">
              Practical Power Solutions For Every Requirement
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#526356]">
              From individual components to turnkey installations, we configure systems suited to local grid challenges.
            </p>
          </div>

          {/* Grid of 6 Services */}
          <div className="space-y-16">
            {siteContent.servicesList.map((service, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 rounded-2xl border border-[#E2E8E3] bg-[#F8FAF8] hover:border-[#CBD5CE] transition-all`}
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="rounded-xl overflow-hidden border border-[#E2E8E3] shadow-sm relative group">
                      <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="w-full h-64 sm:h-80 object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#0F392B]/90 backdrop-blur-xs text-white text-xs font-bold flex items-center gap-1.5">
                        {renderIcon(service.iconName)}
                        <span>{service.specsLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Text Column */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    } space-y-5`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#0F392B] flex items-center justify-center shrink-0">
                        {renderIcon(service.iconName)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#526356] uppercase tracking-wider block">
                          Service 0{index + 1}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#16201A] font-heading">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-[#2C382F] font-semibold leading-snug">
                      {service.shortDescription}
                    </p>

                    <p className="text-sm text-[#526356] leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Features list */}
                    <div className="pt-2">
                      <div className="text-xs font-bold text-[#16201A] uppercase tracking-wider mb-2.5">
                        Key Specifications:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {service.keyFeatures.map((feat, fIdx) => (
                          <div
                            key={fIdx}
                            className="flex items-start gap-2 text-xs sm:text-sm text-[#3C4A40]"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#0F392B] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA for this service */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onOpenQuoteModal(service.title)}
                        className="px-5 py-2.5 rounded-xl bg-[#0F392B] hover:bg-[#164D3B] text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
                      >
                        <span>Inquire About {service.title}</span>
                        <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
                      </button>

                      <a
                        href={`https://wa.me/${siteContent.contact.whatsappRaw}?text=${encodeURIComponent(
                          `Hello Hybrid Solar, I would like to inquire about your ${service.title} services.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl border border-[#CBD5CE] bg-white hover:bg-[#F8FAF8] text-[#16201A] font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
                      >
                        <MessageCircle className="w-4 h-4 text-[#25D366]" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Primary Section CTA: Talk to Hybrid Solar */}
          <div className="mt-16 text-center bg-[#0F392B] rounded-2xl p-8 sm:p-12 text-white shadow-lg">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading mb-3">
              Ready to Upgrade Your Power Infrastructure?
            </h3>
            <p className="text-sm sm:text-base text-[#CBD5CE] max-w-xl mx-auto mb-8">
              Speak directly with our technical advisors to evaluate your building requirements and receive a clean, transparent proposal.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenQuoteModal()}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E5A93C] hover:bg-[#D99426] text-[#09251C] font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Talk to Hybrid Solar</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={`tel:${siteContent.contact.phoneRaw}`}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#144233] hover:bg-[#1A4D3B] text-white border border-[#236852] font-semibold text-base flex items-center justify-center gap-2 transition-all"
              >
                <PhoneCall className="w-5 h-5 text-[#E5A93C]" />
                <span>Call {siteContent.contact.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS (Simple 3-step process) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F0F4F1] border-b border-[#E2E8E3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#0F392B] uppercase tracking-wider mb-2 block">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16201A] font-heading tracking-tight">
              HOW IT WORKS
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#526356]">
              A straightforward three-step engagement from initial audit to final switch-on.
            </p>
          </div>

          {/* 3 Step Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {siteContent.howItWorks.map((step, idx) => (
              <div
                key={step.step}
                className="bg-white rounded-2xl border border-[#CBD5CE] p-8 shadow-xs hover:border-[#0F392B] transition-all relative flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-lg bg-[#0F392B] text-[#E5A93C] font-mono font-bold text-sm tracking-wider mb-5">
                    {step.step}
                  </div>

                  <h3 className="text-2xl font-black text-[#16201A] font-heading tracking-wide mb-2">
                    {step.title}
                  </h3>

                  <p className="text-base font-bold text-[#0F392B] mb-3">
                    {step.description}
                  </p>

                  <p className="text-sm text-[#526356] leading-relaxed">
                    {step.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0F4F1] text-xs font-semibold text-[#8FA193]">
                  Step 0{idx + 1} of 03
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
