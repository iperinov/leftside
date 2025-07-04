export const formatDateTime = (timestamp: number, locale = "en-US", timeZone?: string): string => {
  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...(timeZone && { timeZone }),
  };

  const formatted = new Intl.DateTimeFormat(locale, options).format(date);

  return formatted;
};

export const customFormatDateTime = (timestamp: number, locale: string, timeZone?: string): string => {
  const formatted = formatDateTime(timestamp, locale, timeZone);

  // Convert "6/23/25, 5:13 PM" -> "6/23/25@5:13pm"
  return formatted.replace(",", "@").replace(/\s/g, "").replace(/PM/i, "pm").replace(/AM/i, "am");
};
