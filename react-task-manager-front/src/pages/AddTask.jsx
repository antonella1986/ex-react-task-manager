import { NavLink } from "react-router-dom";

export function AddTask() {
    return (
        <div>
            <NavLink to="/">Homepage</NavLink>
            <h1>Add task</h1>
        </div>
    );
}