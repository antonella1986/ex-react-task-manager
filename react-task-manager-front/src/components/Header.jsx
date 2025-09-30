import { Link } from 'react-router-dom';
import favourites from "../../public/icons/favourites.svg";
import logo from "../../public/logo.svg";

export default function Header() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link className="active logo-space" to={'/'}>
                    <img className="logo" alt="Logo" src={logo} style={{height: '60px', paddingLeft: '1rem', paddingRight: '0.5rem'}} /> <span style={{color: 'var(--primary)', fontSize: '2rem', lineHeight: '0.75'}}>Task <br /> Manager</span>
                </Link>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="menu-sx">
                        <li>
                            <Link className="products-link" to={'/TaskList'}>TASK LIST</Link>
                        </li>
                        <li>
                            <Link className="products-link" to={'/AddTask'}>ADD NEW TASK</Link>
                        </li>
                    </ul>
                </div>
            </div>
            <Link to="/favourites" className="hearth-icon">
                <img className="preferiti" src={favourites} alt="preferiti" style={{height: '24px', paddingRight: '4rem'}} />
            </Link>
        </nav>
    );
}