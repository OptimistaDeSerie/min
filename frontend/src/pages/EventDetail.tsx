// EventDetail.tsx

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CalendarDays,
  MapPin,
  ArrowLeft,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// ✅ Import your backend function
import { getEventBySlug } from "@/services/api";

const EventDetail = () => {
  // ✅ Get slug from URL
  const { slug } = useParams<{ slug: string }>();

  // ✅ Store event from backend
  const [event, setEvent] = useState<any>(null);

  // ✅ Loading state
  const [loading, setLoading] = useState(true);

  // ✅ Image viewer state
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // ✅ Fetch event from Laravel when page loads
  useEffect(() => {
    if (!slug) return;

    const fetchEvent = async () => {
      const data = await getEventBySlug(slug);
      setEvent(data);
      setLoading(false);
    };

    fetchEvent();
  }, [slug]);

  // ✅ Show loading message while fetching
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading event...</p>
      </div>
    );
  }

  // ✅ If event not found
  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <Link to="/events">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // ✅ Combine feature image + gallery images
  // Your backend currently returns images: []
  // So we ensure feature_image is always usable
  const allImages =
    event.images && event.images.length > 0
      ? event.images
      : [
          {
            image_path: event.feature_image,
            caption: event.title,
          },
        ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setSelectedImage(
      (prev) => (prev - 1 + allImages.length) % allImages.length
    );
  };

  //format date
  const formatEventDate = (dateInput: string | Date) => {
    return new Date(dateInput).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* ================= HERO SECTION ================= */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-primary/10 to-background">
        <div className="container mx-auto px-4">
          <Link
            to="/events"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>

          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

          <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              {formatEventDate(event.event_date)}
            </span>

            {event.venue && (
              <span className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {event.venue}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ================= CONTENT SECTION ================= */}
      <section className="py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ===== LEFT SIDE (TEXT) ===== */}
          <div className="lg:col-span-3">

            {/* Backend description supports HTML */}
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: event.description }}
            />
          </div>

          {/* ===== RIGHT SIDE (IMAGES) ===== */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ZoomIn className="h-5 w-5 text-primary" />
              Event Gallery
            </h3>

            {/* Main Image */}
            <div
              className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={allImages[selectedImage].image_path}
                alt={allImages[selectedImage].caption}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-4">
                {allImages.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img
                      src={image.image_path}
                      alt={image.caption}
                      className="w-full h-20 object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= LIGHTBOX ================= */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl bg-black">
          <div className="relative">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white"
            >
              <X />
            </button>

            <img
              src={allImages[selectedImage].image_path}
              alt={allImages[selectedImage].caption}
              className="w-full h-[500px] object-contain"
            />

            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 text-white"
                >
                  <ChevronLeft size={40} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 text-white"
                >
                  <ChevronRight size={40} />
                </button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default EventDetail;