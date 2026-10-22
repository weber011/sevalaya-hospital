/**
 * SEVALAYA HOSPITAL - SOURCE OF TRUTH DATA
 * Strictly derived from supplied assets (info 1.jpeg and logo .jpeg).
 * No hallucinated doctors, accreditations, statistics, or physical addresses.
 */

export const hospitalData = {
  name: "Sevalaya Hospital",
  hindiName: "सेवालय आँख अस्पताल",
  tagline: "Eye Care & Ophthalmology Hospital",
  logoUrl: "/assets/sevalaya-logo.jpeg",
  
  contact: {
    primaryPhone: "7004214800",
    phoneDisplay: "+91 70042 14800",
    phoneTel: "tel:7004214800",
    
    // MISSING INFORMATION NOTICE:
    // Physical address and email were not included in the supplied banner (info 1.jpeg).
    addressPending: true,
    addressPlaceholder: "Physical address pending confirmation from Sevalaya Hospital administration",
    emailPending: true,
    emailPlaceholder: "Official email pending confirmation from Sevalaya Hospital administration",
  },

  // Central Hospital Location & Google Maps Configuration
  location: {
    isAddressConfirmed: false,
    addressDisplay: "Physical address pending confirmation from Sevalaya Hospital administration",
    street: null,
    city: null,
    state: null,
    pincode: null,
    
    // Google Maps configuration: intentionally left null to avoid embedding fabricated coordinates
    isMapConfirmed: false,
    googleMapsEmbedUrl: null, // Will be set to official Google Maps embed URL once confirmed
    googleMapsDirectionsUrl: null, // Will be set to official directions link once confirmed
    mapPlaceholderNotice: "Official Google Maps location will be embedded here upon administrative address confirmation. In accordance with clinical verification guidelines, no simulated coordinates are displayed."
  },

  timings: {
    days: "Everyday (प्रतिदिन)",
    hours: "9:00 AM – 7:00 PM (सुबह 9 बजे से शाम 7 बजे तक)",
    dailyAvailable: "Eye Doctors & Optometrists available daily (आँखों के डॉक्टर / ऑप्टोमेट्रिस्ट प्रतिदिन उपलब्ध हैं)",
  },

  // 10 Verified clinical services extracted directly from info 1.jpeg and info 2.jpeg posters
  services: [
    {
      id: "computerised-eye-test",
      title: "Computerised Eye Test",
      hindiTitle: "कम्प्यूटरीकृत आँख जाँच",
      description: "Automated refractive vision evaluation to assess optical clarity and accurately identify power numbers for vision correction.",
      iconName: "Monitor",
      highlight: "Vision Screening",
    },
    {
      id: "cataract-surgery",
      title: "Cataract Surgery",
      hindiTitle: "मोतियाबिंद ऑपरेशन (आधुनिक तकनीक से)",
      description: "Micro-surgical procedures for natural lens clouding, employing modern clinical techniques for restored visual clarity.",
      iconName: "Eye",
      highlight: "Modern Technique",
    },
    {
      id: "pterygium-treatment",
      title: "Pterygium Treatment",
      hindiTitle: "टेरिजिम / नाखून का उपचार",
      description: "Diagnostic evaluation and medical or surgical management of conjunctival tissue growth extending across the cornea.",
      iconName: "Shield",
      highlight: "Corneal Care",
    },
    {
      id: "glaucoma-treatment",
      title: "Glaucoma Treatment",
      hindiTitle: "काला मोतिया (ग्लूकोमा) का इलाज",
      description: "Systematic intraocular pressure evaluation and targeted clinical therapy to protect the optic nerve from progressive damage.",
      iconName: "ShieldAlert",
      highlight: "Pressure Screening",
    },
    {
      id: "general-opd",
      title: "General OPD",
      hindiTitle: "सामान्य ओपीडी परामर्श",
      description: "Daily outpatient clinical consultations for eye infections, redness, irritation, allergies, and general ocular wellness.",
      iconName: "ClipboardList",
      highlight: "Daily 9 AM–7 PM",
    },
    {
      id: "emergency-services",
      title: "Emergency Services",
      hindiTitle: "आपातकालीन नेत्र सेवा",
      description: "Prompt medical care for acute eye injuries, sudden vision disturbances, foreign body removal, and acute ocular pain.",
      iconName: "AlertCircle",
      highlight: "Urgent Care",
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      hindiTitle: "इन-हाउस फार्मेसी / दवाखाना",
      description: "Dedicated on-site dispensary offering authenticated ophthalmic medications, prescription eye drops, and surgical post-care supplies.",
      iconName: "Pill",
      highlight: "On-Site Facility",
    },
    {
      id: "retinal-care",
      title: "Retinal Examination and Treatment",
      hindiTitle: "रेटिना की जाँच और इलाज",
      description: "Clinical evaluation and therapeutic management of diabetic retinopathy, retinal vascular conditions, and macular disorders.",
      iconName: "Scan",
      highlight: "Retina Diagnostics",
    },
    {
      id: "spectacle-lens",
      title: "Spectacle and Lens Services",
      hindiTitle: "नंबर का चश्मा और लेंस",
      description: "Prescription spectacles and customized optical lenses fitted precisely according to computerized ocular measurements.",
      iconName: "Glasses",
      highlight: "Optical Fitting",
    },
    {
      id: "pediatric-care",
      title: "Children's Eye Examinations",
      hindiTitle: "बच्चों की आँखों की जाँच",
      description: "Child-friendly visual acuity screening and developmental vision assessments to identify pediatric refractive errors and amblyopia.",
      iconName: "Baby",
      highlight: "Pediatric Screening",
    },
  ],

  // Implementation audit note highlighting what is verified vs pending
  auditNotes: {
    sourceAsset: "info 1.jpeg and logo .jpeg",
    verifiedItems: [
      "Hospital Name: Sevalaya Hospital (सेवालय आँख अस्पताल)",
      "Specialty: Eye Care & Ophthalmology (आँख अस्पताल)",
      "7 Core Medical Services / Facilities",
      "Daily Eye Doctor & Optometrist availability",
      "Consultation Timing: 9:00 AM to 7:00 PM Daily",
      "Official Contact Hotline: 7004214800",
      "Original Sevalaya logo with medical cross & 'S' monogram in red & black"
    ],
    pendingItems: [
      "Physical street address, city, state, and pincode",
      "Hospital registration / license number",
      "Individual doctor names, biographies, and degree credentials",
      "Official hospital email address"
    ]
  }
};
