import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import About from '../components/About';
import Workflow from '../components/Workflow';
import Footer from '../components/Footer';
import client from '../lib/contentful/client';
import PopupModal from '../components/PopupModal'; 

const Home = () => {
  const [aboutData, setAboutData] = useState(null);
  const [workflowData, setWorkflowData] = useState(null);
  const [showModal, setShowModal] = useState(false); // initially false

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchAboutData = async () => {
      // fetch logic...
    };

    const fetchWorkflowData = async () => {
      // fetch logic...
    };

    fetchAboutData();
    fetchWorkflowData();
  }, []);


  return (
    <>
      <PopupModal show={showModal} onClose={() => setShowModal(false)} />

      <div className=" bg-black text-white">
        <Navbar />
        <HeroSection />
        <FeatureSection />
        <About aboutData={aboutData} />
        <Workflow workflowData={workflowData} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
