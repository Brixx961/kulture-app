export const formatDate = (dateString, options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  