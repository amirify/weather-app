export const formatDate = (timestamp) => {
  // weather.dt is a UNIX timestamp (in seconds). JavaScript Date expects milliseconds, so multiply by 1000
  const date = new Date(timestamp * 1000);
  return date.toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};
