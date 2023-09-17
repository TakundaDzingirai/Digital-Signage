import "./Header.css";
export default function Header({ source = "" }) {
  return (
    <div className="Header">
      <img src={source} alt="UCT logo" />
      <h2>University of Cape Town</h2>
    </div>
  );
}
