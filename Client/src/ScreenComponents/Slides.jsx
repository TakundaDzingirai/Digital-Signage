import "./Slide.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";

export default function Slide() {
    const { id } = useParams();
    //   console.log(`this:${screen._id}`);
    const [sldData, setsldData] = useState([]);


    useEffect(() => {
        Axios.get(`http://localhost:3000/content/${id}`).then((response) => {
            setsldData(response.data);
        });
    }, []);
    console.log("After get request:")
    console.log(sldData);
    return (
        <ul className="slide-list">
            {sldData.content.map((s) => (
                <Screen key={s.Title} s={s} />
            ))}

        </ul>
    );
}
