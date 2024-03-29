export const formatDate = (d) => {
  const match = d.match(/\/Date\((\d+)\)\//);

  const timestamp = parseInt(match[1]);
  const date = new Date(timestamp);

  return date
};