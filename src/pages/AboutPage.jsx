// src/pages/AboutPage.jsx
import React, { useEffect, useState } from 'react';
import AboutSection from '../components/About';
import client from '../lib/contentful/client'; // 

const AboutPage = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const res = await client.getEntries({
          content_type: 'aboutSection', //  
        });

        const entry = res.items[0];
        console.log('Fetched About fields:', entry.fields);

        setAboutData({
          title: entry.fields.title,
          content1: entry.fields.content1,
          content2: entry.fields.content2,
          ctaText: entry.fields.buttonlabel,
          ctaLink: entry.fields.buttonLink,
          imageUrl: entry.fields.image?.fields?.file?.url,
        });
      } catch (err) {
        console.error('Failed to fetch About data:', err);
      }
    };

    fetchAboutData();
  }, []);

  if (!aboutData) return <p className="text-center mt-10">Loading...</p>;

  return <AboutSection aboutData={aboutData} />;
};

export default AboutPage;
