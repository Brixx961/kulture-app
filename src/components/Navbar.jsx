import React, { useEffect, useState } from 'react';
import './zoom.css';
import logo from '../assets/logo.png';
import img1 from '../assets/img2.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';
import img6 from '../assets/img6.png';

const HeroSection = () => {
  const images = [
    { src: img1, name: 'Fumilayo' },
    { src: img2, name: 'Obinna' },
    { src: img3, name: 'Nene' },
    { src: img4, name: 'Danlami' },
    { src: img5, name: 'Aisha' },
    { src: img6, name: 'Sanni' },
  ];

  const [activeIndexes, setActiveIndexes] = useState([0, 1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndexes(prev => {
        const next = (prev[1] + 1) % images.length;
        return [prev[1], next];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="w-full px-4 md:px-12 lg:px-20 py-0">
      {/* Banner Container */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] overflow-hidden flex">
        {images.map((img, idx) => (
          <div key={idx} className="relative flex-1 h-full overflow-hidden">
            {/* Background image */}
            <div
              className={`w-full h-full bg-center bg-cover transition-transform duration-1000 ${
                activeIndexes.includes(idx) ? 'zoom-animation' : ''
              }`}
              style={{ backgroundImage: `url(${img.src})` }}
            />
            {/* Dark overlay inside each image */}
            <div className="absolute inset-0 bg-black opacity-40 pointer-events-none" />
            {/* Name Label */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent text-white text-center p-2 sm:p-3 md:p-4 text-sm sm:text-base md:text-lg font-semibold z-10">
              {img.name}
            </div>
          </div>
        ))}

        {/* Centered Logo */}
        <div className="absolute top-2 sm:top-4 md:top-3 left-1/2 transform -translate-x-1/2 z-20">
          <img src={logo} alt="Logo" className="w-18 sm:w-30 md:w-42 lg:w-54" />
        </div>
      </div>

      {/* Text Below */}
      <div className="text-center mt-6 sm:mt-8 md:mt-10 px-4">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase bg-[linear-gradient(135deg,#a0a0a0,#d0d0d0,#a0a0a0)] bg-[length:20px_20px] bg-clip-text text-transparent">
          Discover the history
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
