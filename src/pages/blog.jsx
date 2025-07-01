import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import client from '../lib/contentful/client';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'kultureNationBlogSection',
          order: '-sys.createdAt',
        });

        const formattedPosts = response.items.map((item) => ({
          title: item.fields.title || '',
          meta: item.fields.meta || '',
          slug: item.fields.slug || '',
          image: item.fields.image?.fields?.file?.url || '',
          excerpt: typeof item.fields.excerpt === 'string' ? item.fields.excerpt : '',
          date: item.sys.createdAt,
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <section id="insights" className="py-16 bg-black text-white">
  <div className="container mx-auto px-4">
    {/* Logo First */}
    <div className="mb-4">
      <Link to="/" className="inline-block">
        <img
          src={logo}
          alt="Kulture Nation Logo"
          className="w-10 sm:w-20 md:w-32 lg:w-40 object-contain" 
        />
      </Link>
    </div>

    {/* Centered Heading */}
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        Our <span className="text-yellow-400">Latest</span> Insight
      </h2>
      {/* <div className="w-16 h-1 bg-yellow-400 mx-auto mt-2"></div> */}
    </div>

    {/* Blog Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {posts.map((post, index) => (
        <Link
          key={index}
          to={`/post/${post.slug}`}
          className="transform transition-transform duration-300 hover:-translate-y-2 block"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-full h-full text-black">
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
              <h3 className="text-base font-light leading-snug mb-1">
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
  </div>
</section>


      <Footer />
    </>
  );
};

export default Blog;
