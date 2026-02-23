import { Link } from "react-router-dom";
import { Award, TrendingUp, Handshake, Users, Building2, Link as LinkIcon, ArrowRight } from "lucide-react";

const objectives = [
  { icon: Award, title: "Promote Local Goods & Branding", description: "Elevate the visibility of Nasarawa-made products through strategic branding and marketing campaigns." },
  { icon: TrendingUp, title: "Enhance SME Capacity", description: "Provide training, mentorship, and resources to strengthen small and medium enterprises." },
  { icon: Handshake, title: "Facilitate Investment via PPPs", description: "Attract investments through public-private partnerships and strategic collaborations." },
  { icon: Users, title: "Create Employment Opportunities", description: "Generate sustainable jobs through industrial development and value-chain activities." },
  { icon: Building2, title: "Encourage Government Procurement", description: "Advocate for local procurement policies within government agencies." },
  { icon: LinkIcon, title: "Strengthen Partnerships", description: "Build multi-stakeholder partnerships across sectors for collective impact." },
];

const ObjectivesTeaser = () => (
  <section className="section-padding">
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h2 className="section-title">Our Strategic Objectives</h2>
        <p className="section-subtitle">
          Six pillars driving Nasarawa State's economic transformation and self-reliance
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
        {objectives.map((obj) => (
          <div
            key={obj.title}
            className="bg-card rounded-lg p-6 border border-border hover:border-primary/50 hover:shadow-md transition-all group"
          >
            <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
              <obj.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-card-foreground mb-2">{obj.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link
          to="/objectives"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-md"
        >
          Learn More About Our Objectives
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  </section>
);

export default ObjectivesTeaser;
