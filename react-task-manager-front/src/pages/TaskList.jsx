import { NavLink } from "react-router-dom";

export function TaskList() {
    return (
        <div>
            <NavLink to="/">Homepage</NavLink>
            <h1>Task list</h1>
        </div>
    );
}