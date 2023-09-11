import "./Slide.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import Axios from "axios";
import Slide from "./Slide";

export default function Slides() {
    const { id } = useParams();
    //   console.log(`this:${screen._id}`);
    const [sldData, setsldData] = useState([]);


    useEffect(() => {
        Axios.get(`http://localhost:3000/content/${id}`).then((response) => {
            setsldData(response.data);
            console.log("RESPONSE MHANI!!! ", response.data);

        });
    }, []);
    console.log("After get request:")
    console.log(sldData);
    return (
        <ul className="slide-list">
            {sldData.map((s) => (
                <Slide key={s._id} s={s} />
            ))}

        </ul>
    );
}
