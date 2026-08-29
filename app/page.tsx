import { getConfig, getEnabledLinks } from "@/lib/config";
import Hero from "@/components/Hero";
import SocialLinks from "@/components/SocialLinks";
import MinecraftServer from "@/components/MinecraftServer";
import LinkCards from "@/components/LinkCards";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export default function Home() {
  const config = getConfig();
  const enabledLinks = getEnabledLinks(config);

  return (
    <>
      <GridBackground />
      <div className="relative z-10 min-h-screen flex flex-col">
        <main className="flex-1" id="main-content">
          <Hero config={config} />

          <div className="animate-fade-up delay-500">
            <SocialLinks config={config} />
          </div>

          {config.minecraft.enabled && (
            <div className="animate-fade-up delay-600">
              <MinecraftServer minecraft={config.minecraft} />
            </div>
          )}

          {enabledLinks.length > 0 && (
            <div className="animate-fade-up delay-600">
              <LinkCards links={enabledLinks} />
            </div>
          )}
        </main>

        <Footer footer={config.footer} site={config.site} />
      </div>
    </>
  );
}
