import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import QuickAccessCards from "@/components/QuickAccessCards";
import VisionMission from "@/components/VisionMission";
import Footer from "@/components/Footer";
import ObjectivesTeaser from "@/components/ObjectivesTeaser";
import FeaturedEvents from "@/components/FeaturedEvents";
import ProgramsTeaser from "@/components/ProgramsTeaser";
import PartnershipCTA from "@/components/PartnershipCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSlider />
      <QuickAccessCards />
      <VisionMission />
      <ObjectivesTeaser />
      <FeaturedEvents />
      <ProgramsTeaser />
      <PartnershipCTA />
      <Footer />
    </div>
  );
};

export default Index;
