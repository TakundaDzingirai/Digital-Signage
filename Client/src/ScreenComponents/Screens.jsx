import { useEffect } from "react";
import Screen from "./Screen";
import "./Screens.css";
import Axios from "axios";

export default function Screens({ listOfScreen, setListOfScreen }) {
  useEffect(() => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    Axios.get("http://localhost:3000/screens", { headers })
      .then((response) => {
        setListOfScreen(response.data);
      })
      .catch((error) => {
        console.error("Error fetching screens:", error.message);
      });
  }, []);

  return (
    <ul className="screen-list">
      {listOfScreen.map((screen) => (
        <Screen
          key={screen._id}
          screen={screen}
          listOfScreen={listOfScreen}
          setListOfScreen={setListOfScreen}
        />
      ))}
    </ul>
  );
}
