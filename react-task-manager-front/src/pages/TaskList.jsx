import { NavLink } from "react-router-dom";
//importo l'hook useContext per leggere il valore del contesto (l'elenco dei task)
import { useContext } from "react";

import { GlobalContext } from "../contexts/GlobalContext";
import { TaskRow } from "../components/TaskRow";

export function TaskList() {
    //prendo l'array di tutti i task dal file GlobalContext e li rendo leggibili e utilizzabili nel componente tramite useContext
    //se stampo, vedo un array di oggetti (id, title...)
    const { tasks } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('1');

    function handleSort(column) {
        if (sortBy === column) {
            setSortOrder(sortOrder === '1' ? '-1' : '1');
        } else {
            setSortBy(column);
            setSortOrder('1');
        }
    }

    return (
        <div>
            <NavLink to="/">Homepage</NavLink>
            <h1>Task list</h1>
            <table>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('title')}>Nome</th>
                        <th onClick={() => handleSort('status')}>Stato</th>
                        <th onClick={() => handleSort('createdAt')}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <TaskRow key={task.id} task={task} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}