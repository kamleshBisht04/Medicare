export const format_Date = (date) => {
  return date.replaceAll("_", "-");
};

export const dateFormat = (date) => {
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
