import Header from "@/components/Header";
import ProgramClusters from "@/components/ProgramClusters";
import Footer from "@/components/Footer";

const ProgramsPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="pt-16">
      <ProgramClusters />
    </div>
    <Footer />
  </div>
);

export default ProgramsPage;
