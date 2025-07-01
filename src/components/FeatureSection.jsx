import React from 'react';
import { Book, Globe, Sun } from 'lucide-react';
import './KultureSection.css';

const KultureSection = () => {
  return (
    <section className="bg-black text-white px-4 sm:px-6 py-20 flex flex-col items-center text-center overflow-hidden">
      <h2 className="text-base sm:text-lg md:text-2xl font-extrabold tracking-wide leading-relaxed uppercase max-w-md sm:max-w-xl mb-12">
        KULTURE NATION IS AN EDUTAINMENT <br />
        PLATFORM FOCUSED ON EDUCATING<br />
        AND PRESERVING AFRICAN CULTURE<br />
        TRADITIONS AND HISTORY THROUGH<br />
        MODERN DIGITAL FORMATS.
      </h2>

      <div className="card-stack-container w-full max-w-[400px] h-[200px] relative">
        <div className="card-stack-3d w-full h-full relative">
          <div className="card3d history bg-green-700">
            <Book size={40} className="mb-2" />
            HISTORY
          </div>
          <div className="card3d culture bg-yellow-600">
            <Globe size={40} className="mb-2" />
            CULTURE
          </div>
          <div className="card3d proverbs bg-red-700">
            <Sun size={40} className="mb-2" />
            PROVERBS
          </div>
        </div>
      </div>
    </section>
  );
};

export default KultureSection;
