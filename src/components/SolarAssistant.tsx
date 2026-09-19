import { useState, useId } from 'react';
import {
  Sparkles,
  Zap,
  BatteryCharging,
  Sun,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Sliders,
  RotateCcw,
  Loader2,
  Info
} from 'lucide-react';
import { siteContent } from '../content/siteContent';

export interface SolarEstimate {
  systemTier: string;
  inverterRating: string;
  batteryCapacity: string;
  solarPanels: string;
  recommendedAppliances: string[];
  loadManagementTips: string[];
  summary: string;
  disclaimer: string;
  source: 'instant' | 'ai';
}

interface SolarAssistantProps {
  onSelectForQuote: (estimate: SolarEstimate, userInput: any) => void;
}

const APPLIANCE_OPTIONS = [
  { id: 'lighting', label: 'LED Lights & Ceiling Fans', watts: 250, icon: '💡' },
  { id: 'entertainment', label: 'TV, Decoder & Home Wi-Fi', watts: 200, icon: '📺' },
  { id: 'fridge', label: 'Inverter Refrigerator', watts: 350, icon: '🧊' },
  { id: 'freezer', label: 'Deep Chest Freezer', watts: 600, icon: '❄️' },
  { id: 'inverter-ac-1', label: '1x Inverter AC (1.0 - 1.5 HP)', watts: 1200, icon: '❄️' },
  { id: 'inverter-ac-multi', label: '2+ Air Conditioners', watts: 2800, icon: '🏢' },
  { id: 'pumping-machine', label: 'Water Pumping Machine (Borehole)', watts: 1500, icon: '💧' },
  { id: 'washing-iron', label: 'Washing Machine & Pressing Iron', watts: 1800, icon: '👔' },
  { id: 'office-pcs', label: 'Laptops / Desktop Workstations', watts: 400, icon: '💻' },
];

export default function SolarAssistant({ onSelectForQuote }: SolarAssistantProps) {
  const roomsSelectId = useId();
  const usageSelectId = useId();
  const backupSelectId = useId();
  const notesTextareaId = useId();

  const [rooms, setRooms] = useState<number>(3);
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>([
    'lighting',
    'entertainment',
    'fridge',
  ]);
  const [dailyUsage, setDailyUsage] = useState<string>('Daytime & Evening');
  const [backupNeed, setBackupNeed] = useState<string>('Essential Backup (Outage Protection)');
  const [additionalNotes, setAdditionalNotes] = useState<string>('');
  
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [estimate, setEstimate] = useState<SolarEstimate | null>(() =>
    calculateInstantEstimate(3, ['lighting', 'entertainment', 'fridge'], 'Daytime & Evening', 'Essential Backup (Outage Protection)')
  );
  const [aiError, setAiError] = useState<string | null>(null);

  // Toggle appliance
  const toggleAppliance = (id: string) => {
    setSelectedAppliances(prev => {
      const next = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      // Automatically update instant estimate
      setEstimate(calculateInstantEstimate(rooms, next, dailyUsage, backupNeed));
      return next;
    });
  };

  const handleRoomsChange = (r: number) => {
    setRooms(r);
    setEstimate(calculateInstantEstimate(r, selectedAppliances, dailyUsage, backupNeed));
  };

  const handleUsageChange = (u: string) => {
    setDailyUsage(u);
    setEstimate(calculateInstantEstimate(rooms, selectedAppliances, u, backupNeed));
  };

  const handleBackupChange = (b: string) => {
    setBackupNeed(b);
    setEstimate(calculateInstantEstimate(rooms, selectedAppliances, dailyUsage, b));
  };

  // Rule-based deterministic sizing logic specifically calibrated for Nigerian solar configurations
  function calculateInstantEstimate(
    numRooms: number,
    appliances: string[],
    usage: string,
    backup: string
  ): SolarEstimate {
    const hasMultipleAC = appliances.includes('inverter-ac-multi');
    const hasSingleAC = appliances.includes('inverter-ac-1');
    const hasPump = appliances.includes('pumping-machine');
    const hasFreezer = appliances.includes('freezer');
    const hasIron = appliances.includes('washing-iron');

    let tier = '2.5kVA Basic Hybrid System';
    let inverter = '2.5 kVA / 24V Pure Sine Wave Inverter';
    let battery = '2.56 kWh - 3.5 kWh LiFePO4 Lithium Battery';
    let panels = '4 x 450W - 550W Monocrystalline Panels (approx. 2.0 kW array)';
    const recApps: string[] = [
      'Energy-saving lighting & fans throughout property',
      'Smart TV, Decoder, Sound System & Wi-Fi router',
      'Laptops & phone charging'
    ];
    const tips: string[] = [
      'Avoid running high-surge heating appliances (electric heaters, pressing irons) on battery power.',
      'Optimal for reliable lighting and entertainment during NEPA / utility power cuts.'
    ];
    let summary =
      'A practical entry-level hybrid solution configured for reliable lighting, electronics, and home connectivity without generator noise.';

    if (hasMultipleAC || (numRooms >= 5 && (hasSingleAC || hasPump))) {
      tier = '10.0kVA Premium Heavy-Duty Hybrid Solution';
      inverter = '10.0 kVA / 48V High-Capacity Pure Sine Wave Inverter';
      battery = '10.24 kWh - 15.36 kWh LiFePO4 Lithium Battery Pack';
      panels = '14 - 18 x 550W Tier-1 Monocrystalline Panels (7.7kW - 9.9kW array)';
      recApps.push(
        '2 to 3 Inverter Air Conditioners (staggered startup)',
        'Deep Freezer & Inverter Refrigerator',
        'Water Pumping Machine (daytime operation)',
        'Full home lighting, multimedia, and work setups'
      );
      tips.push(
        'Schedule borehole water pumping during peak solar irradiance (11:00 AM – 3:00 PM).',
        'Utilize intelligent inverter load shedding to preserve battery longevity overnight.'
      );
      summary =
        'A comprehensive, high-output solar installation built for large homes or offices requiring continuous air conditioning and heavy inductive loads.';
    } else if (hasSingleAC || hasPump || hasFreezer || numRooms >= 4) {
      tier = '5.0kVA Standard Home & Office Hybrid Solution';
      inverter = '5.0 kVA / 48V Pure Sine Wave Hybrid Inverter';
      battery = '5.12 kWh - 10.24 kWh LiFePO4 Lithium Battery';
      panels = '8 - 10 x 550W Tier-1 Monocrystalline Panels (4.4kW - 5.5kW array)';
      recApps.push(
        '1x 1.0HP or 1.5HP Inverter AC (primarily solar/daytime runtime)',
        'Inverter Refrigerator and/or Chest Freezer',
        'Water Pumping Machine (recommended during solar hours)',
        'Lighting, TV entertainment, and home office gear'
      );
      tips.push(
        'Run the water pumping machine during daytime solar generation to avoid battery discharge.',
        'Ensure air conditioners are energy-efficient inverter models with eco mode enabled.'
      );
      summary =
        'Our most popular configuration for Nigerian residential homes—balancing cooling comfort, refrigeration, and reliable overnight backup.';
    } else if (appliances.includes('fridge') || numRooms >= 3) {
      tier = '3.5kVA Comfort Backup Solution';
      inverter = '3.5 kVA / 24V or 48V Pure Sine Wave Inverter';
      battery = '3.8 kWh - 5.12 kWh LiFePO4 Lithium Battery';
      panels = '6 x 550W Monocrystalline Panels (approx. 3.3 kW array)';
      recApps.push(
        'Inverter Refrigerator (continuous 24/7 cold storage)',
        'All household lighting, fans, TV, and Wi-Fi router',
        'Desktop computer and personal electronics'
      );
      tips.push(
        'Defrost freezer during daytime hours while solar panels produce surplus power.',
        'Use pressing iron only when grid power or heavy solar generation is present.'
      );
      summary =
        'Designed for moderate households looking to keep food cold, stay connected, and enjoy quiet, dependable electricity day and night.';
    }

    if (backup.includes('24/7') || usage.includes('24/7')) {
      tips.push('Battery capacity scaled up to ensure adequate reserve for consecutive cloudy or rainy days.');
    }

    return {
      systemTier: tier,
      inverterRating: inverter,
      batteryCapacity: battery,
      solarPanels: panels,
      recommendedAppliances: recApps,
      loadManagementTips: tips,
      summary,
      disclaimer: siteContent.disclaimers.aiEstimate,
      source: 'instant'
    };
  }

  // Optional AI enrichment call
  const requestAiAnalysis = async () => {
    setIsLoadingAi(true);
    setAiError(null);

    const appLabels = selectedAppliances.map(id => {
      const match = APPLIANCE_OPTIONS.find(a => a.id === id);
      return match ? match.label : id;
    });

    try {
      const res = await fetch('/api/solar-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rooms,
          appliances: appLabels,
          dailyUsage,
          backupNeed,
          notes: additionalNotes
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to reach AI sizing service');
      }

      const data = await res.json();

      if (data.isAiGenerated && data.recommendation) {
        setEstimate({
          systemTier: data.recommendation.systemTier || estimate?.systemTier || '5.0kVA Hybrid System',
          inverterRating: data.recommendation.inverterRating || estimate?.inverterRating || '5.0 kVA Pure Sine Wave',
          batteryCapacity: data.recommendation.batteryCapacity || estimate?.batteryCapacity || '5.12 kWh LiFePO4',
          solarPanels: data.recommendation.solarPanels || estimate?.solarPanels || '8 x 550W Panels',
          recommendedAppliances: data.recommendation.recommendedAppliances || estimate?.recommendedAppliances || [],
          loadManagementTips: data.recommendation.loadManagementTips || estimate?.loadManagementTips || [],
          summary: data.recommendation.summary || estimate?.summary || '',
          disclaimer: siteContent.disclaimers.aiEstimate,
          source: 'ai'
        });
      } else {
        // Use instant calculation as high quality fallback
        const fallback = calculateInstantEstimate(rooms, selectedAppliances, dailyUsage, backupNeed);
        setEstimate(fallback);
      }
    } catch (err: any) {
      console.warn('AI service note:', err);
      // Seamlessly keep or refresh instant estimate
      const fallback = calculateInstantEstimate(rooms, selectedAppliances, dailyUsage, backupNeed);
      setEstimate(fallback);
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleReset = () => {
    setRooms(3);
    setSelectedAppliances(['lighting', 'entertainment', 'fridge']);
    setDailyUsage('Daytime & Evening');
    setBackupNeed('Essential Backup (Outage Protection)');
    setAdditionalNotes('');
    setAiError(null);
    setEstimate(calculateInstantEstimate(3, ['lighting', 'entertainment', 'fridge'], 'Daytime & Evening', 'Essential Backup (Outage Protection)'));
  };

  // WhatsApp formatted string
  const getWhatsAppMessage = () => {
    if (!estimate) return '';
    const apps = selectedAppliances.map(a => APPLIANCE_OPTIONS.find(o => o.id === a)?.label).join(', ');
    const text = `Hello Hybrid Solar, I generated a solar system recommendation on your website:\n\n` +
      `*System Tier:* ${estimate.systemTier}\n` +
      `*Inverter:* ${estimate.inverterRating}\n` +
      `*Battery Storage:* ${estimate.batteryCapacity}\n` +
      `*Solar Array:* ${estimate.solarPanels}\n` +
      `*My Property:* ${rooms} rooms, Appliances: ${apps}\n` +
      `*Daily Usage:* ${dailyUsage}\n\n` +
      `I would like to schedule a professional evaluation and get an exact quote.`;
    return encodeURIComponent(text);
  };

  return (
    <section id="solar-assistant" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#F0F4F1] border-y border-[#E2E8E3]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F392B]/10 text-[#0F392B] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E5A93C]" />
            Interactive System Assistant
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#16201A] tracking-tight">
            Find the Right Solar Solution for Your Needs
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#3C4A40] leading-relaxed">
            Select your property details and appliances below to receive a practical, non-binding system sizing estimate before speaking with our engineering team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Inputs (Left Column) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl border border-[#E2E8E3] shadow-sm">
            <div className="flex items-center justify-between pb-5 border-b border-[#EBEFEA] mb-6">
              <div className="flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#0F392B]" />
                <h3 className="text-lg font-bold text-[#16201A]">Property & Power Profile</h3>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-[#526356] hover:text-[#0F392B] flex items-center gap-1 font-medium transition-colors"
                title="Reset to default settings"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            {/* 1. Number of rooms */}
            <div className="mb-6">
              <label htmlFor={roomsSelectId} className="block text-sm font-semibold text-[#16201A] mb-2">
                Number of Rooms
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => handleRoomsChange(num)}
                    className={`py-2 text-sm font-semibold rounded-lg border transition-all ${
                      rooms === num
                        ? 'bg-[#0F392B] text-white border-[#0F392B] shadow-sm'
                        : 'bg-white text-[#2C382F] border-[#D6DFD8] hover:border-[#0F392B]/40'
                    }`}
                  >
                    {num === 5 ? '5+ Rms' : `${num} Rm${num > 1 ? 's' : ''}`}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Major appliances */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-[#16201A]">
                  Major Appliances to Power
                </label>
                <span className="text-xs text-[#6B7C6E]">
                  {selectedAppliances.length} selected
                </span>
              </div>
              <p className="text-xs text-[#526356] mb-3">
                Tap items you want to keep operational during power outages:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {APPLIANCE_OPTIONS.map(app => {
                  const isChecked = selectedAppliances.includes(app.id);
                  return (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => toggleAppliance(app.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-2.5 ${
                        isChecked
                          ? 'bg-[#0F392B]/5 border-[#0F392B] text-[#0F392B] ring-1 ring-[#0F392B]'
                          : 'bg-white border-[#E2E8E3] text-[#3C4A40] hover:border-[#CBD5CE]'
                      }`}
                    >
                      <span className="text-base shrink-0">{app.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-semibold">{app.label}</div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                          isChecked
                            ? 'bg-[#0F392B] border-[#0F392B] text-white'
                            : 'border-[#CBD5CE]'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Daily usage */}
            <div className="mb-6">
              <label htmlFor={usageSelectId} className="block text-sm font-semibold text-[#16201A] mb-2">
                Approximate Daily Usage Pattern
              </label>
              <select
                id={usageSelectId}
                value={dailyUsage}
                onChange={e => handleUsageChange(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
              >
                <option value="Daytime & Evening">Daytime & Evening (Standard active household)</option>
                <option value="Evening & Overnight Backup">Evening & Overnight Backup (6:00 PM – 8:00 AM)</option>
                <option value="24/7 Full Uninterrupted">24/7 Full Power (Continuous home office or commercial)</option>
                <option value="Daytime Work Hours Only">Daytime Work Hours Only (8:00 AM – 5:00 PM)</option>
              </select>
            </div>

            {/* 4. Backup power need */}
            <div className="mb-6">
              <label htmlFor={backupSelectId} className="block text-sm font-semibold text-[#16201A] mb-2">
                Backup Power Priority
              </label>
              <select
                id={backupSelectId}
                value={backupNeed}
                onChange={e => handleBackupChange(e.target.value)}
                className="w-full bg-[#F8FAF8] border border-[#CBD5CE] rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#16201A] focus:outline-none focus:ring-2 focus:ring-[#0F392B]"
              >
                <option value="Essential Backup (Outage Protection)">
                  Essential Backup (Protect food, lights, WiFi & devices during outages)
                </option>
                <option value="Comfort Backup (AC + Refrigeration)">
                  Comfort Backup (Run Inverter AC + Fridge + essential loads)
                </option>
                <option value="Complete Independence / High Autonomy">
                  Complete Independence (Maximum reduction in grid dependence)
                </option>
              </select>
            </div>

            {/* Optional AI Deep Evaluation Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={requestAiAnalysis}
                disabled={isLoadingAi}
                className="w-full py-3 px-4 rounded-xl bg-[#0F392B] hover:bg-[#164D3B] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-75 cursor-pointer"
              >
                {isLoadingAi ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#E5A93C]" />
                    Analyzing Power Profile...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#E5A93C]" />
                    Refresh AI System Recommendation
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Results Card (Right Column) */}
          <div className="lg:col-span-6 space-y-6">
            {estimate && (
              <div className="bg-white rounded-2xl border border-[#CBD5CE] p-6 sm:p-8 shadow-sm relative overflow-hidden">
                {/* Header banner */}
                <div className="flex items-center justify-between gap-4 mb-5 pb-4 border-b border-[#EBEFEA]">
                  <div>
                    <span className="text-xs font-bold text-[#E5A93C] uppercase tracking-wider">
                      Recommended System Profile
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#0F392B] mt-0.5">
                      {estimate.systemTier}
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0F392B]/10 text-[#0F392B] shrink-0">
                    {estimate.source === 'ai' ? 'AI Enhanced' : 'Standard Sizing'}
                  </span>
                </div>

                <p className="text-sm text-[#3C4A40] leading-relaxed mb-6">
                  {estimate.summary}
                </p>

                {/* 3 Key Technical Components */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                  <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E2E8E3]">
                    <div className="flex items-center gap-1.5 text-xs text-[#526356] font-semibold mb-1">
                      <Zap className="w-3.5 h-3.5 text-[#E5A93C]" />
                      Inverter Capacity
                    </div>
                    <div className="text-sm font-bold text-[#16201A]">
                      {estimate.inverterRating.split('/')[0]}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E2E8E3]">
                    <div className="flex items-center gap-1.5 text-xs text-[#526356] font-semibold mb-1">
                      <BatteryCharging className="w-3.5 h-3.5 text-[#0F392B]" />
                      Battery Storage
                    </div>
                    <div className="text-sm font-bold text-[#16201A]">
                      {estimate.batteryCapacity.split('LiFePO4')[0] || 'LiFePO4 Pack'}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#F8FAF8] border border-[#E2E8E3]">
                    <div className="flex items-center gap-1.5 text-xs text-[#526356] font-semibold mb-1">
                      <Sun className="w-3.5 h-3.5 text-[#E5A93C]" />
                      Solar Array
                    </div>
                    <div className="text-sm font-bold text-[#16201A]">
                      {estimate.solarPanels.split('Tier-1')[0] || estimate.solarPanels}
                    </div>
                  </div>
                </div>

                {/* Supported Appliances */}
                <div className="mb-5">
                  <h4 className="text-xs font-bold text-[#16201A] uppercase tracking-wider mb-2.5">
                    Comfortably Supports:
                  </h4>
                  <ul className="space-y-1.5">
                    {estimate.recommendedAppliances.slice(0, 4).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#3C4A40]">
                        <CheckCircle2 className="w-4 h-4 text-[#0F392B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Load management tips */}
                {estimate.loadManagementTips && estimate.loadManagementTips.length > 0 && (
                  <div className="mb-6 p-4 rounded-xl bg-[#F4F7F4] border border-[#E2E8E3]">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F392B] mb-2 uppercase tracking-wider">
                      <Info className="w-3.5 h-3.5 text-[#E5A93C]" />
                      Practical Nigerian Load Tips:
                    </div>
                    <ul className="space-y-1 text-xs text-[#3C4A40]">
                      {estimate.loadManagementTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-[#E5A93C] font-bold">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mandatory Disclaimer */}
                <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-xs text-[#92400E] flex items-start gap-2.5 mb-6">
                  <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    "{siteContent.disclaimers.aiEstimate}"
                  </p>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectForQuote(estimate, {
                        rooms,
                        appliances: selectedAppliances,
                        dailyUsage,
                        backupNeed,
                      })
                    }
                    className="flex-1 py-3 px-4 rounded-xl bg-[#0F392B] hover:bg-[#164D3B] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Request Quote with this Estimate</span>
                    <ArrowRight className="w-4 h-4 text-[#E5A93C]" />
                  </button>

                  <a
                    href={`https://wa.me/${siteContent.contact.whatsappRaw}?text=${getWhatsAppMessage()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BE5C] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
