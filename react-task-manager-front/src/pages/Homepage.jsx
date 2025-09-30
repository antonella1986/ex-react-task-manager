import { NavLink } from "react-router-dom";

export function Homepage() {
    return (
        <>
            <div className="homepage">
            <h1>Il tuo <br /> Task Manager</h1>
                <div className="menu">
                    <button className="button-list">
                        <NavLink to="/TaskList"><strong className="button-text">Vai alla lista dei task</strong></NavLink>
                    </button>
                </div>
            </div>
        </>
    );
}