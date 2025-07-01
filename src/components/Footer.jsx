import React from 'react';
import {
  Instagram,
  Youtube,
  Phone,
  Mail,
  Copyright,
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import logo from '../assets/logo.png'; // Adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-20">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center items-center gap-6 md:gap-12 text-sm">
        
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-18 sm:w-30 md:w-42 lg:w-54" />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-gray-600" />

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="bg-[#222] p-2 rounded-full">
            <Instagram size={18} />
          </a>
          <a href="#" className="bg-[#222] p-2 rounded-full">
            <Youtube size={18} />
          </a>
          <a href="#" className="bg-[#222] p-2 rounded-full">
            <SiTiktok size={18} className="text-white" />
          </a>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-gray-600" />

        {/* Phone */}
        <div className="flex items-center gap-2">
          <Phone size={16} />
          <span>+234 - 000 - 000 - 0000</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-gray-600" />

        {/* Email */}
        <div className="flex items-center gap-2">
          <Mail size={16} />
          <span>kulturenation@gmail.com</span>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-6 bg-gray-600" />

        {/* Copyright */}
        <div className="flex items-center gap-1">
          <Copyright size={16} />
          <span>2025 Kulture Nation</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
