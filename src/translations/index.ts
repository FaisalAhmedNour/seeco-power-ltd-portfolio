export interface TranslationSchema {
  nav: {
    home: string;
    aboutUs: string;
    products: string;
    distributionTransformers: string;
    powerTransformers: string;
    specialTypeTransformers: string;
    dryTypeTransformers: string;
    lovolDiselGenerator: string;
    electricSwitchgear: string;
    bbtBusBarTrunkingSystem: string;
    renewableEnergy: string;
    service: string;
    blog: string;
    contact: string;
    notice: string;
  };
  contactInfo: {
    address: string;
    email: string;
    email2: string;
    emailLabel: string;
    email2Label: string;
    phone: string;
  };
  hero: {
    badge: string;
    title: string;
    description: string;
    button: string;
  };
  brandIntro: {
    subtitle: string;
    title: string;
    description: string;
  };
  brandBanner: {
    leftPara1: string;
    leftPara2: string;
    rightLabel: string;
    rightTitle: string;
  };
  contactCTA: {
    title: string;
    button: string;
  };
  productsGrid: {
    learnMore: string;
    distributionTitle: string;
    distributionDesc: string;
    powerTitle: string;
    powerDesc: string;
    specialTitle: string;
    specialDesc: string;
    dryTitle: string;
    dryDesc: string;
  };
  widgets: {
    messageUs: string;
  };
  latestNews: {
    title: string;
    subtitle: string;
    post1Title: string;
    post1Excerpt: string;
    post2Title: string;
    post2Excerpt: string;
    post3Title: string;
    post3Excerpt: string;
  };
  footer: {
    quickLinks: string;
    support: string;
    productsHeader: string;
    privacyPolicy: string;
    cookiePolicy: string;
    termsOfService: string;
    deliveryReturnPolicy: string;
    hqLabel: string;
  };
}

export const translations: Record<"en" | "bn", TranslationSchema> = {
  en: {
    nav: {
      home: "Home",
      aboutUs: "About Us",
      products: "Products",
      distributionTransformers: "Distribution Transformers",
      powerTransformers: "Power Transformers",
      specialTypeTransformers: "Special Type Transformers",
      dryTypeTransformers: "Dry-Type Transformer",

      lovolDiselGenerator: "Lovol Diesel Generator",
      electricSwitchgear: "Electric Switchgear",
      bbtBusBarTrunkingSystem: "BBT- Bus Bar Trunking System",
      renewableEnergy: "Renewable Energy",

      service: "Service / Maintenance",
      blog: "Blog",
      contact: "Contact",
      notice: "Notice",
    },
    contactInfo: {
      address: "Ekuria Tila Bari, South Keranigonj Dhaka- 1311",
      email: "info@seecopowerlimited.com",
      email2: "seecopowerltd@gmail.com",
      emailLabel: "General Inquiry",
      email2Label: "Sales / Support",
      phone: "+88 01714-102859",
    },
    hero: {
      badge: "High Efficiency & High Performance",
      title: "Power & Distribution Transformers",
      description: "We provide quality with years of experience and our expert team.",
      button: "Contact Us",
    },
    brandIntro: {
      subtitle: "SEECO Transformer",
      title: "High Quality Distribution & Power Transformers",
      description: "SEECO Transformer holds a leading position in the transformer industry with its accumulated expertise and reliability. With our commitment to uncompromising quality and a customer-centric approach, we shape the industry and build the energy infrastructure of the future through our innovative solutions.",
    },
    brandBanner: {
      leftPara1: "SEECO Transformer is a trusted name in the energy sector, offering high-performance transformer solutions tailored to modern infrastructure needs.",
      leftPara2: "With our innovative production approach and customer-oriented mindset, we support critical energy projects across the globe. We don’t just deliver products — we deliver long-term value and reliability.",
      rightLabel: "Energizing Today",
      rightTitle: "Empowering Tomorrow",
    },
    contactCTA: {
      title: "Contact Us And Start Your Project!",
      button: "Get Started",
    },
    productsGrid: {
      learnMore: "Learn More",
      distributionTitle: "Distribution Transformers",
      distributionDesc: "SEECO Transformer's distribution transformers ensure efficient voltage conversion for safe energy delivery in residential, industrial, and commercial areas.",
      powerTitle: "Power Transformers",
      powerDesc: "SEECO Transformer provides industry-specific solutions with high-quality power transformers, transforming energy infrastructure with safety and efficiency.",
      specialTitle: "Special Type Transformers",
      specialDesc: "SEECO Transformer’s special-type transformers ensure efficient voltage conversion for safe energy delivery in residential, industrial, and commercial areas.",
      dryTitle: "Dry-Type Transformers",
      dryDesc: "SEECO Transformer’s dry-type transformers ensure efficient voltage conversion for safe energy delivery in residential, industrial, and commercial areas.",
    },
    widgets: {
      messageUs: "Message Us",
    },
    latestNews: {
      title: "Latest News",
      subtitle: "Discover the latest updates in the energy world, innovations in transformer technology, and expert insights from the industry on our blog page.",
      post1Title: "Lovol Diesel Generator",
      post1Excerpt: "U.S. Buyer’s Guide for Transformers Selecting the right transformer class—especially between distribution transformers, power transformers, and step-up transformers - can...",
      post2Title: "Electric Switchgear",
      post2Excerpt: "Electricity is the backbone of modern life, powering industries, businesses, and homes worldwide. However, the efficient and safe transmission of...",
      post3Title: "BBT- Bus Bar Trunking System",
      post3Excerpt: "The importance of electricity in our daily lives is undeniable. From the outlets in our homes to the massive machines...",
    },
    footer: {
      quickLinks: "Quick Links",
      support: "Support",
      productsHeader: "Products",
      privacyPolicy: "Privacy Policy",
      cookiePolicy: "Cookie Policy",
      termsOfService: "Terms of Services",
      deliveryReturnPolicy: "Return Policy",
      hqLabel: "SPL",
    },
  },
  bn: {
    nav: {
      home: "হোম",
      aboutUs: "আমাদের সম্পর্কে",
      products: "পণ্যসমূহ",
      distributionTransformers: "ডিস্ট্রিবিউশন ট্রান্সফরমার",
      powerTransformers: "পাওয়ার ট্রান্সফরমার",
      specialTypeTransformers: "স্পেশাল টাইপ ট্রান্সফরমার",
      dryTypeTransformers: "ড্রাই-টাইপ ট্রান্সফরমার",

      lovolDiselGenerator: "লোভল ডিজেল জেনারেটর",
      electricSwitchgear: "বৈদ্যুতিক সুইচগিয়ার",
      bbtBusBarTrunkingSystem: "বিবিটি- বাস বার ট্রাংকিং সিস্টেম",
      renewableEnergy: "নবায়নযোগ্য শক্তি",

      service: "সেবা / রক্ষণাবেক্ষণ",
      blog: "ব্লগ",
      contact: "যোগাযোগ",
      notice: "নোটিশ",
    },
    contactInfo: {
      address: "ইকুরিয়া টিলা বাড়ি, দক্ষিণ কেরানীগঞ্জ, ঢাকা- ১৩১১",
      email: "info@seecopowerlimited.com",
      email2: "seecopowerltd@gmail.com",
      emailLabel: "সাধারণ অনুসন্ধান",
      email2Label: "বিক্রয় / সহায়তা",
      phone: "+৮৮ ০১৭১৪-১০২৮৫৯",
    },
    hero: {
      badge: "উচ্চ দক্ষতা ও উচ্চ কার্যক্ষমতা",
      title: "পাওয়ার ও ডিস্ট্রিবিউশন ট্রান্সফরমার",
      description: "আমরা দীর্ঘ বছরের অভিজ্ঞতা এবং আমাদের বিশেষজ্ঞ দলের সাথে মানসম্পন্ন সেবা প্রদান করি।",
      button: "যোগাযোগ করুন",
    },
    brandIntro: {
      subtitle: "সিকো ট্রান্সফরমার",
      title: "উচ্চ মানের ডিস্ট্রিবিউশন ও পাওয়ার ট্রান্সফরমারসমূহ",
      description: "সিকো ট্রান্সফরমার তার অর্জিত দক্ষতা ও নির্ভরযোগ্যতার সাথে ট্রান্সফরমার শিল্পে একটি অগ্রণী অবস্থানে রয়েছে। আপসহীন গুণমান এবং গ্রাহক-কেন্দ্রিক দৃষ্টিভঙ্গির প্রতি আমাদের প্রতিশ্রুতি সহ, আমরা শিল্পটিকে রূপ দিই এবং আমাদের উদ্ভাবনী সমাধানের মাধ্যমে ভবিষ্যতের জ্বালানি অবকাঠামো তৈরি করি।",
    },
    brandBanner: {
      leftPara1: "সিকো ট্রান্সফরমার জ্বালানি খাতে একটি বিশ্বস্ত নাম, যা আধুনিক অবকাঠামোর প্রয়োজন অনুসারে উচ্চ-ক্ষমতাসম্পন্ন ট্রান্সফরমার সমাধান সরবরাহ করে।",
      leftPara2: "আমাদের উদ্ভাবনী উৎপাদন পদ্ধতি এবং গ্রাহক-বান্ধব মনোভাবের সাথে, আমরা বিশ্বজুড়ে গুরুত্বপূর্ণ জ্বালানি প্রকল্পগুলোতে সহায়তা করি। আমরা শুধু পণ্য সরবরাহ করি না — আমরা দীর্ঘমেয়াদী মূল্য এবং নির্ভরযোগ্যতা প্রদান করি।",
      rightLabel: "এনার্জাইজিং টুডে",
      rightTitle: "এম্পাওয়ারিং টুমোরো",
    },
    contactCTA: {
      title: "আমাদের সাথে যোগাযোগ করুন এবং আপনার প্রজেক্ট শুরু করুন!",
      button: "শুরু করুন",
    },
    productsGrid: {
      learnMore: "আরও জানুন",
      distributionTitle: "ডিস্ট্রিবিউশন ট্রান্সফরমার",
      distributionDesc: "সিকো ট্রান্সফরমারের ডিস্ট্রিবিউশন ট্রান্সফরমারসমূহ আবাসিক, শিল্প এবং বাণিজ্যিক এলাকায় নিরাপদ বিদ্যুৎ সরবরাহের জন্য দক্ষ ভোল্টেজ রূপান্তর নিশ্চিত করে।",
      powerTitle: "পাওয়ার ট্রান্সফরমার",
      powerDesc: "সিকো ট্রান্সফরমার উচ্চ-মানের পাওয়ার ট্রান্সফরমারের সাথে শিল্প-নির্দিষ্ট সমাধান প্রদান করে, নিরাপত্তা এবং দক্ষতার সাথে জ্বালানি অবকাঠামোকে রূপান্তরিত করে।",
      specialTitle: "স্পেশাল টাইপ ট্রান্সফরমার",
      specialDesc: "সিকো ট্রান্সফরমারের স্পেশাল-টাইপ ট্রান্সফরমারসমূহ আবাসিক, শিল্প এবং বাণিজ্যিক এলাকায় নিরাপদ বিদ্যুৎ সরবরাহের জন্য দক্ষ ভোল্টেজ রূপান্তর নিশ্চিত করে।",
      dryTitle: "ড্রাই-টাইপ ট্রান্সফরমার",
      dryDesc: "সিকো ট্রান্সফরমারের ড্রাই-টাইপ ট্রান্সফরমারসমূহ আবাসিক, শিল্প এবং বাণিজ্যিক এলাকায় নিরাপদ বিদ্যুৎ সরবরাহের জন্য দক্ষ ভোল্টেজ রূপান্তর নিশ্চিত করে।",
    },
    widgets: {
      messageUs: "বার্তা পাঠান",
    },
    latestNews: {
      title: "সাম্প্রতিক সংবাদ",
      subtitle: "আমাদের ব্লগে জ্বালানি বিশ্বের সর্বশেষ আপডেট, ট্রান্সফরমার প্রযুক্তির উদ্ভাবন এবং শিল্প বিশেষজ্ঞদের মতামত জানুন।",
      post1Title: "ডিস্ট্রিবিউশন বনাম পাওয়ার বনাম স্টেপ-আপ ট্রান্সফরমার: ইউএসএ",
      post1Excerpt: "ইউএসএ ক্রেতাদের জন্য গাইড - সঠিক ট্রান্সফরমার নির্বাচন করা—বিশেষ করে ডিস্ট্রিবিউশন, পাওয়ার এবং স্টেপ-আপ ট্রান্সফরমারের মধ্যে...",
      post2Title: "পাওয়ার ট্রান্সফরমার: চমৎকার ট্রান্সফরমারসমূহ",
      post2Excerpt: "বিদ্যুৎ আধুনিক জীবনের মেরুদণ্ড, যা বিশ্বব্যাপী শিল্প, ব্যবসা এবং বাসাবাড়িতে শক্তি সরবরাহ করে। তবে, এর দক্ষ এবং নিরাপদ সঞ্চালন...",
      post3Title: "সিকো ডিস্ট্রিবিউশন ট্রান্সফরমারসমূহ",
      post3Excerpt: "আমাদের দৈনন্দিন জীবনে বিদ্যুতের গুরুত্ব অনস্বীকার্য। আমাদের ঘরের আউটলেট থেকে শুরু করে বিশাল যন্ত্রপাতি পর্যন্ত...",
    },
    footer: {
      quickLinks: "কুইক লিংকসমূহ",
      support: "সাপোর্ট",
      productsHeader: "পণ্যসমূহ",
      privacyPolicy: "প্রাইভেসি পলিসি",
      cookiePolicy: "কুকি পলিসি",
      termsOfService: "টার্মস অফ সার্ভিস",
      deliveryReturnPolicy: "রিটার্ন পলিসি",
      hqLabel: "এসপিএল",
    },
  },
};
