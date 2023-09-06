import "./Slide.css";


export default function Slides({ sldData }) {
    //   console.log(`this:${screen._id}`);
    return (
        <ul className="slide-list">
            {sldData.content.map((s) => (
                <Screen key={s.Title} s={s} />
            ))}

        </ul>
    );
}
