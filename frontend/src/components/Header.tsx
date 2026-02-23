import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "@/assets/logo.jpg";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Objectives", href: "/objectives" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Partnership", href: "/partnership" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Made in Nasarawa Logo" className="h-12 w-12 rounded-full object-cover" />
          <div className="hidden sm:block leading-tight">
            <span className="font-bold text-primary text-sm">MADE IN NASARAWA</span>
            <span className="block text-xs text-muted-foreground">Special Project Office</span>
          </div>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background border-b border-border">
          <nav className="flex flex-col px-4 py-4 gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.href}
                end={item.href === "/"}
                className={({ isActive }) =>
                  `text-sm font-medium py-2 transition-colors ${
                    isActive ? "text-primary font-semibold" : "text-foreground hover:text-primary"
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
