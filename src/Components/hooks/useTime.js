const useTime = (timestamp) => {
  const now = new Date(timestamp);
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
  }
  if (hours > 12) {
    hours -= 12;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return `${hours}:${minutes} ${period}`;
};

export default useTime;
