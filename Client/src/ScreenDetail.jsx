import { useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
export default function ScreenDetail({ listOfUsers,setListOfUsers }) {
  const { id } = useParams();

  // Find the screen with the matching ID in listOfUsers
  const [screenData, setScreenData] = useState({});
  useEffect(() => {
    Axios.get(`http://localhost:3000/screens/${id}`)
      .then((response) => {
        setScreenData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>{screenData.screenName} </h1>
      <h3>This screen was created @ {screenData.createdAt}</h3>
      {<p>{screenData.department}</p>}
      {/* Display other screen details here */}
    </div>
  );
}
