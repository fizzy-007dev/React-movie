import { Link } from "react-router-dom";
import "../css/Navbar.css"

{/*NavBar component with links to Home and Favorites pages */}
function NavBar() {
    return <nav className="navbar">
        <div className="navbar-brand">{/* className "navbar-brand" for styling the brand/logo section of the navbar */}
            <Link to="/">MovieFlix</Link>
        </div>
        <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            {/* className "nav-link" for styling the individual navigation links when pressed home link page routes to the home page*/}
            <Link to="/favorites" className="nav-link">Favorites</Link>
        </div>
    </nav>
}

export default NavBar