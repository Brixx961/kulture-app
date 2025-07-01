import React, { useState, useEffect } from "react";
import client from "../lib/contentful/client";
import RichText from "./RichText"; 

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [faq, setFaq] = useState([]);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const res = await client.getEntries({ content_type: "faq" });
        const faqItemsReferences = res.items[0]?.fields?.faqs;

        if (!faqItemsReferences || !Array.isArray(faqItemsReferences)) {
          console.warn("No referenced FAQ items found.");
          return;
        }

        const faqItems = await client.getEntries({
          "sys.id[in]": faqItemsReferences.map((item) => item.sys.id).join(","),
        });

        const items = faqItems.items.map((item) => ({
          title: item.fields.title,
          content: item.fields.content, // This is rich text
        }));

        setFaq(items);
      } catch (error) {
        console.error("Failed to fetch FAQ data:", error);
      }
    };

    fetchFaqData();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-10 mx-auto" style={{ backgroundColor: "#f9f9f9" }}>
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl sm:text-4xl font-light mb-4">Why Choose CI Group?</h2>
          <div className="h-1 w-16 bg-yellow-300 mt-2"></div>
        </div>

        {/* Accordion Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <p className="text-neutral-600 text-base leading-relaxed">
              CI Group stands out for its ability to deliver results across diverse sectors.
              With a strategic and integrated approach, we focus on driving growth and delivering
              exceptional value to our clients.
            </p>
          </div>

          {/* Right Section */}
          <div>
            {faq.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg mb-4 overflow-hidden">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="flex justify-between items-center w-full px-6 py-4 text-left bg-white text-neutral-800 hover:bg-gray-50"
                >
                  <span className="text-base font-medium">{faq.title}</span>
                  <span className="text-xl font-bold">{activeIndex === index ? "-" : "+"}</span>
                </button>
                {activeIndex === index && (
                  <div className="bg-gray-50 px-6 py-4 text-sm text-neutral-600">
                    <RichText content={faq.content} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
