import "./Slide.css";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";


export default function Slide({ s }) {
    // const { id } = useParams();
    const History = useNavigate();
    function handleNavigation() {
        History(`/content/more/${s._id}`);
    }

    //   console.log(`this:${screen._id}`);
    return (
        <div onClick={handleNavigation} className="slide">


            <h1>{s.slideTitle}</h1>

        </div>
    );
}
