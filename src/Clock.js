import { useState, useEffect } from "react";

export default function Clock({ height, width }) {
  const [hourAng, setHourAng] = useState(0);
  const [minuteAng, setMinuteAng] = useState(0);
  const [secondAng, setSecondAng] = useState(0);
  const [hour, setHour] = useState("0");
  const [minute, setMinute] = useState("0");
  const [second, setSecond] = useState("0");
  const time = useTime();
  const hourStr = hour.repeat(14);
  const minuteStr = minute.repeat(17);
  const secondStr = second.repeat(23);

  const hourStyle = {
    display: "inline-block",
    backgroundColor: "none",
    transform: "rotate(" + (hourAng - 90) + "deg)",
    position: "absolute",
    justifyContent: "center",
    textAlign: "left",
    lineHeight: "1",
    transformOrigin: "left",
    maxWidth: "100px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition: hourAng === 0 ? "none" : "1s",
  };
  const minuteStyle = {
    display: "inline-block",
    backgroundColor: "none",
    transform: "rotate(" + (minuteAng - 90) + "deg)",
    position: "absolute",
    justifyContent: "center",
    textAlign: "left",
    lineHeight: "1",
    transformOrigin: "left",
    maxWidth: "135px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition: minuteAng === 0 ? "none" : "1s",
  };
  const secondStyle = {
    display: "inline-block",
    backgroundColor: "none",
    transform: "rotate(" + (secondAng - 90) + "deg)",
    transformOrigin: "left",
    position: "absolute",
    justifyContent: "center",
    textAlign: "left",
    lineHeight: "1",
    maxWidth: "180px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    transition: secondAng === 0 ? "none" : "1s",
  };

  function useTime() {
    const [time, setTime] = useState(() => new Date());
    useEffect(() => {
      const id = setInterval(() => {
        setTime(new Date());
        setHourAng(time.getHours() * 30);
        setMinuteAng(time.getMinutes() * 6);
        setSecondAng(time.getSeconds() * 6);
        setHour(time.getHours().toString() + " ");
        setMinute(time.getMinutes().toString() + " ");
        setSecond(time.getSeconds().toString() + " ");
      }, 1000);

      return () => clearInterval(id);
    });
    return time;
  }

  return (
    <div
      style={{
        borderRadius: "100%",
        border: "4px solid black",
        height: "400px",
        width: "400px",

        backgroundColor: "white",
      }}
    >
      <div
        className="here"
        style={{
          position: "relative",
          placeContent: "center",
          textAlign: "center",
          paddingTop: "180px",
        }}
      >
        <div style={hourStyle}>{hourStr}</div>
        <div style={minuteStyle}>{minuteStr}</div>
        <div style={secondStyle}>{secondStr}</div>
        <div
          style={{
            border: "4px solid black",
            width: "0px",
            left: "49%",
            borderRadius: "4px",
            position: "absolute",
          }}
        ></div>
      </div>
    </div>
  );
}
