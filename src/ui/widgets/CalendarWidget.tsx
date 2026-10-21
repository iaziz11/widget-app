import type { CSSProperties } from "react";
import { formatTime } from "../../utils/formatTime.ts";

interface CalendarWidgetProps {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

export default function CalendarWidget({
  primaryColor,
  secondaryColor,
  textColor,
}: CalendarWidgetProps) {
  const today = new Date();
  const month = today.getMonth();

  const { month: monthName, year } = formatTime(today);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalRows = Math.ceil((daysInMonth + firstDay) / 7);
  const totalCells = totalRows * 7;
  const trailingDays = totalCells - daysInMonth;

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const styles: Record<string, CSSProperties> = {
    container: {
      width: "100%",
      boxSizing: "border-box",
      backgroundColor: primaryColor,
      color: textColor,
      border: `1px solid ${secondaryColor}`,
      borderRadius: "10px",
      overflow: "hidden",
      fontFamily: "Arial, sans-serif",
      height: "100%",
    },
    header: {
      padding: "16px",
      textAlign: "center",
      fontSize: "1.1rem",
      fontWeight: 600,
      borderBottom: `1px solid ${secondaryColor}`,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
    },
    weekday: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 0,
      padding: "10px 0",
      fontSize: "0.8rem",
      fontWeight: 600,
      borderBottom: `1px solid ${secondaryColor}`,
    },
    day: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minWidth: 0,
      aspectRatio: "1",
      borderBottom: `1px solid ${secondaryColor}`,
      boxSizing: "border-box",
    },
    dayNumber: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
      height: "2rem",
    },
    today: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
      height: "2rem",
      border: `2px solid ${secondaryColor}`,
      borderRadius: "50%",
      boxSizing: "border-box",
      fontWeight: 700,
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>{`${monthName} ${year}`}</div>

      <div style={styles.grid}>
        {weekdays.map((day) => (
          <div key={day} style={styles.weekday}>
            {day}
          </div>
        ))}

        {Array.from({ length: firstDay }, (_, i) => (
          <div
            key={`empty-${i}`}
            style={{
              ...styles.day,
              borderRight: `1px solid ${secondaryColor}`,
            }}
          />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = day === today.getDate();
          const borderRightStyle =
            (day + firstDay) % 7 !== 0 ? `1px solid ${secondaryColor}` : "none";
          const borderBottomStyle =
            Math.ceil((firstDay + day) / 7) !== totalRows
              ? `1px solid ${secondaryColor}`
              : "none";

          return (
            <div
              key={day}
              style={{
                ...styles.day,
                borderBottom: borderBottomStyle,
                borderRight: borderRightStyle,
              }}
            >
              <span style={isToday ? styles.today : styles.dayNumber}>
                {day}
              </span>
            </div>
          );
        })}

        {Array.from({ length: trailingDays }, (_, i) => {
          const borderRightStyle =
            daysInMonth + i + 1 < totalCells
              ? `1px solid ${secondaryColor}`
              : "none";
          return (
            <div
              key={`trailing-${i}`}
              style={{
                ...styles.day,
                borderBottom: "none",
                borderRight: borderRightStyle,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
