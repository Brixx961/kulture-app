import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const RichTextBasic = ({ content }) => {
  if (!content) return null;

  return (
    <div className="prose max-w-none text-neutral-700">
      {documentToReactComponents(content)}
    </div>
  );
};

export default RichTextBasic;
