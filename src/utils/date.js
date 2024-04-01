export const formatDate = (d) => {
  const match = d.match(/\/Date\((\d+)\)\//);

  const timestamp = parseInt(match[1]);
  const date = new Date(timestamp);

  return date
};

export const sendDateTime = (d) => {
  const milliseconds = d.getTime();
  return `/Date(${milliseconds})/`;
}

export const currentDateMillisencods = () => {
  const d = Date.now()
  return `/Date(${d})/`
}