import { NavLink } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";

export function Homepage() {
    return (
        <div>
            <h1>Homepage</h1>
            <NavLink to="/TaskList">Tasks</NavLink>
            <NavLink to="/AddTask"> Add task</NavLink>
            <SearchBar/>
        </div>
    );
}