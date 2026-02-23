import { useState, useEffect, useCallback } from "react";
import heroIndustry from "@/assets/hero-industry.jpg";
import heroAgriculture from "@/assets/hero-agriculture.jpg";
import heroMinerals from "@/assets/hero-minerals.jpg";
import heroSme from "@/assets/hero-sme.jpg";
import heroDigital from "@/assets/hero-digital.jpg";

const slides = [
  {
    image: heroIndustry,
    title: "Transform Nasarawa into a Production Hub",
    subtitle: "Driving industrial growth and local value addition across the state",
  },
  {
    image: heroAgriculture,
    title: "Made in Nasarawa Agri-Products",
    subtitle: "Promoting agricultural value-chain development and food security",
  },
  {
    image: heroMinerals,
    title: "Solid Minerals Development",
    subtitle: "Unlocking the vast mineral wealth of Nasarawa State",
  },
  {
    image: heroSme,
    title: "Empowering Local Entrepreneurs",
    subtitle: "Building capacity for SMEs and youth-led businesses",
  },
  {
    image: heroDigital,
    title: "Digital Market Access",
    subtitle: "Connecting Nasarawa products to national and global markets",
  },
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="home" className="relative h-[85vh] min-h-[500px] overflow-hidden mt-16">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-foreground/60" />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center px-4 max-w-3xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 drop-shadow">
                {slide.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current
                ? "bg-primary scale-125"
                : "bg-primary-foreground/50 hover:bg-primary-foreground/80"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
