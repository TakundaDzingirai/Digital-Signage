import "./Slide.css";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function Slide({ s }) {

    //   console.log(`this:${screen._id}`);
    return (
        <li className="slide">


            <h1>{s.slideTitle}</h1>

        </li>
    );
}
