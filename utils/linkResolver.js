export const linkResolver = (doc) => {
  switch (doc.type) {
    case 'product':
      return `/detail/${doc.uid}`;
    case 'home':
      return `/home`;
    case 'collections':
      return `/collections`;
    case 'about':
      return `/about`;
    default:
      return `/`;
  }
};
