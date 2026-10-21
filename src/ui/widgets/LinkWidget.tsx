import { useState, type CSSProperties } from "react";
import { baseWidgetStyle } from "../styles/BaseWidgetStyle";
import LaunchIcon from "@mui/icons-material/Launch";

interface LinkWidgetProps {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
}

const testLinks: Array<string>[] = [
  ["YouTube", "www.youtube.com"],
  ["Google", "www.google.com"],
  ["GitHub", "www.github.com"],
  ["Reddit", "www.reddit.com"],
  ["Wikipedia", "www.wikipedia.org"],
  ["Amazon", "www.amazon.com"],
  ["Netflix", "www.netflix.com"],
  ["Twitch", "www.twitch.tv"],
  ["Discord", "www.discord.com"],
  ["Stack Overflow", "www.stackoverflow.com"],
];

export default function LinkWidget({
  primaryColor,
  secondaryColor,
  textColor,
}: LinkWidgetProps) {
  const [links] = useState<Array<string>[]>(testLinks);
  const styles: Record<string, CSSProperties> = {
    container: {
      ...baseWidgetStyle,
      backgroundColor: primaryColor,
      border: `1px solid ${secondaryColor}`,
      color: textColor,
      overflowY: "scroll",
      overflowX: "hidden",
    },
    link: {
      color: textColor,
    },
  };
  return (
    <div style={styles.container}>
      {links.map(([name, link]) => (
        <div key={name}>
          <a
            style={styles.link}
            href={`https://${link}`}
            target="_blank"
            rel="noreferrer"
          >
            {name}
            {<LaunchIcon />}
          </a>
        </div>
      ))}
    </div>
  );
}
