export const formatDate = (date) => {
  if (!date) return "";

  return new Date(date).toISOString().split("T")[0];
};

export const formatSlotDate = (date) => {
  const [day, month, year] = date.split("_");

  const dateObj = new Date(year, month - 1, day);

  return dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};
