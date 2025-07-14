import { NavLink } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { useContext } from "react";

import { TaskRow } from "../components/TaskRow";

export function TaskList() {
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