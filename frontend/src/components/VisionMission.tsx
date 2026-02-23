import { Eye, Target } from "lucide-react";

const VisionMission = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Vision & Mission</h2>
          <p className="section-subtitle">
            Driving sustainable economic growth through local production and innovation
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-md border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Transform Nasarawa State into a production and industrial hub, fostering
              self-reliance and local value addition.
            </p>
          </div>
          <div className="bg-card rounded-lg p-8 shadow-md border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-secondary/10">
                <Target className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-card-foreground">Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Promote locally made goods and services, enhance SME growth, and strengthen
              stakeholder engagement for sustainable economic development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
