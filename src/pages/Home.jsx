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
  const [showModal, setShowModal] = useState(true); // show modal on load

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await client.getEntries({ content_type: 'aboutSection' });
        const entry = res.items[0];

        setAboutData({
          title: entry.fields.title,
          content1: entry.fields.content1,
          content2: entry.fields.content2,
          buttonlabel: entry.fields.buttonlabel,
          buttonLink: entry.fields.buttonLink,
          imageUrl: entry.fields.image?.fields?.file?.url,
        });
      } catch (err) {
        console.error('Failed to fetch About data:', err);
      }
    };

    const fetchWorkflowData = async () => {
      try {
        const res = await client.getEntries({ content_type: 'workflowSection' });
        const entry = res.items[0].fields;

        const subsidiaries = entry.subsidiariess.map((item) => ({
          name: item.fields.name,
          description: item.fields.description,
          logo: item.fields.logo.fields.file.url,
          link: item.fields.link,
        }));

        setWorkflowData({
          title: entry.title,
          description: entry.description,
          subsidiaries,
        });
      } catch (err) {
        console.error('Failed to fetch Workflow data:', err);
      }
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
