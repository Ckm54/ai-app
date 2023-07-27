import LandingContent from "@/components/Landing/LandingContent";
import LandingHero from "@/components/Landing/LandingHero";
import LandingPageNavbar from "@/components/Navigation/LandingPageNavbar";

const LandingPage = () => {
  return (
    <div className="h-full">
      <LandingPageNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
