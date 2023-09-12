import "./Slide.css";
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";


export default function Slide({ s, screenId }) {
    // const { id } = useParams();
    console.log("inSlide", screenId)
    const navigate = useNavigate();
    function handleNavigation() {
        navigate(`/content/more/${s._id}`, { state: { screenId } }); // Pass screenId in the state object
        ; // s._id is the slide id
    }

    //   console.log(`this:${screen._id}`);
    return (
        <div onClick={handleNavigation} className="slide">


            <h1>{s.slideTitle}</h1>

        </div>
    );
}
