import { useState } from "react";
import { Send, Mail, Globe, MapPin, FacebookIcon, X, InstagramIcon, Linkedin} from "lucide-react";
import Swal from "sweetalert2";
import heroIndustry from "@/assets/hero-industry.jpg";
import { contactUs } from "@/services/api"; // your API function

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await contactUs(formData);
      if (res.status !== "success") throw new Error(res.message || "Submission failed");

      await Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you! We will get back to you soon.",
        confirmButtonColor: "#16a34a",
      });

      setFormData({
        full_name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Failed to send message",
        text: error.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <img src={heroIndustry} alt="Contact" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-3 drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-xl mx-auto">
              Reach the Made in Nasarawa Special Project Office directly
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left: Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Get in Touch</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We are here to answer your questions, explore partnership opportunities, and connect
                  you with the right stakeholders within the Made in Nasarawa ecosystem.
                </p>
              </div>

              <div className="space-y-5">
                <a
                  href="mailto:info@madeinnasarawa.ng"
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Email</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      info@madeinnasarawa.ng
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.madeinnasarawa.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors shrink-0">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Website</p>
                    <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      www.madeinnasarawa.ng
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Office Address</p>
                    <p className="font-semibold text-foreground">
                      Office of the Secretary to the Government<br />
                      Nasarawa State, Nigeria
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-4">Follow Us on Social Media</h4>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/people/Made-in-Nasarawa/61584219414953/" target="_blank" className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group" aria-label="Facebook">
                    <FacebookIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a href="https://x.com/info_madeinnas" target="_blank" className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group" aria-label="X (Twitter)">
                    <X className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a href="https://www.instagram.com/info.madeinnas?igsh=MXQ4N3V4OG5xY3hiMQ%3D%3D&utm_source=qr" target="_blank" className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group" aria-label="Instagram">
                    <InstagramIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                  <a href="https://www.linkedin.com/in/made-in-nasarawa-651b233b1/" target="_blank" className="p-3 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group" aria-label="Instagram">
                    <Linkedin className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="relative bg-card rounded-xl border border-border p-8 shadow-md">
              {/* Loading Overlay */}
              {loading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm text-muted-foreground">Sending message...</p>
                  </div>
                </div>
              )}

              <h3 className="text-xl font-bold text-card-foreground mb-2">Send a Message</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Fill in the form and we'll get back to you within a business day.
              </p>

              <form
                className={`space-y-4 ${loading ? "pointer-events-none opacity-60" : ""}`}
                onSubmit={handleSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Full Name</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="e.g. Ahmed Musa"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1 block">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div className="max-w-5xl mx-auto mt-12">
            <div className="rounded-xl overflow-hidden border border-border bg-muted h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-3" />
                <p className="font-semibold text-foreground">Nasarawa State Government Headquarters</p>
                <p className="text-sm text-muted-foreground">Lafia, Nasarawa State, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;