import { useTasks } from "../hooks/useTasks";

export function SearchBar() {
  const { debounceSearch } = useTasks();

  return (
    <input
      type="text"
      placeholder="Cerca un task"
      onChange={(e) => debounceSearch(e.target.value)}
    />
  );
}