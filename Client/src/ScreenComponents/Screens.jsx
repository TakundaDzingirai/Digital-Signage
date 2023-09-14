import { useEffect } from "react";
import Screen from "./Screen";
import "./Screens.css";
import Axios from "axios";

export default function Screens({ listOfScreen, setListOfScreen, departmnt }) {
  //const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    console.log("UseEffect of Screens with department:", departmnt)
    Axios.get("http://localhost:3000/screens", {
      params: { department: departmnt }, // Send department as a query parameter
    }).then((response) => {
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
