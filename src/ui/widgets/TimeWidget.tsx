import { useEffect, useState } from "react";
import type { DateObject } from "../../utils/formatTime.ts";
import { formatTime } from "../../utils/formatTime.ts";

interface TimeWidgetProps {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

// Widget that displays current time and date
export default function TimeWidget({
  primaryColor,
  secondaryColor,
  textColor,
}: TimeWidgetProps) {
  const [now, setNow] = useState<DateObject>(() => formatTime(new Date()));
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div
      style={{
        backgroundColor: primaryColor,
        border: `1px solid ${secondaryColor}`,
        borderRadius: "10px",
        color: textColor,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{ fontSize: "1.5rem", margin: "1rem 1rem" }}
      >{`${now.day}, ${now.month} ${now.date}, ${now.year}`}</div>
      <div style={{ fontSize: "5.5rem", fontWeight: 700 }}>
        {`${now.hours}:${now.minutes < 10 ? `0${now.minutes}` : now.minutes}`}{" "}
        <span style={{ fontSize: "2rem" }}>{`${now.am ? "AM" : "PM"}`}</span>
      </div>
    </div>
  );
}
