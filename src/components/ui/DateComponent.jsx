import { formatDate } from "../../lib/utilities/utils";  // Correct relative path
  // Use the relative path

const DateComponent = ({ dateString, options, ...rest }) => {
  return (
    <time dateTime={dateString} {...rest}>
      {formatDate(dateString, options)}
    </time>
  );
}

export default DateComponent;
