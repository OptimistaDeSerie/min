import { Link } from "react-router-dom";
import { Layers, CalendarDays, Handshake } from "lucide-react";

const cards = [
  {
    icon: Layers,
    title: "Our Programs",
    description: "Explore our six strategic program clusters driving economic transformation.",
    href: "/programs",
  },
  {
    icon: CalendarDays,
    title: "Events and Activities",
    description: "Stay updated on exhibitions, trade fairs, and training workshops.",
    href: "/events",
  },
  {
    icon: Handshake,
    title: "Partner With Us",
    description: "Join us in building a self-reliant and prosperous Nasarawa State.",
    href: "/partnership",
  },
];

const QuickAccessCards = () => {
  return (
    <section className="relative z-20 -mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className="group bg-card rounded-lg shadow-lg p-8 border border-border hover:border-primary transition-all hover:shadow-xl hover:-translate-y-1"
            >
              <card.icon className="h-10 w-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-card-foreground mb-2">{card.title}</h3>
              <p className="text-muted-foreground text-sm">{card.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccessCards;

