import { Link } from "react-router-dom";
import { Handshake, ArrowRight } from "lucide-react";

const PartnershipCTA = () => (
  <section className="section-padding bg-secondary text-secondary-foreground">
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center p-4 rounded-full bg-secondary-foreground/10 mb-6">
          <Handshake className="h-10 w-10" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Partner With Us to Transform Nasarawa
        </h2>
        <p className="text-secondary-foreground/80 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
          Join government agencies, private investors, NGOs, and entrepreneurs in building a
          self-reliant, prosperous Nasarawa State. Together, we create lasting economic impact.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/partnership"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg"
          >
            Explore Partnership Opportunities
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-secondary-foreground/40 text-secondary-foreground rounded-lg font-semibold hover:border-secondary-foreground hover:bg-secondary-foreground/10 transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default PartnershipCTA;
