import { useEffect } from "react";
import Screen from "./Screen";
import "./Screens.css";
import Axios from "axios";

export default function Screens({ listOfUsers, setListOfUsers }) {
  //const [listOfUsers, setListOfUsers] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/screens").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);
  return (
    <ul className="screen-list">
      {listOfUsers.map((screen) => (
        <Screen key={screen.id} screen={screen} />
      ))}
    </ul>
  );
}
