import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import client from '../lib/contentful/client';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';
// import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Post = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'kultureNationBlogSection',
          'fields.slug': slug,
          limit: 1,
        });

        if (!response.items.length) {
          navigate('/blog');
          return;
        }

        setPost(response.items[0]); // Save the full item (fields + sys)
      } catch (error) {
        console.error('Error fetching full post:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchLatestPosts = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'kultureNationBlogSection',
          order: '-sys.createdAt',
          limit: 5,
        });

        const filtered = response.items.filter(item => item.fields.slug !== slug);
        setLatestPosts(filtered);
      } catch (error) {
        console.error('Error fetching latest posts:', error);
      }
    };

    fetchPost();
    fetchLatestPosts();
  }, [slug, navigate]);

  // 🧠 Rich Text Render Options
  const richTextOptions = {
    renderMark: {
      [MARKS.BOLD]: text => <strong className="font-bold">{text}</strong>,
      [MARKS.ITALIC]: text => <em className="italic">{text}</em>,
      [MARKS.UNDERLINE]: text => <span className="underline">{text}</span>,
      [MARKS.CODE]: text => <code className="bg-gray-100 text-sm px-1 rounded">{text}</code>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <p className="mb-4">{children}</p>,
      [BLOCKS.HEADING_1]: (node, children) => <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>,
      [BLOCKS.HEADING_2]: (node, children) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
      [BLOCKS.HEADING_3]: (node, children) => <h3 className="text-xl font-medium mt-5 mb-2">{children}</h3>,
      [BLOCKS.UL_LIST]: (node, children) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
      [BLOCKS.OL_LIST]: (node, children) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
      [BLOCKS.LIST_ITEM]: (node, children) => <li className="mb-1">{children}</li>,
      [BLOCKS.QUOTE]: (node, children) => (
        <blockquote className="border-l-4 border-yellow-500 pl-4 italic text-gray-600 my-4">{children}</blockquote>
      ),
      [BLOCKS.HR]: () => <hr className="my-8 border-t border-gray-300" />,
      [INLINES.HYPERLINK]: (node, children) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-600 underline hover:text-yellow-800"
        >
          {children}
        </a>
      ),
    },
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!post) return null;

  return (
    <>
      {/* <Navbar /> */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-black bg-white">
        {/* Back Home Link */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-black hover:text-yellow-600 transition duration-200 text-sm font-medium"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Home
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Post Area */}
          <div className="w-full lg:w-2/3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-2">
              <strong className="font-semibold">{post.fields.title?.split(':')[0]}</strong>
              {post.fields.title?.includes(':') && (
                <span>: {post.fields.title.split(':').slice(1).join(':')}</span>
              )}
            </h1>

            <div className="text-sm text-gray-500 mb-6 flex flex-wrap justify-between items-center border-b pb-4">
              <div></div>
              <div>
                {new Date(post.fields.date || post.sys.createdAt).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            </div>

            {post.fields.image?.fields?.file?.url && (
              <img
                src={post.fields.image.fields.file.url}
                alt={post.fields.title}
                className="w-full h-auto rounded-lg mb-10"
              />
            )}

            <article className="prose max-w-none prose-lg mb-8">
              {post.fields.body && documentToReactComponents(post.fields.body, richTextOptions)}
            </article>

            {/* Call to Action */}
            <div className="text-base mt-6 text-black bg-yellow-100 rounded-md  leading-relaxed">
              If you love stories like this one, ask your parents to subscribe to{' '}
              <a
                href="https://www.youtube.com/@kulturenation"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-700 underline hover:text-yellow-900"
              >
                Kulture Nation on YouTube
              </a>{' '}
              for more exciting adventures about Africa’s amazing festivals and traditions!
            </div>
          </div>

          {/* Sidebar Latest Posts */}
          <aside className="w-full lg:w-1/3">
            <h3 className="text-xl font-semibold mb-6 text-gray-800">Latest Insights</h3>
            <ul className="space-y-6">
              {latestPosts.map(item => (
                <li key={item.sys.id}>
                  <Link to={`/post/${item.fields.slug}`} className="group block">
                    <p className="text-xs text-gray-500 mb-1">
                      {new Date(item.fields.date || item.sys.createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <h4 className="text-base text-gray-700 group-hover:text-yellow-600 transition font-medium leading-snug">
                      {item.fields.title}
                    </h4>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-800 font-medium transition duration-200"
              >
                See More Insights
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
          </aside>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Post;
