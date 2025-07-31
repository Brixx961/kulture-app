import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../lib/contentful/client';

const FeatureSection = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'kultureNationBlogSection',
          order: '-sys.createdAt',
          limit: 4,
        });

        const formattedPosts = response.items.map((item) => ({
          title: item.fields.title || '',
          meta: item.fields.meta || '',
          slug: item.fields.slug || '',
          image: item.fields.image?.fields?.file?.url || '',
          excerpt: typeof item.fields.excerpt === 'string' ? item.fields.excerpt : '',
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching kultureNationBlogSection posts:', error);
      }
    };

    fetchFeaturedPosts();
  }, []);

  return (
    <section id="insights" className="relative px-4 md:px-12 lg:px-20 mt-30 mx-auto">
      <div className="max-w-9xl mx-auto">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl mt-10 lg:mt-20 tracking-wide">
            Our Latest Insight
          </h2>
          <div className="h-1 w-16 bg-yellow-300 mt-2 mb-5 mx-auto sm:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
          {posts.map((post, index) => (
            <Link
              key={index}
              to={`/post/${post.slug}`}
              className="transform transition-transform duration-300 hover:-translate-y-2 block"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full h-full">
                {post.image && (
                  <div className="w-full aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  {post.meta && (
                    <div className="text-xs font-light text-yellow-600 mb-2 uppercase tracking-wide">
                      {post.meta}
                    </div>
                  )}
                  <h3 className="text-base font-light text-black leading-snug mb-1">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 leading-snug">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-700 font-medium transition duration-200"
          >
            SEE MORE INSIGHTS
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
