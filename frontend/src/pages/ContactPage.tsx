import Header from "@/components/Header";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const ContactPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="pt-16">
      <Contact />
    </div>
    <Footer />
  </div>
);

export default ContactPage;
