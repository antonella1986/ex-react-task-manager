import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export function SearchBar() {
    const { setQuery } = useContext(GlobalContext)()

    return (
        <div>
            <input
                type="text"
                placeholder="Cerca un task"
                onChange={(e) => setQuery(e.target.value)}/>
        </div>
    )
}