import axios from "axios";
import { useEffect, useState } from "react";
function MapPlotter() {
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/mapdata")
      .then((data) => {
        setData(data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);
  console.log(data);
  return <div></div>;
}
export default MapPlotter;
