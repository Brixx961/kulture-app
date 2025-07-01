import { useEffect, useState } from "react";
import client from "../lib/contentful/client";
import RichText from "./RichText";
import cigHero from "../assets/cigHero.jpeg";

const Careers = () => {
  const [careersData, setCareersData] = useState(null);

  useEffect(() => {
    const fetchCareersData = async () => {
      try {
        const res = await client.getEntries({ content_type: "careersSection" });
        const entry = res.items[0]?.fields;

        if (!entry) {
          console.warn("No careersSection entry found.");
          return;
        }

        // Fetch referenced job posts
        const jobRefs = entry.jobList || [];
        const jobIds = jobRefs.map((job) => job.sys.id).join(",");

        const jobData = await client.getEntries({
          "sys.id[in]": jobIds,
        });

        const jobs = jobData.items.map((job) => ({
          title: job.fields.title,
          location: job.fields.location,
          description: job.fields.description,
          isNew: job.fields.isNew,
        }));

        setCareersData({
          title: entry.title,
          intro1: entry.introParagraph1,
          intro2: entry.introParagraph2,
          jobs,
        });
      } catch (err) {
        console.error("Failed to fetch careers data:", err);
      }
    };

    fetchCareersData();
  }, []);

  if (!careersData) return <p className="text-center my-10">Loading...</p>;

  return (
    <section id="careers" className="py-20 bg-white px-4 sm:px-6 lg:px-10 mt-15 mx-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Text Section */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-3xl sm:text-4xl font-light mb-6">{careersData.title}</h2>
            <div className="h-1 w-16 bg-yellow-300 mb-10"></div>

            <div className="mb-4 text-neutral-700 text-base leading-relaxed">
              <RichText content={careersData.intro1} />
            </div>
            <div className="mb-8 text-neutral-700 text-base leading-relaxed">
              <RichText content={careersData.intro2} />
            </div>

            <div className="space-y-8">
              {careersData.jobs.map((job, i) => (
                <div key={i} className="border border-neutral-200 rounded-md p-5 shadow-sm">
                  <h3 className="text-xl font-light mb-1">
                    {job.title}
                    {job.isNew && (
                      <span className="ml-2 px-2 py-1 text-sm text-yellow-300 bg-yellow-100 rounded-full">
                        New
                      </span>
                    )}
                  </h3>
                  <div className="flex items-center text-sm text-neutral-600 mb-2">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {job.location}
                  </div>
                  <div className="text-neutral-700 mb-3 text-base leading-relaxed">
                    <RichText content={job.description} />
                  </div>
                  <a
                    href="#"
                    className="inline-block text-yellow-300 border border-yellow-300 px-4 py-2 rounded-md hover:bg-yellow-600 hover:text-white transition"
                  >
                    Apply Now
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 w-full">
            <img
              src={cigHero}
              alt="CI Group team collaboration"
              className="w-full h-auto max-h-[500px] object-cover rounded-md shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Careers;
