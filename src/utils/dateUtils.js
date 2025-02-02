// Open Weather date is a UNIX timestamp (in seconds).
// JavaScript Date expects milliseconds, so we multiply by 1000
export const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};
