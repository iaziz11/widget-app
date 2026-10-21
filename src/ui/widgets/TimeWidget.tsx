import { useEffect, useState, type CSSProperties } from "react";
import type { DateObject } from "../../utils/formatTime.ts";
import { formatTime } from "../../utils/formatTime.ts";
import { baseWidgetStyle } from "../styles/BaseWidgetStyle.ts";

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

  const styles: Record<string, CSSProperties> = {
    container: {
      ...baseWidgetStyle,
      backgroundColor: primaryColor,
      border: `1px solid ${secondaryColor}`,
      color: textColor,
    },
    date: {
      fontSize: "1.5rem",
      margin: "1rem 1rem",
    },
    time: { fontSize: "2rem" },
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div style={styles.container}>
      {/* Date */}
      <div
        style={styles.date}
      >{`${now.day}, ${now.month} ${now.date}, ${now.year}`}</div>

      {/* Time */}
      <div style={{ fontSize: "5.5rem", fontWeight: 700 }}>
        {`${now.hours}:${now.minutes < 10 ? `0${now.minutes}` : now.minutes}`}{" "}
        <span style={styles.time}>{`${now.am ? "AM" : "PM"}`}</span>
      </div>
    </div>
  );
}
