const ContentfulImage = ({ src, alt, width, height, quality = 75, ...props }) => {
    const optimizedSrc = `${src}?w=${width}&q=${quality}`;
  
    return (
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        {...props}
      />
    );
  };
  
  export default ContentfulImage;
  