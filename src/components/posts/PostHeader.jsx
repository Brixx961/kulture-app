import React from 'react';
import ContentfulImage from '../ui/ContentfulImage';

const PostHeader = ({ post }) => {
  if (!post || !post.fields) return null;

  const { title, date, author, category, coverImage } = post.fields;

  const imageUrl = coverImage?.fields?.file?.url
    ? `https:${coverImage.fields.file.url}`
    : null;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
  });

  const year = new Date(date).getFullYear();
  const [day, month] = formattedDate.split(' ');

  return (
    <div className="relative mb-10 h-[400px] sm:h-[500px] md:h-[600px]">
      {/* Background Image */}
      {imageUrl && (
        <ContentfulImage
          alt={`Cover image for ${title}`}
          src={imageUrl}
          width={coverImage.fields.file.details.image.width}
          height={coverImage.fields.file.details.image.height}
          className="absolute inset-0 w-full h-full object-cover z-0 rounded-b-3xl"
        />
      )}

      {/* Overlay with Title & Meta */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="bg-black bg-opacity-60 text-white p-6 sm:p-10 w-full max-w-5xl mx-auto">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-4 text-sm font-light uppercase tracking-wider">
              <span className="border px-2 py-1 border-yellow-400 text-yellow-400">
                <span>{day}</span> {month} {year}
              </span>
              {category && (
                <span className="bg-yellow-400 text-black px-2 py-1 rounded">
                  {category}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold leading-tight">
              {title}
            </h1>

            <ul className="flex flex-wrap text-sm text-gray-300 gap-6 mt-2">
              {author && (
                <li>
                  <i className="lnr lnr-user font-semibold mr-1"></i>
                  <span>{author.fields.name}</span>
                </li>
              )}
              <li>
                <i className="lnr lnr-bubble mr-1"></i>
                0 Comments
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostHeader;
