import { NavLink } from "react-router-dom";

export function Homepage() {
    return (
        <>
            <div className="homepage">
            <h1>Your daily <br /> Task Manager</h1>
                <div className="menu">
                    <button className="button-list">
                        <NavLink to="/TaskList"><strong className="button-text">Go to the task list</strong></NavLink>
                    </button>
                </div>
            </div>
        </>
    );
}