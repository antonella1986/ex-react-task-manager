import { NavLink } from "react-router-dom";

export default function Homepage() {
    return (
        <div>
            <h1>Homepage</h1>
            <NavLink to="/TaskList">Tasks</NavLink>
            <NavLink to="/AddTask"> Add task</NavLink>
        </div>
    );
}