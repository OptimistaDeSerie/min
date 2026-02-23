import Header from "@/components/Header";
import GalleryEvents from "@/components/GalleryEvents";
import Footer from "@/components/Footer";

const EventsPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="pt-16">
      <GalleryEvents />
    </div>
    <Footer />
  </div>
);

export default EventsPage;
