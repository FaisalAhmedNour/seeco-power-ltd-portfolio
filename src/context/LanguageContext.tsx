"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationSchema } from "@/translations";

// Supported language options
export type LanguageType = "en" | "bn";

interface LanguageContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
  logoPath: string;
  faviconPath: string;
  contactCTAImagePath: string;
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
    youtube?: string;
  };
  googleMapsEmbedUrl: string;
  aboutImagePath: string;
  policies?: {
    privacyEn: string;
    privacyBn: string;
    cookieEn: string;
    cookieBn: string;
    termsEn: string;
    termsBn: string;
    returnEn: string;
    returnBn: string;
  };
  welcomeModal?: {
    active: boolean;
    imagePath: string;
    suppressionDays: number;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * LanguageProvider Component.
 * Wraps the application to provide translation state.
 * Prevents hydration mismatches by defaulting to English on server-render,
 * and loading localStorage settings after client mount.
 */
export function LanguageProvider({
  children,
  initialSettings,
}: {
  children: React.ReactNode;
  initialSettings?: any;
}) {
  const [language, setLanguageState] = useState<LanguageType>("en");
  const [isMounted, setIsMounted] = useState(false);
  const [version, setVersion] = useState(0);

  const defaultLogo = "/images/SEECOI1.png";
  const defaultFavicon = "/icon.png";
  const defaultContactCTA = "/images/transformer-maintenance.webp";

  const [logoPath, setLogoPath] = useState(initialSettings?.logoPath || defaultLogo);
  const [faviconPath, setFaviconPath] = useState(initialSettings?.faviconPath || defaultFavicon);
  const [contactCTAImagePath, setContactCTAImagePath] = useState(initialSettings?.contactCTAImagePath || defaultContactCTA);

  const defaultSocials = {
    facebook: "https://www.facebook.com/seecopowerlimited",
    linkedin: "http://www.linkedin.com/in/seeco-power-limited-132341417",
    instagram: "https://www.instagram.com/seecopowerltd",
    youtube: "https://youtube.com/@seecopowerlimited?si=FQoSyl9caktLh6n1",
  };

  const defaultMap = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3653.7970229477864!2d90.4149776!3d23.6832157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b900021a5b69%3A0xc06a1d879677ec5!2sSEECO%20Power%20Limited!5e0!3m2!1sen!2sbd!4v1781979253429!5m2!1sen!2sbd";
  const defaultAboutImage = "/images/Transformers-Be-Maintained.png";

  const [socialLinks, setSocialLinks] = useState(initialSettings?.socialLinks || defaultSocials);
  const [googleMapsEmbedUrl, setGoogleMapsEmbedUrl] = useState(initialSettings?.googleMapsEmbedUrl || defaultMap);
  const [aboutImagePath, setAboutImagePath] = useState(initialSettings?.aboutImagePath || defaultAboutImage);
  const [policies, setPolicies] = useState(initialSettings?.policies);
  const [welcomeModal, setWelcomeModal] = useState(initialSettings?.welcomeModal);

  // Sync translations if initialSettings has brandBannerSlogan on load
  if (initialSettings?.brandBannerSlogan) {
    const slogan = initialSettings.brandBannerSlogan;
    if (translations.en.brandBanner) {
      translations.en.brandBanner.rightLabel = slogan.rightLabelEn || translations.en.brandBanner.rightLabel;
      translations.en.brandBanner.rightTitle = slogan.rightTitleEn || translations.en.brandBanner.rightTitle;
    }
    if (translations.bn.brandBanner) {
      translations.bn.brandBanner.rightLabel = slogan.rightLabelBn || translations.bn.brandBanner.rightLabel;
      translations.bn.brandBanner.rightTitle = slogan.rightTitleBn || translations.bn.brandBanner.rightTitle;
    }
  }

  // Sync translations if initialSettings has aboutIntro on load
  if (initialSettings?.aboutIntro) {
    const about = initialSettings.aboutIntro;
    if (translations.en.about) {
      translations.en.about.introSubtitle = about.subtitleEn || translations.en.about.introSubtitle;
      translations.en.about.introTitle = about.titleEn || translations.en.about.introTitle;
      translations.en.about.introPara1 = about.para1En || translations.en.about.introPara1;
      translations.en.about.introPara2 = about.para2En || translations.en.about.introPara2;
    }
    if (translations.bn.about) {
      translations.bn.about.introSubtitle = about.subtitleBn || translations.bn.about.introSubtitle;
      translations.bn.about.introTitle = about.titleBn || translations.bn.about.introTitle;
      translations.bn.about.introPara1 = about.para1Bn || translations.bn.about.introPara1;
      translations.bn.about.introPara2 = about.para2Bn || translations.bn.about.introPara2;
    }
  }

  // Sync translations if initialSettings has missionVision on load
  if (initialSettings?.missionVision) {
    const mv = initialSettings.missionVision;
    if (translations.en.missionVision) {
      translations.en.missionVision.missionPoints = mv.missionPointsEn || translations.en.missionVision.missionPoints;
      translations.en.missionVision.visionText = mv.visionTextEn || translations.en.missionVision.visionText;
      translations.en.missionVision.valuesPoints = mv.valuesPointsEn || translations.en.missionVision.valuesPoints;
    }
    if (translations.bn.missionVision) {
      translations.bn.missionVision.missionPoints = mv.missionPointsBn || translations.bn.missionVision.missionPoints;
      translations.bn.missionVision.visionText = mv.visionTextBn || translations.bn.missionVision.visionText;
      translations.bn.missionVision.valuesPoints = mv.valuesPointsBn || translations.bn.missionVision.valuesPoints;
    }
  }

  useEffect(() => {
    // Read from localStorage on mount to preserve state
    const savedLanguage = localStorage.getItem("preferred_language") as LanguageType;
    if (savedLanguage === "en" || savedLanguage === "bn") {
      setLanguageState(savedLanguage);
      document.documentElement.lang = savedLanguage;
    }
    setIsMounted(true);
  }, []);

  useEffect(() => {
    async function loadContactInfo() {
      try {
        const res = await fetch("/api/public/contact-info");
        if (res.ok) {
          const data = await res.json();
          if (translations.en.contactInfo) {
            translations.en.contactInfo.address = data.addressEn || translations.en.contactInfo.address;
            translations.en.contactInfo.factoryAddress = data.factoryAddressEn || translations.en.contactInfo.factoryAddress;
            translations.en.contactInfo.email = data.email || translations.en.contactInfo.email;
            translations.en.contactInfo.email2 = data.email2 !== undefined ? data.email2 : translations.en.contactInfo.email2;
            translations.en.contactInfo.phone = data.phone || translations.en.contactInfo.phone;
            translations.en.contactInfo.phone2 = data.phone2 !== undefined ? data.phone2 : translations.en.contactInfo.phone2;
            translations.en.contactInfo.whatsapp = data.whatsapp || translations.en.contactInfo.whatsapp;
          }
          if (translations.bn.contactInfo) {
            translations.bn.contactInfo.address = data.addressBn || translations.bn.contactInfo.address;
            translations.bn.contactInfo.factoryAddress = data.factoryAddressBn || translations.bn.contactInfo.factoryAddress;
            translations.bn.contactInfo.email = data.email || translations.bn.contactInfo.email;
            translations.bn.contactInfo.email2 = data.email2 !== undefined ? data.email2 : translations.bn.contactInfo.email2;
            translations.bn.contactInfo.phone = data.phone || translations.bn.contactInfo.phone;
            translations.bn.contactInfo.phone2 = data.phone2 !== undefined ? data.phone2 : translations.bn.contactInfo.phone2;
            translations.bn.contactInfo.whatsapp = data.whatsapp || translations.bn.contactInfo.whatsapp;
          }
          setVersion((v) => v + 1);
        }
      } catch (err) {
        console.error("Failed to load dynamic contact details:", err);
      }
    }
    loadContactInfo();
  }, []);

  useEffect(() => {
    async function loadPublicSettings() {
      try {
        const res = await fetch("/api/public/settings");
        if (res.ok) {
          const data = await res.json();
          if (data.logoPath) setLogoPath(data.logoPath);
          if (data.faviconPath) setFaviconPath(data.faviconPath);
          if (data.contactCTAImagePath) setContactCTAImagePath(data.contactCTAImagePath);
          if (data.socialLinks) setSocialLinks(data.socialLinks);
          if (data.googleMapsEmbedUrl) setGoogleMapsEmbedUrl(data.googleMapsEmbedUrl);
          if (data.aboutImagePath) setAboutImagePath(data.aboutImagePath);
          if (data.aboutIntro) {
            const about = data.aboutIntro;
            if (translations.en.about) {
              translations.en.about.introSubtitle = about.subtitleEn || translations.en.about.introSubtitle;
              translations.en.about.introTitle = about.titleEn || translations.en.about.introTitle;
              translations.en.about.introPara1 = about.para1En || translations.en.about.introPara1;
              translations.en.about.introPara2 = about.para2En || translations.en.about.introPara2;
            }
            if (translations.bn.about) {
              translations.bn.about.introSubtitle = about.subtitleBn || translations.bn.about.introSubtitle;
              translations.bn.about.introTitle = about.titleBn || translations.bn.about.introTitle;
              translations.bn.about.introPara1 = about.para1Bn || translations.bn.about.introPara1;
              translations.bn.about.introPara2 = about.para2Bn || translations.bn.about.introPara2;
            }
          }
          if (data.missionVision) {
            const mv = data.missionVision;
            if (translations.en.missionVision) {
              translations.en.missionVision.missionPoints = mv.missionPointsEn || translations.en.missionVision.missionPoints;
              translations.en.missionVision.visionText = mv.visionTextEn || translations.en.missionVision.visionText;
              translations.en.missionVision.valuesPoints = mv.valuesPointsEn || translations.en.missionVision.valuesPoints;
            }
            if (translations.bn.missionVision) {
              translations.bn.missionVision.missionPoints = mv.missionPointsBn || translations.bn.missionVision.missionPoints;
              translations.bn.missionVision.visionText = mv.visionTextBn || translations.bn.missionVision.visionText;
              translations.bn.missionVision.valuesPoints = mv.valuesPointsBn || translations.bn.missionVision.valuesPoints;
            }
          }
          if (data.policies) {
            setPolicies(data.policies);
          }
          if (data.welcomeModal) {
            setWelcomeModal(data.welcomeModal);
          }
          if (data.brandIntro) {
            const intro = data.brandIntro;
            if (translations.en.brandIntro) {
              translations.en.brandIntro.subtitle = intro.subtitleEn || translations.en.brandIntro.subtitle;
              translations.en.brandIntro.title = intro.titleEn || translations.en.brandIntro.title;
              translations.en.brandIntro.description = intro.descriptionEn || translations.en.brandIntro.description;
            }
            if (translations.bn.brandIntro) {
              translations.bn.brandIntro.subtitle = intro.subtitleBn || translations.bn.brandIntro.subtitle;
              translations.bn.brandIntro.title = intro.titleBn || translations.bn.brandIntro.title;
              translations.bn.brandIntro.description = intro.descriptionBn || translations.bn.brandIntro.description;
            }
          }
          if (data.brandBannerSlogan) {
            const slogan = data.brandBannerSlogan;
            if (translations.en.brandBanner) {
              translations.en.brandBanner.rightLabel = slogan.rightLabelEn || translations.en.brandBanner.rightLabel;
              translations.en.brandBanner.rightTitle = slogan.rightTitleEn || translations.en.brandBanner.rightTitle;
            }
            if (translations.bn.brandBanner) {
              translations.bn.brandBanner.rightLabel = slogan.rightLabelBn || translations.bn.brandBanner.rightLabel;
              translations.bn.brandBanner.rightTitle = slogan.rightTitleBn || translations.bn.brandBanner.rightTitle;
            }
          }
          if (data.brandBanner) {
            const banner = data.brandBanner;
            if (translations.en.brandBanner) {
              translations.en.brandBanner.leftPara1 = banner.leftPara1En || translations.en.brandBanner.leftPara1;
              translations.en.brandBanner.leftPara2 = banner.leftPara2En || translations.en.brandBanner.leftPara2;
            }
            if (translations.bn.brandBanner) {
              translations.bn.brandBanner.leftPara1 = banner.leftPara1Bn || translations.bn.brandBanner.leftPara1;
              translations.bn.brandBanner.leftPara2 = banner.leftPara2Bn || translations.bn.brandBanner.leftPara2;
            }
          }
          setVersion((v) => v + 1);
        }
      } catch (err) {
        console.error("Failed to load public settings dynamically:", err);
      }
    }
    loadPublicSettings();
  }, []);

  const setLanguage = (lang: LanguageType) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const dictionary = translations[language];
    const parts = key.split(".");
    let current: any = dictionary;

    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        // Fallback to English dictionary if key is missing in active language
        let fallback: any = translations["en"];
        for (const fbPart of parts) {
          if (fallback && fallback[fbPart] !== undefined) {
            fallback = fallback[fbPart];
          } else {
            return key; // return key as final fallback
          }
        }
        return fallback;
      }
    }
    return typeof current === "string" ? current : key;
  };

  const tArray = (key: string): string[] => {
    const dictionary = translations[language];
    const parts = key.split(".");
    let current: any = dictionary;

    for (const part of parts) {
      if (current && current[part] !== undefined) {
        current = current[part];
      } else {
        // Fallback to English dictionary
        let fallback: any = translations["en"];
        for (const fbPart of parts) {
          if (fallback && fallback[fbPart] !== undefined) {
            fallback = fallback[fbPart];
          } else {
            return [];
          }
        }
        return Array.isArray(fallback) ? fallback : [];
      }
    }
    return Array.isArray(current) ? current : [];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tArray, logoPath, faviconPath, contactCTAImagePath, socialLinks, googleMapsEmbedUrl, aboutImagePath, policies, welcomeModal }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to consume the language context.
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
