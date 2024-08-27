import axios from "axios";
import { useEffect, useState } from "react";
interface Node {
  latitude: string;
  longitude: string;
  name: string;
  style: { [key: string]: string | number };
}
function MapPlotter() {
  const [data, setData] = useState<Node[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/mapdata")
      .then((response) => {
        const arr = response.data.map((val) => {
          const longitude = (val.longitude - 70) * 4 + "%";
          const latitude = (100 - val.latitude - 70) * 5.2 + "%";
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
                backgroundColor: "red",
              };
              break;
            case "MANNode":
              style = {
                width: "100px",
                backgroundColor: "purple",
                textAlign: "center",
                padding: "10px",
                color: "white",
              };
              break;
          }
          return { latitude, longitude, name, style };
        });
        setData(arr);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  console.log(data);
  return (
    <div
      style={{
        width: "100vw",
        height: "90vh",
        // backgroundColor: "red",
        // alignContent: "center",
        position: "relative",
        zIndex: "1",
      }}
    >
      {data.map((val) => {
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
      })}
    </div>
  );
}
export default MapPlotter;
