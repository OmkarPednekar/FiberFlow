import axios from "axios";
import { useEffect, useState } from "react";
interface Node {
  latitude: string;
  longitude: string;
  name: string;
  style: { [key: string]: string | number };
}
const findLengthAndAngle = (x1: number, x2: number, y1: number, y2: number) => {
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

  // Calculate the midpoint for positioning the line
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return [length, angle, midX, midY];
};
function MapPlotter() {
  const [data, setData] = useState([]);
  const [lines, setLines] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/mapdata")
      .then((response) => {
        const arr: any[] = [];
        let angle_arr = [];
        response.data.map((val) => {
          const longitude = (val.longitude - 65) * 3 + "%";
          const latitude = (100 - val.latitude - 68) * 4.2 + "%";
          const name = val.name;
          let style;
          switch (val.type) {
            case "CoreNode":
              style = {
                width: "120px",
                textAlign: "center",
                padding: "10px",
                backgroundColor: "blue",
                color: "white",
              };
              break;
            case "RegionalHub":
              style = {
                width: "80px",
                textAlign: "center",
                padding: "10px",
                backgroundColor: "purple",
              };
              break;
            case "MANNode":
              style = {
                width: "100px",
                backgroundColor: "red",
                textAlign: "center",
                padding: "10px",
                color: "white",
              };
              break;
          }

          for (let i = 0; i < val.connections.length; i++) {
            // console.log(response.data[0][]);
            // let angle = findLengthAndAngle(
            //   val.longitude,
            //   response.data[0][val.connections[i]].longitude,
            //   val.latitude,
            //   response.data[val.connections[i]].latitude
            // );
            angle_arr.push([]);
          }
          arr.push({ latitude, longitude, name, style });
        });
        setLines(angle_arr);
        setData(arr);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  console.log(lines);
  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",

        position: "relative",
        zIndex: "0",
      }}
    >
      <div
        style={{
          width: "1px",
          height: "100px",
          backgroundColor: "red",
          zIndex: 1,
          position: "absolute",
          right: "10%",
          top: "10%",
        }}
      ></div>
      {data.map(
        (val: {
          latitude: string;
          longitude: string;
          name: string;
          style: { [key: string]: string };
        }) => {
          return (
            <div
              style={{
                top: val.latitude,
                left: val.longitude,
                // marginBottom: "18.9769vh",
                position: "absolute",
                zIndex: "1",
              }}
            >
              <div style={val.style}>{val.name}</div>
            </div>
          );
        }
      )}
    </div>
  );
}
export default MapPlotter;
