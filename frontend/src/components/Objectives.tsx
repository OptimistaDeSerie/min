import { Award, TrendingUp, Handshake, Users, Building2, Link as LinkIcon } from "lucide-react";
import heroIndustry from "@/assets/hero-industry.jpg";

const objectives = [
  {
    icon: Award,
    title: "Promote Local Goods & Branding",
    description: "Elevate the visibility and quality of Nasarawa-made products through coordinated branding, certification, and market positioning campaigns that put local products on the national map.",
    highlight: "Brand Nasarawa",
  },
  {
    icon: TrendingUp,
    title: "Enhance SME Capacity",
    description: "Provide targeted training, mentorship, and access to resources that strengthen small and medium enterprises — building a robust ecosystem of resilient local businesses.",
    highlight: "Grow Business",
  },
  {
    icon: Handshake,
    title: "Facilitate Investment via PPPs",
    description: "Attract strategic investments through well-structured public-private partnerships and collaborations, mobilizing capital for industrial, agricultural, and digital projects.",
    highlight: "Drive Investment",
  },
  {
    icon: Users,
    title: "Create Employment Opportunities",
    description: "Generate sustainable jobs for youth, women, and artisans through industrial development, value-chain activities, and skills training programs across all 13 LGAs.",
    highlight: "Create Jobs",
  },
  {
    icon: Building2,
    title: "Encourage Government Procurement",
    description: "Advocate for and implement local procurement policies within government agencies to give Made-in-Nasarawa products priority access to government supply chains.",
    highlight: "Local First",
  },
  {
    icon: LinkIcon,
    title: "Strengthen Partnerships",
    description: "Build and maintain multi-stakeholder partnerships across government, private sector, civil society, and international development organizations for collective economic impact.",
    highlight: "Collaborate",
  },
];

const Objectives = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={heroIndustry} alt="Objectives" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-secondary/75" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-3 drop-shadow-lg">
              Our Objectives
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Six strategic goals driving Nasarawa State's economic transformation
            </p>
          </div>
        </div>
      </section>

      {/* Objectives Grid */}
      <section id="objectives" className="section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Strategic Objectives</h2>
            <p className="section-subtitle">
              Each objective is a deliberate pillar built to support the Made in Nasarawa vision of self-reliance, growth, and transformation
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {objectives.map((obj, i) => (
              <div
                key={obj.title}
                className="bg-card rounded-xl p-7 border border-border hover:border-primary/50 hover:shadow-lg transition-all group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-xs font-bold text-primary/30 uppercase tracking-widest">
                  0{i + 1}
                </div>
                <div className="p-3 rounded-xl bg-primary/10 w-fit mb-5 group-hover:bg-primary/20 transition-colors">
                  <obj.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="inline-block text-xs font-bold text-accent bg-accent/10 px-2 py-1 rounded mb-3">
                  {obj.highlight}
                </span>
                <h3 className="text-xl font-bold text-card-foreground mb-3 leading-snug">{obj.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Statement */}
      <section className="section-padding bg-muted">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Building a Future Made in Nasarawa
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              These six objectives are not isolated goals — they are interconnected pillars of a
              comprehensive strategy to transform Nasarawa State into a production hub, create
              lasting employment, and foster the kind of economic dignity every Nasarawa citizen deserves.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
              {[
                { number: "13", label: "Local Government Areas" },
                { number: "30+", label: "Mineral Resources" },
                { number: "6", label: "Program Clusters" },
                { number: "500+", label: "SMEs Supported" },
              ].map((stat) => (
                <div key={stat.label} className="bg-card rounded-xl p-6 border border-border text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Objectives;
