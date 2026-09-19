import {
  ArrowRight,
  ChevronDown,
  Sun,
  Wrench,
  BatteryCharging,
  ShieldCheck,
  Zap,
  Leaf,
  CheckCircle,
  Building2,
  Home,
  MessageCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { siteContent } from '../content/siteContent';

interface HomePageProps {
  onNavigate: (page: 'home' | 'services' | 'about' | 'contact') => void;
  onOpenQuoteModal: () => void;
}

export default function HomePage({ onNavigate, onOpenQuoteModal }: HomePageProps) {
  const scrollToNextSection = () => {
    const el = document.getElementById('home-intro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full bg-[#F8FAF8]">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#09251C]">
        {/* Large professional solar-energy image background with subtle contrast gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={siteContent.hero.heroImage}
            alt="Professional solar panel installation"
            className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09251C] via-[#09251C]/85 to-[#09251C]/60"></div>
          <div className="absolute inset-0 bg-radial-[at_top_right] from-transparent via-[#09251C]/40 to-[#09251C]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
          {/* Subtle location & domain pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#164D3B]/70 border border-[#236852] text-[#E5A93C] text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-[#E5A93C] animate-pulse"></span>
            Reliable Power. Smarter Energy. &bull; Lagos, Nigeria
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] font-heading max-w-4xl">
            {siteContent.hero.headline}
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-xl text-[#CBD5CE] max-w-2xl leading-relaxed font-normal">
            {siteContent.hero.supportingText}
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onOpenQuoteModal}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#E5A93C] hover:bg-[#D99426] text-[#09251C] font-extrabold text-base tracking-wide flex items-center justify-center gap-2.5 shadow-lg hover:shadow-xl transition-all active:scale-98 cursor-pointer"
            >
              <span>{siteContent.hero.primaryCta}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#144233]/80 hover:bg-[#144233] text-white border border-[#236852] font-semibold text-base flex items-center justify-center gap-2 backdrop-blur-xs transition-all cursor-pointer"
            >
              <span>{siteContent.hero.secondaryCta}</span>
            </button>
          </div>

          {/* Quick trust metrics */}
          <div className="mt-14 pt-8 border-t border-[#164D3B]/80 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-left w-full max-w-3xl">
            <div>
              <div className="text-[#E5A93C] font-bold text-sm">Tier-1 Solar</div>
              <div className="text-xs text-[#CBD5CE]">High-efficiency mono panels</div>
            </div>
            <div>
              <div className="text-[#E5A93C] font-bold text-sm">LiFePO4 Storage</div>
              <div className="text-xs text-[#CBD5CE]">Safe lithium battery chemistry</div>
            </div>
            <div>
              <div className="text-[#E5A93C] font-bold text-sm">Pure Sine Wave</div>
              <div className="text-xs text-[#CBD5CE]">Zero electronics interference</div>
            </div>
            <div>
              <div className="text-[#E5A93C] font-bold text-sm">Lagos & Nationwide</div>
              <div className="text-xs text-[#CBD5CE]">Professional site setup</div>
            </div>
          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <button
            onClick={scrollToNextSection}
            className="flex flex-col items-center text-[#8FA193] hover:text-[#E5A93C] transition-colors group cursor-pointer focus:outline-none"
            aria-label="Scroll down to introduction"
          >
            <span className="text-[11px] font-semibold uppercase tracking-widest mb-1 group-hover:text-[#E5A93C]">
              Scroll to explore
            </span>
            <div className="w-8 h-8 rounded-full border border-[#236852] flex items-center justify-center group-hover:border-[#E5A93C] transition-colors">
              <ChevronDown className="w-4 h-4 animate-bounce text-[#CBD5CE] group-hover:text-[#E5A93C]" />
            </div>
          </button>
        </div>
      </section>

      {/* 2. INTRODUCTION */}
      <section id="home-intro" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E2E8E3]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs sm:text-sm font-bold text-[#0F392B] uppercase tracking-wider mb-3 block">
            About Our Approach
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#16201A] font-heading tracking-tight leading-tight">
            {siteContent.introduction.headline}
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-[#3C4A40] leading-relaxed max-w-3xl mx-auto">
            {siteContent.introduction.text}
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap text-sm font-semibold text-[#0F392B]">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F4F1] border border-[#E2E8E3]">
              <CheckCircle className="w-4 h-4 text-[#0F392B]" />
              Residential Homes
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F4F1] border border-[#E2E8E3]">
              <CheckCircle className="w-4 h-4 text-[#0F392B]" />
              Commercial Offices
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F4F1] border border-[#E2E8E3]">
              <CheckCircle className="w-4 h-4 text-[#0F392B]" />
              Shops & Clinics
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F4F1] border border-[#E2E8E3]">
              <CheckCircle className="w-4 h-4 text-[#0F392B]" />
              Backup Power Storage
            </span>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE DO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8FAF8] border-b border-[#E2E8E3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#0F392B] uppercase tracking-wider mb-2 block">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16201A] font-heading tracking-tight">
              WHAT WE DO
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#526356]">
              Engineered solar and backup energy systems tailored to the realities of power demand.
            </p>
          </div>

          {/* Three Clean Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteContent.whatWeDo.map(block => (
              <div
                key={block.id}
                className="bg-white rounded-2xl border border-[#E2E8E3] p-8 hover:border-[#CBD5CE] hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[#0F392B]/5 text-[#0F392B] group-hover:bg-[#0F392B] group-hover:text-[#E5A93C] flex items-center justify-center mb-6 transition-colors">
                    {block.icon === 'Sun' && <Sun className="w-7 h-7" />}
                    {block.icon === 'Wrench' && <Wrench className="w-7 h-7" />}
                    {block.icon === 'BatteryCharging' && <BatteryCharging className="w-7 h-7" />}
                  </div>

                  <h3 className="text-xl font-bold text-[#16201A] font-heading tracking-wide mb-3">
                    {block.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#526356] leading-relaxed">
                    {block.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#F0F4F1]">
                  <button
                    onClick={() => {
                      onNavigate('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-sm font-bold text-[#0F392B] group-hover:text-[#E5A93C] flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CTA View All Services */}
          <div className="mt-14 text-center">
            <button
              onClick={() => {
                onNavigate('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0F392B] hover:bg-[#164D3B] text-white font-bold text-sm tracking-wide shadow-sm transition-all cursor-pointer"
            >
              <span>View All Services</span>
              <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. WHY SOLAR? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E2E8E3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs sm:text-sm font-bold text-[#0F392B] uppercase tracking-wider mb-2 block">
              Long-term Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16201A] font-heading tracking-tight">
              WHY SOLAR?
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#526356]">
              A practical pathway toward stable, predictable energy for your household or business.
            </p>
          </div>

          {/* 3 Value Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 1. Reliable Power */}
            <div className="p-8 rounded-2xl bg-[#F8FAF8] border border-[#E2E8E3]">
              <div className="w-12 h-12 rounded-xl bg-[#0F392B] text-[#E5A93C] flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#16201A] font-heading mb-2">
                Reliable Power
              </h3>
              <p className="text-sm sm:text-base text-[#526356] leading-relaxed">
                Reduce dependence on an unstable grid. Enjoy continuous electricity that keeps your lights on and key appliances operating smoothly.
              </p>
              <div className="mt-5 text-xs font-semibold text-[#0F392B] bg-[#0F392B]/5 px-3 py-1.5 rounded-md inline-block">
                Continuous daily productivity
              </div>
            </div>

            {/* 2. Lower Energy Costs */}
            <div className="p-8 rounded-2xl bg-[#F8FAF8] border border-[#E2E8E3]">
              <div className="w-12 h-12 rounded-xl bg-[#0F392B] text-[#E5A93C] flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#16201A] font-heading mb-2">
                Lower Energy Costs
              </h3>
              <p className="text-sm sm:text-base text-[#526356] leading-relaxed">
                Generate and manage your own electricity. Shift consumption away from recurring fuel purchases and rising utility tariffs.
              </p>
              <div className="mt-5 text-xs font-semibold text-[#0F392B] bg-[#0F392B]/5 px-3 py-1.5 rounded-md inline-block">
                Predictable operating overhead
              </div>
            </div>

            {/* 3. Clean Energy */}
            <div className="p-8 rounded-2xl bg-[#F8FAF8] border border-[#E2E8E3]">
              <div className="w-12 h-12 rounded-xl bg-[#0F392B] text-[#E5A93C] flex items-center justify-center mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#16201A] font-heading mb-2">
                Clean Energy
              </h3>
              <p className="text-sm sm:text-base text-[#526356] leading-relaxed">
                Use a smarter and more sustainable source of power. Eliminate toxic generator exhaust, noise pollution, and frequent maintenance hassles.
              </p>
              <div className="mt-5 text-xs font-semibold text-[#0F392B] bg-[#0F392B]/5 px-3 py-1.5 rounded-md inline-block">
                Zero generator smoke or noise
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase Callout with Modern Home Solar Image */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0F392B] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold text-[#E5A93C] uppercase tracking-wider block">
              Engineered For Nigerian Buildings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Practical Energy Solutions Designed Around Your Power Needs
            </h2>
            <p className="text-base text-[#CBD5CE] leading-relaxed">
              Whether you are powering a modern flat, an office facility, or a family residence, Hybrid Solar sizes equipment to match your actual load rather than rough guesses.
            </p>

            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-sm text-[#E2E8E3]">
                <CheckCircle className="w-5 h-5 text-[#E5A93C] shrink-0" />
                <span>Custom phase balancing & neat electrical trunking</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#E2E8E3]">
                <CheckCircle className="w-5 h-5 text-[#E5A93C] shrink-0" />
                <span>Dedicated DC & AC surge protection units</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#E2E8E3]">
                <CheckCircle className="w-5 h-5 text-[#E5A93C] shrink-0" />
                <span>Scalable modular battery setups for future expansion</span>
              </li>
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenQuoteModal}
                className="px-7 py-3.5 rounded-xl bg-[#E5A93C] hover:bg-[#D99426] text-[#09251C] font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${siteContent.contact.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl overflow-hidden border border-[#236852] shadow-2xl relative">
              <img
                src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80"
                alt="Modern home with rooftop solar panels"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09251C]/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#09251C]/90 border border-[#236852] backdrop-blur-xs text-xs text-[#CBD5CE] flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">Hybrid Solar Installation</div>
                  <div>Rooftop solar arrays paired with battery energy storage</div>
                </div>
                <span className="text-[#E5A93C] font-bold">Lagos, NG</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
