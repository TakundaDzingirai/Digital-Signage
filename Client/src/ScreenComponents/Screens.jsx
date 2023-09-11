import { useEffect } from "react";
import Screen from "./Screen";
import "./Screens.css";
import Axios from "axios";

export default function Screens({ listOfScreen, setListOfScreen }) {
  //const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/screens").then((response) => {
      setListOfScreen(response.data);
    });
  }, []);
  console.log(listOfScreen);
  return (
    <ul className="screen-list">
      {listOfScreen.map((screen) => (
        <Screen key={screen._id} screen={screen} listOfScreen={listOfScreen} setListOfScreen={setListOfScreen} />
      ))}

    </ul>
  );
}
