const baseURL = process.env.REACT_APP_API || 'http://localhost:5000';

const urls = {
  books: '/books',
  edit: '/edit',
};

export {
  urls,
  baseURL,
};
