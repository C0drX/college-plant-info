export const formatTime = (dateString) => {
  const date = new Date(dateString);

  const ist = new Date(
    date.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = String(ist.getDate()).padStart(2, "0");
  const month = months[ist.getMonth()];
  const year = ist.getFullYear();

  const hours = String(ist.getHours()).padStart(2, "0");
  const minutes = String(ist.getMinutes()).padStart(2, "0");
  const seconds = String(ist.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year} - ${hours}:${minutes}:${seconds}`;
};
