import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function SearchBar() {
  const { debounceSearch } = useContext(GlobalContext);

  return (
    <>
    <div className="search-bar-container">
      <input
      type="text"
      className="search-bar"
      placeholder="Cerca task..."
      onChange={(e) => debounceSearch(e.target.value)}
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "var(--primary)" }} className="search-icon"/>
    </div>
    </>
  );
}