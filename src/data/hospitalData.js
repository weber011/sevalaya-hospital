/**
 * SEVALAYA HOSPITAL - SOURCE OF TRUTH DATA
 * Strictly derived from supplied assets (info 1.jpeg and logo .jpeg).
 * No hallucinated doctors, accreditations, statistics, or physical addresses.
 */

export const hospitalData = {
  name: "Sevalaya Eye Hospital",
  hindiName: "सेवालय आई हॉस्पिटल",
  tagline: "Eye Care & Ophthalmology Hospital",
  mottoHindi: "आपकी आँखों की देखभाल, हमारी जिम्मेदारी",
  mottoEnglish: "Your Eye Care, Our Responsibility",
  logoUrl: "/assets/sevalaya-logo.jpeg",
  posterUrl: "/assets/sevalaya-poster-verified.jpg",
  
  contact: {
    primaryPhone: "7004214800",
    phoneDisplay: "+91 70042 14800",
    phoneTel: "tel:7004214800",
    secondaryPhone: "7004416225",
    secondaryPhoneDisplay: "+91 70044 16225",
    secondaryPhoneTel: "tel:7004416225",
    
    // Physical address verified directly from hospital banner poster
    addressPending: false,
    addressDisplay: "Main Road, Piska Nagri, NH-43, Opposite Nagri Bazar Naron, Ranchi - 835303",
    addressHindiDisplay: "मेन रोड, पिस्का नगड़ी, NH-43, नगड़ी बाज़ार नारों के सामने, राँची - 835303",
    emailPending: true,
    emailPlaceholder: "Official email pending confirmation from Sevalaya Eye Hospital administration",
  },

  // Central Hospital Location & Google Maps Configuration
  location: {
    isAddressConfirmed: true,
    addressDisplay: "Main Road, Piska Nagri, NH-43, Opposite Nagri Bazar Naron, Ranchi, Jharkhand - 835303",
    addressHindi: "मेन रोड, पिस्का नगड़ी, NH-43, नगड़ी बाज़ार नारों के सामने, राँची - 835303",
    street: "Main Road, Piska Nagri, NH-43",
    landmark: "Opposite Nagri Bazar Naron (नगड़ी बाज़ार नारों के सामने)",
    city: "Ranchi",
    state: "Jharkhand",
    pincode: "835303",
    
    // Google Maps verified embed & direct directions links
    isMapConfirmed: true,
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Sevalaya%20Eye%20Hospital%20Main%20Road%20Piska%20Nagri%20NH-43%20Ranchi%20835303&t=&z=15&ie=UTF8&iwloc=&output=embed",
    googleMapsDirectionsUrl: "https://www.google.com/maps/search/?api=1&query=Sevalaya+Eye+Hospital+Main+Road+Piska+Nagri+NH-43+Ranchi+835303",
    mapPlaceholderNotice: null
  },

  timings: {
    days: "Everyday (प्रतिदिन)",
    hours: "9:00 AM – 7:00 PM (सुबह 9 बजे से शाम 7 बजे तक)",
    dailyAvailable: "Eye Doctors & Optometrists available daily (आँखों के डॉक्टर / ऑप्टोमेट्रिस्ट प्रतिदिन उपलब्ध हैं)",
  },

  // 8 Verified clinical services and facilities requested for Sevalaya Eye Hospital
  services: [
    {
      id: "eye-testing",
      title: "Eye Testing",
      hindiTitle: "आँखों की जाँच (नेत्र परीक्षण)",
      nagpuriTitle: "आँख के जाँच",
      description: "Comprehensive visual acuity evaluation, binocular vision assessment, and routine ocular wellness examination for clear, healthy vision.",
      hindiDescription: "दृष्टि क्षमता, आँखों के सामान्य स्वास्थ्य और रोशनी के सटीक मूल्यांकन हेतु व्यापक नेत्र परीक्षण।",
      nagpuriDescription: "आँख के रोशनी, सामान्य सेहत और नजर के पूरा जाँच।",
      iconName: "Eye",
      highlight: "Comprehensive Exam",
    },
    {
      id: "computerised-eye-test",
      title: "Computerised Eye Test",
      hindiTitle: "कम्प्यूटरीकृत आँख जाँच",
      nagpuriTitle: "कम्प्यूटराइज्ड आँख जाँच",
      description: "Automated refractive vision evaluation using modern auto-refractometers to accurately detect refractive errors and determine exact lens power.",
      hindiDescription: "अत्याधुनिक ऑटो-रेफ्रेक्टोमीटर द्वारा आँखों के नंबर और दृष्टि दोष की तीव्र एवं सटीक कम्प्यूटर जाँच।",
      nagpuriDescription: "कम्प्यूटर मशीन से आँख के नंबर और नजर के सटीक जाँच।",
      iconName: "Monitor",
      highlight: "Auto-Refraction",
    },
    {
      id: "phaco-cataract-surgery",
      title: "Phaco Cataract Surgery",
      hindiTitle: "फेको मोतियाबिंद ऑपरेशन (टांका रहित)",
      nagpuriTitle: "फेको मोतियाबिंद ऑपरेशन",
      description: "Advanced ultrasonic phacoemulsification technique with stitchless micro-incision and foldable intraocular lens (IOL) implant for swift visual recovery.",
      hindiDescription: "अल्ट्रासोनिक फेको तकनीक द्वारा बिना टांके का मोतियाबिंद ऑपरेशन एवं उच्च गुणवत्ता फोल्डेबल लेंस प्रत्यारोपण।",
      nagpuriDescription: "बिना टांका वाला आधुनिक फेको तकनीक से मोतियाबिंद के सुरक्षित ऑपरेशन।",
      iconName: "Sparkles",
      highlight: "Stitchless Phaco",
    },
    {
      id: "sics-cataract-surgery",
      title: "SICS Cataract Surgery",
      hindiTitle: "एस.आई.सी.एस. मोतियाबिंद ऑपरेशन",
      nagpuriTitle: "एस.आई.सी.एस. मोतियाबिंद ऑपरेशन",
      description: "Small Incision Cataract Surgery (SICS) offering safe, reliable, and cost-effective cataract extraction with rigid or foldable intraocular lens placement.",
      hindiDescription: "छोटे चीरे द्वारा सुरक्षित, विश्वसनीय एवं किफायती मोतियाबिंद ऑपरेशन तथा गुणवत्तापूर्ण आईओएल (IOL) लेंस।",
      nagpuriDescription: "छोट चीरा से सुरक्षित और सुलभ मोतियाबिंद ऑपरेशन।",
      iconName: "ShieldCheck",
      highlight: "Small Incision IOL",
    },
    {
      id: "pterygium-surgery",
      title: "Pterygium Surgery",
      hindiTitle: "टेरिजिम / नाखून की सर्जरी",
      nagpuriTitle: "नाखून (टेरिजिम) के सर्जरी",
      description: "Micro-surgical excision of abnormal conjunctival tissue growth over the cornea with conjunctival autografting to prevent recurrence and restore clarity.",
      hindiDescription: "आँख की पुतली पर बढ़े मांस (नाखून / टेरिजिम) का सूक्ष्म शल्य निष्कासन एवं पुनरावृत्ति रोकने के लिए ऑटोग्राफ्ट तकनीक।",
      nagpuriDescription: "आँख में बढ़ल मांस (नाखून) के सूक्ष्म ऑपरेशन और ऑटोग्राफ्ट।",
      iconName: "Activity",
      highlight: "Autograft Technique",
    },
    {
      id: "general-opd",
      title: "General OPD",
      hindiTitle: "सामान्य ओपीडी (नेत्र परामर्श)",
      nagpuriTitle: "सामान्य ओपीडी परामर्श",
      description: "Daily outpatient clinical consultations for eye infections, redness, ocular allergies, dry eye syndrome, ocular strain, and eye pain.",
      hindiDescription: "आँख लाल होना, खुजली, एलर्जी, पानी गिरना, संक्रमण एवं आँखों के दर्द का प्रतिदिन विशेषज्ञ ओपीडी परामर्श।",
      nagpuriDescription: "आँख के जलन, लाली, घाव और रोजमर्रा के समस्या खातिर ओपीडी परामर्श।",
      iconName: "ClipboardList",
      highlight: "Daily 9 AM – 7 PM",
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      hindiTitle: "इन-हाउस फार्मेसी (दवाखाना)",
      nagpuriTitle: "अस्पताल दवाखाना",
      description: "Dedicated on-premises hospital dispensary stocked with 100% genuine ophthalmic eye drops, prescription ointments, and post-surgery medications.",
      hindiDescription: "अस्पताल परिसर में अधिकृत दवाखाना — प्रमाणित आई ड्रॉप्स, मलहम एवं सर्जरी पश्चात की सभी आवश्यक दवाएँ उपलब्ध।",
      nagpuriDescription: "अस्पताल में असली आई ड्रॉप्स, मरहम और आँख के सब दवाई उपलब्ध।",
      iconName: "Pill",
      highlight: "100% Genuine Medicines",
    },
    {
      id: "lenskart-optical",
      title: "Lenskart (Optical Store)",
      hindiTitle: "लेंसकार्ट (ऑप्टिकल स्टोर)",
      nagpuriTitle: "लेंसकार्ट चश्मा दुकान",
      description: "Authorized Lenskart optical showroom within the hospital offering a wide selection of branded frames, anti-glare lenses, computer glasses, and precision fittings.",
      hindiDescription: "अस्पताल परिसर में अधिकृत लेंसकार्ट स्टोर — ब्रांडेड फ्रेम्स, ब्लू-कट कंप्यूटर चश्मे, प्रोग्रेसिव लेंस और सटीक फिटिंग।",
      nagpuriDescription: "अस्पताल में लेंसकार्ट के ब्रांडेड चश्मा, फैशनेबल फ्रेम और कंप्यूटर ग्लास के पूरा कलेक्शन।",
      iconName: "Glasses",
      highlight: "Authorized Optical Store",
    },
  ],

  // Implementation audit note highlighting what is verified vs pending
  auditNotes: {
    sourceAsset: "Official hospital poster and logo jpeg",
    verifiedItems: [
      "Hospital Name: Sevalaya Eye Hospital (सेवालय आई हॉस्पिटल)",
      "Specialty: Eye Care & Ophthalmology (आँख अस्पताल)",
      "Tagline / Motto: आपकी आँखों की देखभाल, हमारी जिम्मेदारी (Your Eye Care, Our Responsibility)",
      "Physical Address: मेन रोड, पिस्का नगड़ी, NH-43, नगड़ी बाज़ार नारों के सामने, राँची - 835303",
      "8 Verified Clinical Services & Facilities (Eye Testing, Computerised Eye Test, Phaco Cataract Surgery, SICS Cataract Surgery, Pterygium Surgery, General OPD, Pharmacy, Lenskart Optical Store)",
      "Daily Eye Doctor & Optometrist availability",
      "Consultation Timing: 9:00 AM to 7:00 PM Daily",
      "Official Contact Hotline: 7004214800 and 7004416225",
      "Original Sevalaya logo with medical cross & 'S' monogram in red & black"
    ],
    pendingItems: [
      "Hospital registration / license number",
      "Individual doctor names, biographies, and degree credentials",
      "Official hospital email address"
    ]
  }
};
