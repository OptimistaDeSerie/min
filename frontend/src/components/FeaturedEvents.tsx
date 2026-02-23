import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { getEvents } from "@/services/api";

interface Event {
  id?: number | string;
  title?: string;
  slug?: string;
  venue?: string;
  event_date?: string;
  feature_image?: string;
}

const FeaturedEvents = () => {
  const [featured, setFeatured] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const data = await getEvents();

        // Guard: make sure we have an array
        const allEvents = Array.isArray(data) ? data : [];

        // Sort safely – newest first, skip invalid dates
        const sorted = allEvents
          .filter((e): e is Event & { event_date: string } => {
            // Only keep items with required-ish fields
            return !!e?.slug && !!e?.title && !!e?.event_date;
          })
          .sort((a, b) => {
            const dateA = new Date(a.event_date!);
            const dateB = new Date(b.event_date!);
            // Invalid dates go to the end
            if (isNaN(dateA.getTime())) return 1;
            if (isNaN(dateB.getTime())) return -1;
            return dateB.getTime() - dateA.getTime(); // newest first
          });

        // Take up to 4 valid ones
        setFeatured(sorted.slice(0, 4));
      } catch (err: any) {
        console.error("Featured events fetch failed:", err);
        setError("Could not load featured events right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-muted">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">Loading featured highlights...</p>
        </div>
      </section>
    );
  }

  if (error || featured.length === 0) {
    return (
      <section className="section-padding bg-muted">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            {error || "No featured events available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-muted">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Events & Activities</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-10">
          {featured.map((event, index) => (
            <Link
              key={event.id ?? event.slug ?? index} // fallback key
              to={event.slug ? `/events/${event.slug}` : "#"}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={event.feature_image}
                  alt={event.title || "Event image"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors leading-snug min-h-[3.5rem]">
                  {event.title || "Untitled Event"}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="h-3.5 w-3.5 text-primary" />
                    {event.event_date && !isNaN(new Date(event.event_date).getTime())
                      ? new Date(event.event_date).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Date TBD"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    {event.venue || "Nasarawa State"}
                  </span>
                  <span className="ml-auto flex items-center gap-1 text-primary font-semibold text-xs group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-colors shadow-md"
          >
            View All Events & Activities
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;