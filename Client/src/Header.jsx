import "./Header.css";
export default function Header({ source = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fcca.uct.ac.za%2F&psig=AOvVaw27G4O0Z310P8EstknPLzS4&ust=1694946007751000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCNCIq4r0roEDFQAAAAAdAAAAABAE" }) {
  return (
    <div className="Header">
      <img src={source} alt="UCT logo" />
      <h2>University of Cape Town</h2>
    </div>
  );
}
