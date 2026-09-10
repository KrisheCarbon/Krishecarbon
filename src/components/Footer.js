import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Leaf, Mail, Phone, MapPin, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <div className="bg-white p-2 rounded-xl mr-3">
                <Image
                        src="/logo-horizontal.png"
                        alt="KriSHE Carbon Logo"
                        width={140}
                        height={84}
                        className="h-10 w-auto"
                      />
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              We&apos;re improving soil health for smallholder farmers. Biochar is how we do it,
              and carbon credits from that biochar pay for the whole thing — so farmers benefit
              twice, from healthier soil and from carbon income.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-gray-700 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-gray-700 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-3 rounded-xl hover:bg-gray-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
 <li>
    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
      Home
    </Link>
  </li>
  <li>
    <Link
      href="/how-it-works"
      className="text-gray-400 hover:text-white transition-colors"
    >
      How It Works
    </Link>
  </li>
  <li>
    <Link
      href="/technology"
      className="text-gray-400 hover:text-white transition-colors"
    >
      Technology
    </Link>
  </li>
  <li>
    <Link
      href="/about"
      className="text-gray-400 hover:text-white transition-colors"
    >
      About Us
    </Link>
  </li>
  <li>
    <Link
      href="/buy-credits"
      className="text-gray-400 hover:text-white transition-colors"
    >
      Buy Credits
    </Link>
  </li>
  <li>
    <Link
      href="/roi"
      className="text-gray-400 hover:text-white transition-colors"
    >
      Organization
    </Link>
  </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-emerald-500" />
                <span className="text-gray-400">krishecarbon@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-emerald-500" />
                <span className="text-gray-400">+91 7975597294</span>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-emerald-500" />
                <span className="text-gray-400">Sector 77,Gurgaon, Haryana, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 KriSHE Carbon. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
