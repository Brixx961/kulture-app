import ContentfulImage from './ContentfulImage';

const Avatar = ({ name, picture }) => {
  return (
    <div className="flex items-center">
      <div className="w-10 h-10 mr-4 relative">
        <ContentfulImage
          src={picture.fields.file.url}
          alt={name}
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </div>
      <div className="font-semibold">{name}</div>
    </div>
  );
};

export default Avatar;
