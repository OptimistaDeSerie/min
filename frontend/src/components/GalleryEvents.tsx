import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowRight, Filter } from "lucide-react";
import keanaImg from "@/assets/keana-salt-site.jpg";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroMinerals from "@/assets/hero-minerals.jpg";
import heroSme from "@/assets/hero-sme.jpg";
import heroIndustry from "@/assets/hero-industry.jpg";
import heroDigital from "@/assets/hero-digital.jpg";

// ✅ Import your API service function (add this one if it doesn't exist yet)
import { getEvents } from "@/services/api";

// Keep your original filter buttons
const filters = ["All", "Exhibitions", "Training", "Products", "Site Visits"];

// Type matching what your backend returns
interface Event {
  id: number;
  title: string;
  slug: string;
  venue: string;
  event_date: string;       // "YYYY-MM-DD"
  feature_image: string;
  description?: string;
  images?: any[];
}

const GalleryEvents = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();   // ← your service function
        setEvents(data || []);
      } catch (error) {
        console.error("Failed to load events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Split past vs upcoming
  const today = new Date(); // real current date (Feb 21, 2026 in your env)
  // Alternative (fixed for testing): const today = new Date("2026-02-21");

  const pastEvents = events.filter(
    (e) => new Date(e.event_date) < today
  );
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Banner – unchanged */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={heroIndustry}
          alt="Events & Activities"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/65" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-4 drop-shadow-lg">
              Events & Activities
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto drop-shadow">
              Driving Nasarawa's Economic Growth Through Action, Exhibitions & Engagement
            </p>
          </div>
        </div>
      </section>

      {/* Past Events Grid */}
      <section id="events" className="section-padding">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Events & Highlights</h2>
              <p className="text-muted-foreground mt-1">Stories from our exhibitions, field visits, and training programs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <Link
                key={event.id}
                to={`/events/${event.slug}`}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={event.feature_image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-card-foreground text-base mb-3 group-hover:text-primary transition-colors leading-snug flex-1">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground border-t border-border pt-4 mt-auto">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-primary" />
                      {new Date(event.event_date).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-primary" />
                      {event.venue}
                    </span>
                    <span className="ml-auto flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default GalleryEvents;