import RichText from '../RichText';

const PostBody = ({ post }) => {
  const { content } = post.fields;

  console.log(content);

  return (
    <div className='text-black bg-white mx-auto prose relative px-4 sm:px-6 lg:px-10 mt-20 mx-auto'>
      <RichText content={content} />
    </div>
  );
};

export default PostBody;
