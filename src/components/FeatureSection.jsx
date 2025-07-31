import React from 'react';
import './KultureSection.css';
import redCard from '../assets/red-card.png';
import greenCard from '../assets/green-card.png';
import yellowCard from '../assets/yellow-card.png';
import redCard3D from '../assets/red-card-3d.png';
import greenCard3D from '../assets/green-card-3d.png';
import yellowCard3D from '../assets/yellow-card-3d.png';

const KultureSection = () => {
  return (
    <section className="bg-black text-white px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 py-20 flex flex-col items-center text-center overflow-hidden">
      <h2 className="text-base sm:text-lg md:text-2xl font-extrabold tracking-wide leading-relaxed uppercase max-w-md sm:max-w-xl mb-12">
        KULTURE NATION IS AN EDUTAINMENT <br/>
        PLATFORM FOCUSED ON EDUCATING<br/>
        AND PRESERVING CULTURE AND <br/>
        MODERN HISTORY THROUGH<br/>
        DIGITAL FORMATS.
      </h2>

      <div className="card-stack-container w-full max-w-[400px] h-[200px] relative group">
        {/* First-stage static 3D-looking cards */}
        <div className="card-stack-3d-initial absolute top-0 left-0 w-full h-full z-10 group-hover:opacity-0 transition-opacity duration-500 flex items-center justify-center gap-0">
          <div className="flex justify-center items-center">
  <img src={greenCard3D} className="card-initial -mr-16 z-10" />
  <img src={yellowCard3D} className="card-initial z-20" />
  <img src={redCard3D} className="card-initial -ml-16 z-30" />
</div>

        </div>

        {/* Second and third-stage animated card stack */}
        <div className="card-stack-3d w-full h-full relative z-20 group-hover:opacity-100 opacity-0 transition-opacity duration-500">
          <div className="card3d history">
            <img src={greenCard} alt="History Card" className="card-image" />
          </div>
          <div className="card3d culture">
            <img src={yellowCard} alt="Culture Card" className="card-image" />
          </div>
          <div className="card3d proverbs">
            <img src={redCard} alt="Proverbs Card" className="card-image" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KultureSection;
