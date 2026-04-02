import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import { Facebook, Twitter, Linkedin, Youtube } from "./icons";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/10 text-white pt-20 pb-6"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="AI Learning Academy logo"
                width={200}
                height={200}
                className="w-24"
              />
              <h3 className="text-xl font-semibold tracking-wide bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                AI Learning Academy
              </h3>
            </Link>

            <p className="text-gray-400 text-sm mb-4">
              Providing quality IT solutions and services since 2010.
            </p>

            {/* Social */}
            <div className="flex space-x-5">
              <Link href="#" aria-label="Facebook">
                <Facebook />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Twitter />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Linkedin />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Youtube />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Packages", href: "/packages" },
                { label: "FAQ", href: "/faq" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support */}
          <nav aria-label="Support links">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms & Conditions", href: "/terms" },
                { label: "Support Center", href: "/support" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>

            <address className="not-italic space-y-3">
              <div className="flex items-start gap-2">
                <MapPin
                  className="h-5 w-5 text-gray-400 mt-0.5"
                  aria-hidden
                />
                <p className="text-gray-400 text-sm">
                  123 Main Street, Dhaka, Bangladesh
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Phone
                  className="h-5 w-5 text-gray-400"
                  aria-hidden
                />
                <a
                  href="tel:+8809610016010"
                  className="text-gray-400 text-sm hover:text-white"
                >
                  +880 9610016010
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" aria-hidden />
                <a
                  href="mailto:info@ifsolution.com"
                  className="text-gray-400 text-sm hover:text-white"
                >
                  info@ifsolution.com
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6">
          <div className="flex flex-col sm:flex-row justify-between items-start lg:items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} IF SOLUTION. All
              rights reserved.
            </p>

            <div className="flex flex-col text-start lg:items-end gap-1">
              <p className="text-gray-400 text-sm">
                powered by{" "}
                <a
                  href="https://gmgroupbd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  GM Group
                </a>
              </p>

              <p className="text-gray-400 text-sm">
                developed by{" "}
                <a
                  href="https://gmitsolution.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition"
                >
                  GM IT Solution
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
