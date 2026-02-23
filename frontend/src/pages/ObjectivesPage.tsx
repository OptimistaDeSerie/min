import Header from "@/components/Header";
import Objectives from "@/components/Objectives";
import Footer from "@/components/Footer";

const ObjectivesPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="pt-16">
      <Objectives />
    </div>
    <Footer />
  </div>
);

export default ObjectivesPage;
