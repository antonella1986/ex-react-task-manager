import { NavLink } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
//importo l'hook useContext per leggere il valore del contesto (l'elenco dei task)
import { useContext } from "react";

import { TaskRow } from "../components/TaskRow";

export function TaskList() {
    //prendo l'array di tutti i task dal file GlobalContext e li rendo leggibili e utilizzabili nel componente tramite useContext
    //se stampo tasks, vedo un array di oggetti (id, title...)
    const { tasks } = useContext(GlobalContext);

    return (
        <div>
            <NavLink to="/">Homepage</NavLink>
            <h1>Task list</h1>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Stato</th>
                        <th>Data di creazione</th>
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