import Carousel from 'react-material-ui-carousel';
import Item from './Item';
import ScreenPanel from '../ScreenComponents/ScreenPanel';
import "./Carousel.css";
export default function AutoSlider() {
    const items = [
        {
            id: 1,
            Title: "Slide 1",
            Body: "So this is the information of Slide 1!!!",
        },
        {
            id: 2,
            Title: "Slide 2",
            Body: "So this is the information of Slide 2!!!",

        },
        {
            id: 3,
            Title: "Slide 3",
            Body: "So this is the information of Slide 3!!!",

        },
        {
            id: 4,
            Title: "Slide 4",
            Body: "So this is the information of Slide 4!!!",

        }


    ];

    return (
        <div className="caroul" style={{
            width: "80%",
            marginLeft: "10%",
            justifyContent: "center",
            position: "absolute",
            top: '50 %',
            left: "50 %",
            transform: "translate(-50 %, -50 %)"



        }} >
            <Carousel >
                {items.map((item) => <Item key={item.id} item={item} />)}
            </Carousel>
        </div >


    );
}


