import { useState } from "react";
import { Mountain, Wheat, Lightbulb, Store, Monitor, ScrollText, ChevronDown } from "lucide-react";
import heroMinerals from "@/assets/hero-minerals.jpg";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroSme from "@/assets/hero-sme.jpg";
import heroIndustry from "@/assets/hero-industry.jpg";
import heroDigital from "@/assets/hero-digital.jpg";

const programs = [
  {
    icon: Mountain,
    title: "Solid Minerals Development",
    image: heroMinerals,
    tag: "Natural Resources",
    content:
      "Nasarawa State is endowed with over 30 mineral resources including barites, tantalite, tin, and gemstones. This cluster focuses on responsible mining, value addition, and attracting investment to develop the state's mineral wealth sustainably.",
    highlights: [
      "Over 30 identified mineral deposits across all LGAs",
      "Minerals Catalogue launched for investor access",
      "Partnership with Ministry of Solid Minerals",
      "Value-addition and processing support for miners",
    ],
  },
  {
    icon: Wheat,
    title: "Agricultural Value-Chain",
    image: heroAgriculture,
    tag: "Agriculture",
    content:
      "From farm to table, this program supports the full agricultural value chain — production, processing, packaging, and distribution. Key crops include rice, sesame, yam, cassava, and soya beans, with emphasis on mechanization and agro-processing.",
    highlights: [
      "Support for rice, sesame, cassava, and yam producers",
      "Agro-processing equipment and training provided",
      "Market linkage with national buyers and exporters",
      "Focus on women-led agribusiness development",
    ],
  },
  {
    icon: Lightbulb,
    title: "SME & Youth Innovation",
    image: heroSme,
    tag: "Entrepreneurship",
    content:
      "Empowering young entrepreneurs and small businesses through skills training, access to finance, mentorship, and incubation programs. This cluster builds the next generation of Nasarawa's business leaders.",
    highlights: [
      "Capacity building workshops for 300+ SME owners",
      "Digital marketing and financial management training",
      "Access to grants and microfinance facilitation",
      "Youth innovation challenges and startup support",
    ],
  },
  {
    icon: Store,
    title: "Exhibitions & Trade Fairs",
    image: heroIndustry,
    tag: "Trade & Commerce",
    content:
      "Organizing and participating in local, national, and international exhibitions and trade fairs to showcase Made-in-Nasarawa products, build networks, and open new market opportunities.",
    highlights: [
      "Annual Nasarawa Trade Fair with 500+ exhibitors",
      "National Agri-Business Expo participation",
      "B2B matchmaking sessions for producers and buyers",
      "Product branding and display support for SMEs",
    ],
  },
  {
    icon: Monitor,
    title: "Digital Market Access",
    image: heroDigital,
    tag: "Technology",
    content:
      "Leveraging technology to connect Nasarawa producers and artisans to digital marketplaces, e-commerce platforms, and online buyers across Nigeria and beyond.",
    highlights: [
      "Digital skills training for 200+ traditional artisans",
      "E-commerce platform registration and onboarding",
      "Social media marketing for local producers",
      "Digital product photography and online presence",
    ],
  },
  {
    icon: ScrollText,
    title: "Policy Advocacy",
    image: heroIndustry,
    tag: "Governance",
    content:
      "Advocating for policies that support local production, including local content laws, government procurement preferences, tax incentives, and investment-friendly regulations.",
    highlights: [
      "Local procurement advocacy across state MDAs",
      "Engagement with the National Assembly on local content",
      "Investment-friendly regulatory framework support",
      "Tax incentive programs for local manufacturers",
    ],
  },
];

const ProgramClusters = () => {
  const [active, setActive] = useState(0);
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0);

  return (
    <>
      {/* Hero */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <img src={heroIndustry} alt="Programs" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-3 drop-shadow-lg">
              Program Clusters
            </h1>
            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
              Six strategic areas driving the Made in Nasarawa initiative
            </p>
          </div>
        </div>
      </section>

      {/* Desktop Tab Layout */}
      <section id="programs" className="section-padding hidden md:block">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Program Clusters</h2>
            <p className="section-subtitle">
              Each cluster is a focused intervention area designed for measurable economic impact
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              {programs.map((p, i) => (
                <button
                  key={p.title}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    i === active
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-card text-muted-foreground border border-border hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  <p.icon className="h-4 w-4 shrink-0" />
                  {p.title}
                </button>
              ))}
            </div>

            {/* Content Panel */}
            <div className="bg-card rounded-xl border border-border shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={programs[active].image}
                    alt={programs[active].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      {(() => {
                        const Icon = programs[active].icon;
                        return <Icon className="h-6 w-6 text-primary" />;
                      })()}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-accent">{programs[active].tag}</span>
                      <h3 className="text-xl font-bold text-card-foreground">{programs[active].title}</h3>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{programs[active].content}</p>
                  <ul className="space-y-2">
                    {programs[active].highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Accordion Layout */}
      <section className="section-padding md:hidden">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title">Our Program Clusters</h2>
            <p className="section-subtitle">Six strategic areas driving economic impact</p>
          </div>
          <div className="space-y-3">
            {programs.map((p, i) => (
              <div key={p.title} className="bg-card rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setExpandedMobile(expandedMobile === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <p.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-bold text-card-foreground">{p.title}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground transition-transform ${expandedMobile === i ? "rotate-180" : ""}`}
                  />
                </button>
                {expandedMobile === i && (
                  <div className="px-5 pb-5 border-t border-border pt-4">
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.content}</p>
                    <ul className="space-y-2">
                      {p.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-primary shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProgramClusters;
