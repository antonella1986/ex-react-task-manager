import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export function SearchBar() {
  const { debounceSearch } = useContext(GlobalContext);

  return (
    <input
      type="text"
      className="search-bar"
      placeholder="Cerca per nome..."
      onChange={(e) => debounceSearch(e.target.value)}
    />
  );
}