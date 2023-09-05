import "./Screen.css";
import { Link } from 'react-router-dom';

export default function Screen({ screen }) {
  console.log(`this:${screen._id}`);
  return (
    <li className="screen">
    
      <Link to={`/screen/${screen._id}`}>
        <h1>{screen.screenName}</h1>
        <p>{screen.department}</p>
      </Link>
    </li>
  );
}
