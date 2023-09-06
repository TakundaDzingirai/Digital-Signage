import "./Slide.css";
import { Link } from 'react-router-dom';

export default function Slides({ s }) {
    //   console.log(`this:${screen._id}`);
    return (
        <li className="slide">


            <h1>{s.Title}</h1>

        </li>
    );
}
