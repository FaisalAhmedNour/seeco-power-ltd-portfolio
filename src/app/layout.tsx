import type { Metadata } from "next";
import { AR_One_Sans, Kanit, Montserrat } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Widgets from "@/components/widgets/Widgets";
import WelcomeModal from "@/components/widgets/WelcomeModal";
import { getSiteSettings } from "@/lib/settings";
import SiteThemeInitializer from "@/components/widgets/SiteThemeInitializer";

// Configure the AR One Sans font
const arOneSansFont = AR_One_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arone",
  display: "swap",
});

// Configure the Kanit font
const kanitFont = Kanit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-kanit",
  display: "swap",
});

// Configure the Montserrat font
const montserratFont = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: "SEECO Power Limited",
    description: "SEECO Power Limited leads the industry with reliable, transformer solutions, shaping the future of energy.",
    icons: {
      icon: settings.faviconPath || "/icon.png",
    },
  };
}

/**
 * RootLayout Component.
 * Integrates Next.js layout structure, wraps the page body,
 * and injects optimized Google Fonts variables.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className="scroll-smooth"
      data-default-color={settings.primaryColor}
      data-default-color-hover={settings.primaryColorHover}
      suppressHydrationWarning
    >
      <head>
        <style
          id="theme-primary-colors"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --primary-color: ${settings.primaryColor};
                --primary-color-hover: ${settings.primaryColorHover};
              }
            `,
          }}
        />
      </head>

      <body
        className={[
          arOneSansFont.variable,
          kanitFont.variable,
          montserratFont.variable,
          "antialiased font-arone",
        ].join(" ")}
        suppressHydrationWarning
      >
        <LanguageProvider initialSettings={settings}>
          <SiteThemeInitializer />
          <div className="relative flex flex-col min-h-screen">
            <Header />
            <main className="grow">
              {children}
            </main>
            <Footer />
            <Widgets />
            <WelcomeModal />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
