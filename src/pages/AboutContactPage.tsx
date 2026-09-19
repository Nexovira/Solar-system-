import { useState, useEffect, useId } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  CheckCircle,
  ShieldCheck,
  Building,
  Clock,
  ArrowRight,
  SunMedium,
  CheckCircle2
} from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { SolarEstimate } from '../components/SolarAssistant';

interface AboutContactPageProps {
  attachedEstimate?: SolarEstimate | null;
}

export default function AboutContactPage({ attachedEstimate }: AboutContactPageProps) {
  const nameInputId = useId();
  const phoneInputId = useId();
  const emailInputId = useId();
  const serviceSelectId = useId();
  const messageTextareaId = useId();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Complete Solar System Installation');
  const [message, setMessage] = useState(
    attachedEstimate
      ? `I configured a ${attachedEstimate.systemTier} on your Solar Assistant with ${attachedEstimate.batteryCapacity}. Please provide a formal quotation and site survey details.`
      : ''
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (attachedEstimate) {
      setMessage(
        `I configured a ${attachedEstimate.systemTier} on your Solar Assistant with ${attachedEstimate.batteryCapacity}. Please provide a formal quotation and site survey details.`
      );
    }
  }, [attachedEstimate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const getWhatsAppMessage = () => {
    const text = `Hello Hybrid Solar,\n\nI am contacting you from your website:\n` +
      `*Name:* ${name || 'Prospective Client'}\n` +
      `*Phone:* ${phone || 'Not provided'}\n` +
      `*Email:* ${email || 'Not provided'}\n` +
      `*Service Needed:* ${service}\n` +
      (attachedEstimate ? `*Estimated System:* ${attachedEstimate.systemTier}\n` : '') +
      `*Message:* ${message || 'I would like to discuss solar power solutions for my property in Lagos.'}`;
    return encodeURIComponent(text);
  };

  return (
    <div className="w-full bg-[#F8FAF8]">
      {/* 1. ABOUT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-[#E2E8E3]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs sm:text-sm font-bold text-[#0F392B] uppercase tracking-wider mb-2 block">
              Company Overview
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-[#16201A] font-heading tracking-tight leading-tight">
              {siteContent.about.headline}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#3C4A40] leading-relaxed">
              {siteContent.about.text}
            </p>
          </div>

          {/* Three Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {siteContent.about.coreValues.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F8FAF8] border border-[#E2E8E3] hover:border-[#CBD5CE] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0F392B] text-[#E5A93C] flex items-center justify-center font-bold text-sm mb-4">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#16201A] font-heading mb-2">
                  {val.title}
                </h3>
                <p className="text-sm text-[#526356] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CONTACT & QUOTE SECTION */}
      <section id="contact-form" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F0F4F1]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs sm:text-sm font-bold text-[#0F392B] uppercase tracking-wider mb-2 block">
              Direct Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#16201A] font-heading tracking-tight">
              LET'S FIND THE RIGHT POWER SOLUTION FOR YOU.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#526356]">
              Reach out through WhatsApp, telephone, or complete our consultation form below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Contact info & Prominent WhatsApp Button */}
            <div className="lg:col-span-5 space-y-6">
              {/* Primary WhatsApp Card (Highlighted) */}
              <div className="bg-[#0F392B] text-white p-7 sm:p-8 rounded-2xl border border-[#144233] shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#25D366]/20 text-[#42E07E] text-xs font-bold uppercase tracking-wider mb-3">
                    <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                    Direct Fast Response
                  </div>

                  <h3 className="text-2xl font-bold font-heading mb-2">
                    Chat on WhatsApp
                  </h3>
                  <p className="text-sm text-[#CBD5CE] leading-relaxed mb-6">
                    Connect instantly with our engineering support team for equipment availability, system inquiries, or to send photos of your electrical distribution board.
                  </p>

                  <a
                    href={`https://wa.me/${siteContent.contact.whatsappRaw}?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-md transition-all active:scale-98"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Chat on WhatsApp</span>
                  </a>

                  <div className="mt-3 text-center text-xs text-[#8FA193]">
                    Number: <span className="text-white font-semibold">{siteContent.contact.whatsappDisplay}</span>
                  </div>
                </div>
              </div>

              {/* Clickable Contact Details Card */}
              <div className="bg-white p-7 sm:p-8 rounded-2xl border border-[#E2E8E3] shadow-sm space-y-6">
                <h4 className="text-sm font-bold text-[#16201A] uppercase tracking-wider">
                  Contact Information
                </h4>

                <div className="space-y-4 text-sm">
                  {/* Phone */}
                  <a
                    href={`tel:${siteContent.contact.phoneRaw}`}
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F8FAF8] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0F392B]/5 text-[#0F392B] group-hover:bg-[#0F392B] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7C6E] font-medium">Telephone Inquiries</div>
                      <div className="font-bold text-[#16201A] group-hover:text-[#0F392B] transition-colors">
                        {siteContent.contact.phoneDisplay}
                      </div>
                      <div className="text-xs text-[#8FA193]">Tap to dial immediately</div>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${siteContent.contact.email}`}
                    className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F8FAF8] transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0F392B]/5 text-[#0F392B] group-hover:bg-[#0F392B] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7C6E] font-medium">Email Address</div>
                      <div className="font-bold text-[#16201A] group-hover:text-[#0F392B] transition-colors">
                        {siteContent.contact.email}
                      </div>
                      <div className="text-xs text-[#8FA193]">Replies typically within 24 hours</div>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-3.5 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-[#0F392B]/5 text-[#0F392B] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7C6E] font-medium">Operational Base</div>
                      <div className="font-bold text-[#16201A]">
                        {siteContent.contact.location}
                      </div>
                      <div className="text-xs text-[#8FA193]">Site surveys available across Lagos & neighboring states</div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5 p-3 rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-[#0F392B]/5 text-[#0F392B] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-[#6B7C6E] font-medium">Working Hours</div>
                      <div className="font-semibold text-[#16201A]">
                        {siteContent.contact.workingHours}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Complete Contact Form */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-10 rounded-2xl border border-[#CBD5CE] shadow-sm">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-[#16201A] font-heading">
                  Request a Formal Quote
                </h3>
                <p className="text-sm text-[#526356] mt-1">
                  Fill out this simple form to describe your power requirements, and our team will get back to you with guidance.
                </p>
              </div>

              {submitted ? (
                <div className="py-10 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#0F392B]/10 rounded-full flex items-center justify-center mx-auto text-[#0F392B]">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-extrabold text-[#16201A]">
                    Thank You, {name}!
                  </h4>
                  <p className="text-sm text-[#526356] max-w-md mx-auto leading-relaxed">
                    We have logged your request for <span className="font-semibold text-[#0F392B]">{service}</span>. Our installation coordinator will contact you at <span className="font-semibold text-[#16201A]">{phone}</span>.
                  </p>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/${siteContent.contact.whatsappRaw}?text=${getWhatsAppMessage()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold text-sm flex items-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Forward details via WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="px-5 py-3 rounded-xl border border-[#CBD5CE] text-sm font-semibold text-[#3C4A40] hover:bg-[#F8FAF8]"
                    >
                      Submit Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {attachedEstimate && (
                    <div className="p-4 rounded-xl bg-[#F0F4F1] border border-[#CBD5CE] text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold text-[#0F392B]">
                        <span>Attached System Estimate:</span>
                        <span className="text-[#E5A93C] font-semibold">Included in request</span>
                      </div>
                      <div className="text-[#3C4A40]">
                        {attachedEstimate.systemTier} &bull; {attachedEstimate.batteryCapacity}
                      </div>
                    </div>
                  )}

                  {/* Name */}
                  <div>
                    <label htmlFor={nameInputId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-2">
                      Name *
                    </label>
                    <input
                      id={nameInputId}
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Olumide Johnson"
                      className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-4 py-3 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={phoneInputId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-2">
                        Phone Number *
                      </label>
                      <input
                        id={phoneInputId}
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="0803 000 0000"
                        className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-4 py-3 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                      />
                    </div>

                    <div>
                      <label htmlFor={emailInputId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-2">
                        Email *
                      </label>
                      <input
                        id={emailInputId}
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="johnson@example.com"
                        className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-4 py-3 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                      />
                    </div>
                  </div>

                  {/* Service Needed */}
                  <div>
                    <label htmlFor={serviceSelectId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-2">
                      Service Needed *
                    </label>
                    <select
                      id={serviceSelectId}
                      value={service}
                      onChange={e => setService(e.target.value)}
                      className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-4 py-3 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                    >
                      <option value="Solar Panel Sales">Solar Panel Sales</option>
                      <option value="Complete Solar System Installation">
                        Solar System Installation (Complete Package)
                      </option>
                      <option value="Inverter Systems">Inverter Systems & Upgrades</option>
                      <option value="Battery Storage">Battery Storage (LiFePO4 Lithium)</option>
                      <option value="Solar Maintenance">Solar Maintenance & Servicing</option>
                      <option value="Energy Consultation">Energy Consultation & Load Audit</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor={messageTextareaId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      id={messageTextareaId}
                      required
                      rows={4}
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Describe your location, appliances you want to run, current generator usage, or specific questions..."
                      className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl p-4 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-[#0F392B] hover:bg-[#164D3B] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-75 cursor-pointer"
                    >
                      <Send className="w-5 h-5 text-[#E5A93C]" />
                      <span>{isSubmitting ? 'Sending Request...' : 'Request a Quote'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-[#526356] pt-1">
                    <ShieldCheck className="w-4 h-4 text-[#0F392B]" />
                    <span>No obligation. We do not share your contact details.</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
