export const getLastPageFromLinks = (links) => {
  const result = links.match(/<.*?_page=(\d+)&_limit=\d+>; rel="last"/);
  return result ? Number(result[1]) : null;
};
