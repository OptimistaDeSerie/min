import { useState } from "react";
import { Link } from "react-router-dom";
import { Mountain, Wheat, Lightbulb, Store, Monitor, ScrollText, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Mountain,
    title: "Solid Minerals",
    description: "Responsible mining and value addition across 30+ mineral deposits including barytes, tantalite, and gemstones.",
  },
  {
    icon: Wheat,
    title: "Agricultural Value-Chain",
    description: "Farm-to-table support for rice, sesame, yam, cassava, and soya beans with emphasis on processing.",
  },
  {
    icon: Lightbulb,
    title: "SME & Youth Innovation",
    description: "Skills training, mentorship, and incubation programs building the next generation of business leaders.",
  },
  {
    icon: Store,
    title: "Exhibitions & Trade Fairs",
    description: "Connecting Made-in-Nasarawa products to local, national, and international markets.",
  },
  {
    icon: Monitor,
    title: "Digital Market Access",
    description: "E-commerce and digital platforms connecting Nasarawa producers to buyers across Nigeria and beyond.",
  },
  {
    icon: ScrollText,
    title: "Policy Advocacy",
    description: "Championing local content laws, procurement preferences, and investment-friendly regulations.",
  },
];

const ProgramsTeaser = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Program Clusters</h2>
          <p className="section-subtitle">
            Six strategic areas driving the Made in Nasarawa initiative forward
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {programs.map((p, i) => (
              <button
                key={p.title}
                onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  i === active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-muted-foreground border border-border hover:border-primary/50"
                }`}
              >
                <p.icon className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{p.title}</span>
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="bg-card rounded-xl p-8 border border-border shadow-md mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                {(() => {
                  const Icon = programs[active].icon;
                  return <Icon className="h-7 w-7 text-primary" />;
                })()}
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">{programs[active].title}</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">{programs[active].description}</p>
          </div>

          <div className="text-center">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all shadow-sm"
            >
              Explore All Programs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramsTeaser;
