import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

import { Facebook, Twitter, Linkedin, Youtube } from "./icons";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 text-white pt-20 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={200}
                className="w-24"
              />
              <h3 className="text-xl font-semibold mb-1 tracking-wide bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                AI Learning Academy
              </h3>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Providing quality IT solutions and services since 2010.
            </p>
            <div className="flex space-x-5">
              <Link
                href="#"
                className="hover:text-blue-400 transition"
              >
                <Facebook />
              </Link>
              <Link
                href="#"
                className="hover:text-blue-400 transition"
              >
                <Twitter />
              </Link>
              <Link
                href="#"
                className="hover:text-blue-400 transition"
              >
                <Linkedin />
              </Link>
              <Link
                href="#"
                className="hover:text-blue-400 transition"
              >
                <Youtube />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/packages"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Packages
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-gray-400 hover:text-white transition text-sm"
                >
                  Support Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">
                  123 Main Street, Dhaka, Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <p className="text-gray-400 text-sm">
                  +880 9610016010
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-400" />
                <p className="text-gray-400 text-sm">
                  info@ifsolution.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 mt-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} IF SOLUTION. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
