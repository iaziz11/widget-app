import { useState } from "react";
import ReactGridLayout, {
  useContainerWidth,
  verticalCompactor,
} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Switch from "@mui/material/Switch";
import TimeWidget from "./ui/widgets/TimeWidget";
import CalendarWidget from "./ui/widgets/CalendarWidget";
import LinkWidget from "./ui/widgets/LinkWidget";

const initialLayout = [
  { i: "clock", x: 0, y: 0, w: 5, h: 3, minW: 5, minH: 3 },
  { i: "calendar", x: 10, y: 0, w: 6, h: 7, isResizable: false },
  { i: "links", x: 0, y: 8, w: 4, h: 3 },
];

function App() {
  const { width, containerRef, mounted } = useContainerWidth();

  // User can resize widgets and move them when edit mode is on
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {/* Background Image */}
      <div
        style={{
          position: "fixed",
          inset: 0,
        }}
      >
        <img
          draggable={false}
          style={{
            objectFit: "fill",
            width: "100vw",
            height: "100vh",
            userSelect: "none",
          }}
          src="/src/assets/image.jpg"
        />
      </div>

      {/* Edit Mode Switch */}
      <div
        id="header"
        style={{
          position: "sticky",
          top: "0",
          minHeight: "30px",
          width: "100%",
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
        }}
      >
        <span>Edit Mode</span>
        <Switch
          checked={isEditing}
          onChange={(event) => setIsEditing(event.target.checked)}
        />
      </div>

      {/* Main Grid Body */}
      <div ref={containerRef} id="mainContainer">
        {mounted && (
          <ReactGridLayout
            width={width}
            layout={initialLayout}
            gridConfig={{
              cols: 24,
              rowHeight: 55,
              margin: [12, 12],
            }}
            style={{ margin: "0 2rem" }}
            dragConfig={{ enabled: isEditing }}
            resizeConfig={{ enabled: isEditing }}
            compactor={verticalCompactor}
          >
            <div key="clock">
              <TimeWidget
                primaryColor="blue"
                secondaryColor="white"
                textColor="white"
              />
            </div>
            <div key="calendar">
              <CalendarWidget
                primaryColor="blue"
                secondaryColor="white"
                textColor="white"
              />
            </div>
            <div key="links">
              <LinkWidget
                primaryColor="blue"
                secondaryColor="white"
                textColor="white"
              />
            </div>
          </ReactGridLayout>
        )}
      </div>
    </>
  );
}

export default App;
