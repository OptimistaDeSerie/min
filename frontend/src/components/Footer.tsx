import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Logo" className="h-10 w-10 rounded-full object-cover" />
              <div className="leading-tight">
                <span className="font-bold text-sm">MADE IN NASARAWA</span>
                <span className="block text-xs opacity-70">Special Project Office</span>
              </div>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Office of the Secretary to the Government of Nasarawa State. Driving economic
              transformation through local production and innovation.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm opacity-70">
              <Link to="/" className="block hover:opacity-100 transition-opacity">Home</Link>
              <Link to="/objectives" className="block hover:opacity-100 transition-opacity">Objectives</Link>
              <Link to="/programs" className="block hover:opacity-100 transition-opacity">Programs</Link>
              <Link to="/events" className="block hover:opacity-100 transition-opacity">Events</Link>
              <Link to="/contact" className="block hover:opacity-100 transition-opacity">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm opacity-70">
              <p>info@madeinnasarawa.ng</p>
              <p>www.madeinnasarawa.ng</p>
              <p>Lafia, Nasarawa State, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-6 text-center text-sm opacity-60">
          © {new Date().getFullYear()} Made in Nasarawa Special Project Office. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

