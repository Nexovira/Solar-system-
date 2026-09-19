import { useState, useId } from 'react';
import { X, CheckCircle, MessageCircle, Send, ShieldCheck, SunMedium } from 'lucide-react';
import { siteContent } from '../content/siteContent';
import { SolarEstimate } from './SolarAssistant';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  attachedEstimate?: SolarEstimate | null;
}

export default function QuoteModal({
  isOpen,
  onClose,
  initialService,
  attachedEstimate,
}: QuoteModalProps) {
  const nameInputId = useId();
  const phoneInputId = useId();
  const emailInputId = useId();
  const serviceSelectId = useId();
  const messageTextareaId = useId();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(initialService || 'Solar System Installation');
  const [message, setMessage] = useState(
    attachedEstimate
      ? `I would like to discuss an installation for a ${attachedEstimate.systemTier} with ${attachedEstimate.batteryCapacity}.`
      : ''
  );
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleResetForm = () => {
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
    setSubmitted(false);
    onClose();
  };

  const getWhatsAppPrefill = () => {
    const text = `Hello Hybrid Solar,\n\nI would like to request a quote:\n` +
      `*Name:* ${name || 'Prospective Customer'}\n` +
      `*Phone:* ${phone || 'Not provided'}\n` +
      `*Email:* ${email || 'Not provided'}\n` +
      `*Service Needed:* ${service}\n` +
      (attachedEstimate ? `*System Tier:* ${attachedEstimate.systemTier}\n` : '') +
      `*Message:* ${message || 'Please send me details on available packages.'}`;
    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#09251C]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-2xl border border-[#CBD5CE] shadow-2xl overflow-hidden relative">
        {/* Top Header */}
        <div className="bg-[#0F392B] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#E5A93C] text-[#09251C] flex items-center justify-center font-bold">
              <SunMedium className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading">Request a Quote</h3>
              <p className="text-xs text-[#CBD5CE]">Hybrid Solar &bull; Lagos, Nigeria</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#CBD5CE] hover:text-white hover:bg-[#164D3B] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#0F392B]/10 rounded-full flex items-center justify-center mx-auto text-[#0F392B]">
                <CheckCircle className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-[#16201A]">Quote Request Received</h4>
              <p className="text-sm text-[#526356] max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-[#16201A]">{name}</span>. Our technical team will review your requirements for <span className="font-semibold text-[#0F392B]">{service}</span> and reach out to you shortly.
              </p>

              <div className="pt-3 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/${siteContent.contact.whatsappRaw}?text=${getWhatsAppPrefill()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant Follow-up on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="py-3 px-5 rounded-xl border border-[#CBD5CE] text-sm font-semibold text-[#3C4A40] hover:bg-[#F8FAF8]"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {attachedEstimate && (
                <div className="p-3 bg-[#F0F4F1] rounded-xl border border-[#CBD5CE] text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#0F392B]">Attached Estimate:</span>{' '}
                    <span className="text-[#3C4A40]">{attachedEstimate.systemTier}</span>
                  </div>
                  <span className="text-[#E5A93C] font-semibold text-[11px]">Included</span>
                </div>
              )}

              <div>
                <label htmlFor={nameInputId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  id={nameInputId}
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Babatunde Adeleke"
                  className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-3.5 py-2.5 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor={phoneInputId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-1.5">
                    Phone Number *
                  </label>
                  <input
                    id={phoneInputId}
                    type="tel"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="0803 000 0000"
                    className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-3.5 py-2.5 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                  />
                </div>

                <div>
                  <label htmlFor={emailInputId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id={emailInputId}
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-3.5 py-2.5 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={serviceSelectId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-1.5">
                  Service Needed *
                </label>
                <select
                  id={serviceSelectId}
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-3.5 py-2.5 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                >
                  <option value="Solar Panel Sales">Solar Panel Sales</option>
                  <option value="Solar System Installation">Complete Solar System Installation</option>
                  <option value="Inverter Systems">Inverter Systems & Upgrades</option>
                  <option value="Battery Storage">Battery Storage (LiFePO4 Lithium)</option>
                  <option value="Solar Maintenance">Solar System Maintenance & Inspection</option>
                  <option value="Energy Consultation">Energy Consultation & Load Audit</option>
                </select>
              </div>

              <div>
                <label htmlFor={messageTextareaId} className="block text-xs font-bold text-[#16201A] uppercase tracking-wider mb-1.5">
                  Project Details / Message
                </label>
                <textarea
                  id={messageTextareaId}
                  rows={3}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us about your property location, building type, or current power challenge..."
                  className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl p-3 text-sm text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 rounded-xl bg-[#0F392B] hover:bg-[#164D3B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 disabled:opacity-75 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#E5A93C]" />
                  <span>{submitting ? 'Submitting Request...' : 'Request a Quote'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#526356] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0F392B]" />
                <span>Zero obligations. We respect your contact privacy.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
