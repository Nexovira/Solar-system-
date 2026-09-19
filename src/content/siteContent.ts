/**
 * Editable site content and configuration for HYBRID SOLAR.
 * This file is designed for easy white-label customization for real solar companies.
 */

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  keyFeatures: string[];
  specsLabel: string;
  specsValue: string;
  imageUrl: string;
  iconName: 'Sun' | 'Cpu' | 'BatteryCharging' | 'Wrench' | 'ShieldCheck' | 'Compass';
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  contact: {
    phoneDisplay: string;
    phoneRaw: string;
    whatsappDisplay: string;
    whatsappRaw: string;
    email: string;
    location: string;
    workingHours: string;
  };
  navigation: Array<{
    id: string;
    label: string;
    page: 'home' | 'services' | 'about' | 'contact';
  }>;
  hero: {
    headline: string;
    supportingText: string;
    primaryCta: string;
    secondaryCta: string;
    heroImage: string;
  };
  introduction: {
    headline: string;
    text: string;
  };
  whatWeDo: Array<{
    id: string;
    title: string;
    description: string;
    icon: 'Sun' | 'Wrench' | 'BatteryCharging';
    serviceId: string;
  }>;
  whySolar: Array<{
    title: string;
    description: string;
    benefit: string;
  }>;
  servicesPage: {
    headline: string;
    supportingText: string;
  };
  servicesList: ServiceItem[];
  howItWorks: Array<{
    step: string;
    title: string;
    description: string;
    detail: string;
  }>;
  about: {
    headline: string;
    text: string;
    coreValues: Array<{
      title: string;
      desc: string;
    }>;
  };
  disclaimers: {
    aiEstimate: string;
    general: string;
  };
}

export const siteContent: SiteConfig = {
  companyName: "HYBRID SOLAR",
  tagline: "Reliable Power. Smarter Energy.",
  
  contact: {
    phoneDisplay: "070 XXX XXXX",
    phoneRaw: "+2347000000000",
    whatsappDisplay: "+234 XXX XXX XXXX",
    whatsappRaw: "2347000000000",
    email: "hello@hybridsolar.com",
    location: "Lagos, Nigeria",
    workingHours: "Monday – Saturday: 8:00 AM – 6:00 PM WAT",
  },

  navigation: [
    { id: "nav-home", label: "Home", page: "home" },
    { id: "nav-services", label: "Services", page: "services" },
    { id: "nav-about", label: "About", page: "about" },
    { id: "nav-contact", label: "Contact", page: "contact" },
  ],

  hero: {
    headline: "POWER YOUR FUTURE WITH SOLAR.",
    supportingText:
      "Reliable solar solutions for homes, businesses and everyday life. Hybrid Solar helps you take control of your energy with quality systems and professional installation.",
    primaryCta: "Get a Quote",
    secondaryCta: "Explore Our Services",
    // Premium high-res photography of clean rooftop solar installation
    heroImage:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=2000&q=85",
  },

  introduction: {
    headline: "SMART ENERGY. BUILT AROUND YOU.",
    text: "From solar panels and inverters to battery storage and complete installations, Hybrid Solar provides practical energy solutions designed around your power needs.",
  },

  whatWeDo: [
    {
      id: "wwd-sales",
      title: "SOLAR SALES",
      description: "Quality solar equipment for residential and commercial applications.",
      icon: "Sun",
      serviceId: "solar-panels",
    },
    {
      id: "wwd-installation",
      title: "INSTALLATION",
      description: "Professional solar system installation designed around your energy requirements.",
      icon: "Wrench",
      serviceId: "solar-installation",
    },
    {
      id: "wwd-storage",
      title: "POWER STORAGE",
      description: "Battery and inverter solutions designed to help keep your essential appliances powered.",
      icon: "BatteryCharging",
      serviceId: "battery-storage",
    },
  ],

  whySolar: [
    {
      title: "Reliable Power",
      description: "Reduce dependence on an unstable grid.",
      benefit: "Uninterrupted daily productivity",
    },
    {
      title: "Lower Energy Costs",
      description: "Generate and manage your own electricity.",
      benefit: "Predictable, long-term power spending",
    },
    {
      title: "Clean Energy",
      description: "Use a smarter and more sustainable source of power.",
      benefit: "Zero noise, zero diesel fumes",
    },
  ],

  servicesPage: {
    headline: "SOLAR SOLUTIONS THAT WORK FOR YOU.",
    supportingText:
      "Explore our range of solar and backup-power solutions for homes, offices, shops and businesses.",
  },

  servicesList: [
    {
      id: "solar-panels",
      title: "SOLAR PANEL SYSTEMS",
      shortDescription: "Solar panels and complete systems designed for different energy requirements.",
      fullDescription:
        "High-efficiency monocrystalline solar panels engineered to perform optimally in tropical weather conditions. We supply and configure solar arrays calibrated to match your daily energy generation targets.",
      keyFeatures: [
        "Tier-1 Monocrystalline photovoltaic modules",
        "High shade tolerance and heat coefficient",
        "Robust aluminum framing rated for coastal winds",
        "Residential rooftop and commercial ground-mount options",
      ],
      specsLabel: "Module Ratings",
      specsValue: "450W - 650W High-Efficiency Monocrystalline",
      imageUrl:
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80",
      iconName: "Sun",
    },
    {
      id: "inverter-systems",
      title: "INVERTER SYSTEMS",
      shortDescription: "Reliable inverter solutions for backup and everyday power needs.",
      fullDescription:
        "Pure Sine Wave inverters and smart hybrid power converters designed to manage seamless switching between solar, battery storage, and utility grid power with zero equipment reboot.",
      keyFeatures: [
        "Pure Sine Wave output protecting sensitive home & office electronics",
        "Built-in MPPT solar charge controllers",
        "Zero transfer-time UPS mode for desktop computers and servers",
        "Remote monitoring via smartphone dashboard",
      ],
      specsLabel: "Inverter Capacities",
      specsValue: "1.5kVA, 2.5kVA, 3.5kVA, 5kVA, 7.5kVA, 10kVA, 15kVA+",
      imageUrl:
        "https://images.unsplash.com/photo-1558441719-8b489c63f7d1?auto=format&fit=crop&w=1200&q=80",
      iconName: "Cpu",
    },
    {
      id: "battery-storage",
      title: "BATTERY STORAGE",
      shortDescription: "Energy storage solutions that help keep your essential devices running.",
      fullDescription:
        "Advanced Lithium Iron Phosphate (LiFePO4) energy storage and high-durability deep-cycle backup batteries configured to deliver stable power during grid outages and overnight hours.",
      keyFeatures: [
        "Safe Lithium Iron Phosphate (LiFePO4) chemistry",
        "High cycle life with intelligent battery management system (BMS)",
        "Compact wall-mount or floor-standing rack designs",
        "Expandable modular capacity as your energy needs grow",
      ],
      specsLabel: "Storage Technology",
      specsValue: "LiFePO4 Lithium (2.56kWh - 20kWh+ scalable)",
      imageUrl:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
      iconName: "BatteryCharging",
    },
    {
      id: "solar-installation",
      title: "SOLAR INSTALLATION",
      shortDescription: "Professional installation and system setup.",
      fullDescription:
        "Precision electrical installation executed by trained solar technicians. From safe roof penetrations and storm-resistant rail mounting to circuit protection and cable trunking, we prioritize safety and durability.",
      keyFeatures: [
        "Engineered roof mounting and waterproof seals",
        "DC and AC circuit breakers, surge protectors, and earth grounding",
        "Neat, color-coded conduit trunking compliant with safety standards",
        "Complete commissioning, phase balancing, and system handover",
      ],
      specsLabel: "Workmanship Standard",
      specsValue: "Certified DC/AC Isolation & Dual-Surge Protection",
      imageUrl:
        "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?auto=format&fit=crop&w=1200&q=80",
      iconName: "Wrench",
    },
    {
      id: "maintenance",
      title: "MAINTENANCE",
      shortDescription: "System checks, servicing and support to help keep your installation performing properly.",
      fullDescription:
        "Routine diagnostic checks, solar panel dust cleaning, battery health evaluations, and connection torquing to ensure your power system continues to generate and deliver peak energy output.",
      keyFeatures: [
        "Photovoltaic array cleaning and degradation assessments",
        "Inverter firmware updates and heat-sink cleaning",
        "Battery cell health checks and voltage balance verification",
        "Rapid-response troubleshooting for unexpected system interruptions",
      ],
      specsLabel: "Service Coverage",
      specsValue: "Quarterly Preventive Maintenance & Emergency Support",
      imageUrl:
        "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80",
      iconName: "ShieldCheck",
    },
    {
      id: "energy-consultation",
      title: "ENERGY CONSULTATION",
      shortDescription: "Get guidance on choosing a solar solution based on your power requirements.",
      fullDescription:
        "Transparent, realistic load assessments for residences, retail stores, clinics, and offices. We analyze your electricity consumption patterns and help you design a system that fits your budget without over- or under-sizing.",
      keyFeatures: [
        "In-depth appliance energy audit and load scheduling",
        "Rooftop orientation and shade analysis",
        "Clear sizing recommendations (panel count, inverter size, battery kWh)",
        "Zero sales pressure: objective guidance based on real usage",
      ],
      specsLabel: "Deliverable",
      specsValue: "Tailored System Sizing Report & Transparent Quotation",
      imageUrl:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
      iconName: "Compass",
    },
  ],

  howItWorks: [
    {
      step: "01",
      title: "CONSULT",
      description: "Tell us about your power needs.",
      detail:
        "Share your property type, current electricity challenges, and the appliances you need powered.",
    },
    {
      step: "02",
      title: "DESIGN",
      description: "We recommend a suitable system configuration.",
      detail:
        "We specify the appropriate inverter rating, battery storage capacity, and solar panel array for your usage profile.",
    },
    {
      step: "03",
      title: "INSTALL",
      description: "Our team installs and sets up your solar solution.",
      detail:
        "Our skilled installers handle safe roof mounting, cabling, switchgear protection, and commissioning.",
    },
  ],

  about: {
    headline: "POWERING A SMARTER TOMORROW.",
    text: "Hybrid Solar is a solar-energy company focused on helping homes and businesses access practical, reliable and modern power solutions. We provide solar equipment, installation, backup systems and energy guidance tailored to individual needs.",
    coreValues: [
      {
        title: "Practical Engineering",
        desc: "We design realistic energy setups based on actual appliance draw, never overselling or recommending undersized equipment.",
      },
      {
        title: "Safety & Workmanship",
        desc: "All installations include complete surge suppression, DC disconnects, and protective switchgear.",
      },
      {
        title: "Transparent Communication",
        desc: "Clear system capacities, honest load limitations, and straightforward after-sales support.",
      },
    ],
  },

  disclaimers: {
    aiEstimate:
      "This is a general estimate, not a professional electrical or engineering assessment. Contact Hybrid Solar for a proper system evaluation.",
    general:
      "Hybrid Solar designs practical solar and backup power setups for homes and businesses. System performance varies based on sunshine hours, seasonal conditions, and actual appliance usage.",
  },
};
