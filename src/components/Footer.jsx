import React from 'react';
import {
  Instagram,
  Youtube,
  Phone,
  Mail,
  Copyright,
} from 'lucide-react';
import { SiTiktok } from 'react-icons/si';
import logo from '../assets/logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 mt-20 px-4 md:px-12 lg:px-20">
  <div className="w-full flex flex-wrap justify-between items-center gap-y-6 text-sm">
    {/* Logo */}
    <div className="flex items-center">
      <img src={logo} alt="Logo" className="w-18 sm:w-30 md:w-42 lg:w-54" />
    </div>

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

    {/* Phone */}
    <div className="flex items-center gap-2">
      <Phone size={16} />
      <span>+234 - 000 - 000 - 0000</span>
    </div>

    {/* Email */}
    <div className="flex items-center gap-2">
      <Mail size={16} />
      <span>kulturenation@gmail.com</span>
    </div>

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
