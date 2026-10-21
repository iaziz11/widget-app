// Helper function to format time into 12h instead of 24h
export interface DateObject {
  seconds: number;
  minutes: number;
  hours: number;
  day: string;
  date: number;
  month: string;
  year: number;
  am: boolean;
}

export function formatTime(currentTime: Date): DateObject {
  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfTheYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return {
    seconds: currentTime.getSeconds(),
    minutes: currentTime.getMinutes(),
    hours:
      currentTime.getHours() < 13
        ? currentTime.getHours() + 1
        : currentTime.getHours() % 12,
    day: daysOfTheWeek[currentTime.getDay()],
    date: currentTime.getDate(),
    month: monthsOfTheYear[currentTime.getMonth()],
    year: currentTime.getFullYear(),
    am: currentTime.getHours() < 12,
  };
}
