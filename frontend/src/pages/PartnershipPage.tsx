import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Handshake, Building2, Users, TrendingUp, CheckCircle, Send } from "lucide-react";
import heroIndustry from "@/assets/hero-industry.jpg";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroSme from "@/assets/hero-sme.jpg";
import { submitPartnership } from "@/services/api";
import Swal from "sweetalert2";

const partnerTypes = [
  { icon: Building2, title: "Government Agencies", description: "MDAs, ministries, and parastatal bodies collaborating on local procurement, regulatory support, and policy implementation." },
  { icon: TrendingUp, title: "Private Investors", description: "Companies and individuals investing in manufacturing, processing, technology, and infrastructure across Nasarawa's sectors." },
  { icon: Users, title: "NGOs & Development Partners", description: "International and local organizations supporting SME development, skills training, and market access initiatives." },
  { icon: Handshake, title: "Industry Associations", description: "Trade groups, cooperatives, and industry bodies aligned with Nasarawa's productive sectors and value chains." },
];

const benefits = [
  "Access to Nasarawa State's growing consumer and producer networks",
  "Co-branding opportunities with the Made in Nasarawa brand",
  "Priority access to government procurement opportunities",
  "Participation in flagship exhibitions and trade fairs",
  "Engagement with key decision-makers in the state government",
  "Impact visibility through our official communications channels",
];

const successStories = [
  { image: heroAgriculture, name: "AgriProcess Nigeria Ltd", sector: "Agricultural Processing", story: "Partnered with the Made in Nasarawa initiative to establish a cassava processing facility, creating 120 direct jobs and connecting 300 smallholder farmers to formal markets." },
  { image: heroSme, name: "Lafia Craft Collective", sector: "SME & Artisans", story: "A cooperative of 45 women artisans that received branding support, digital training, and trade fair placement, increasing their combined revenue by 40% within one year." },
  { image: heroIndustry, name: "NasMin Resources Ltd", sector: "Solid Minerals", story: "An early investor in the Minerals Catalogue program, now operating a licensed baryte processing plant that exports to three West African countries." },
];

const PartnershipPage = () => {
  // form state
  const [formData, setFormData] = useState({
    full_name: "",
    organization: "",
    email: "",
    partnership_type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitPartnership(formData);
      if (res.status !== "success") {
        throw new Error(res.message || "Submission failed");
      }

      // SUCCESS ALERT
      await Swal.fire({
        icon: "success",
        title: "Inquiry Sent Successfully!",
        text: "We will contact you shortly.",
        confirmButtonColor: "#16a34a",
      });

      // Reset form
      setFormData({
        full_name: "",
        organization: "",
        email: "",
        partnership_type: "",
        message: "",
      });

    } catch (error: any) {
      // ERROR ALERT
      await Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Hero */}
        <section className="relative h-64 md:h-80 overflow-hidden">
          <img src={heroIndustry} alt="Partnership" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-secondary/75" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-3 drop-shadow-lg">
                Partner With Us
              </h1>
              <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join the movement transforming Nasarawa State into a hub of production and prosperity
              </p>
            </div>
          </div>
        </section>

        {/* Why Partner Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Why Partner with Made in Nasarawa?
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  The Made in Nasarawa Special Project Office sits at the nexus of government policy,
                  private enterprise, and community development. Partnering with us gives you
                  access to one of North-Central Nigeria's fastest-growing economic ecosystems.
                </p>
                <ul className="space-y-3">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {partnerTypes.map((p) => (
                  <div key={p.title} className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 hover:shadow-md transition-all group">
                    <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                      <p.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-card-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="section-padding bg-muted">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title">Partnership Success Stories</h2>
              <p className="section-subtitle">
                Real impact from organizations already working with the Made in Nasarawa initiative
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {successStories.map((story, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all">
                  <div className="relative h-44 overflow-hidden">
                    <img src={story.image} alt={story.name} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-xs font-bold text-primary-foreground bg-primary px-3 py-1 rounded-full">{story.sector}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-card-foreground text-lg mb-3">{story.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{story.story}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Inquiry Form */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <h2 className="section-title">Express Your Interest</h2>
              <p className="section-subtitle">
                Ready to collaborate? Tell us about your organization and how you'd like to partner with us.
              </p>
            </div>
            <div className="relative max-w-2xl mx-auto bg-card rounded-xl border border-border p-8 shadow-md">
              {loading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-muted-foreground">Submitting...</p>
                  </div>
                </div>
              )}
              <form className={`space-y-4 ${loading ? "pointer-events-none opacity-60" : ""}`} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Organization</label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your Organization"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@organization.com"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Partnership Type</label>
                  <select
                    name="partnership_type"
                    value={formData.partnership_type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  >
                    <option value="">Select partnership type...</option>
                    <option>Government Agency</option>
                    <option>Private Investment</option>
                    <option>NGO / Development Partner</option>
                    <option>Industry Association</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">How Would You Like to Collaborate?</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your partnership interest or proposal..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Submitting..." : "Submit Partnership Inquiry"}
                </button>
              </form>
              {success && <p className="text-green-600 mt-4 text-center">Form submitted successfully!</p>}
            </div>

            <div className="text-center mt-8">
              <p className="text-muted-foreground text-sm">
                Prefer to reach us directly?{" "}
                <Link to="/contact" className="text-primary font-semibold hover:underline">
                  Visit our Contact page →
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PartnershipPage;