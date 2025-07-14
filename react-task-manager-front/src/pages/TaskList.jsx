import { NavLink } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import { useContext } from "react";

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
                    {tasks.map(task => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.status}</td>
                            <td>{new Date(task.createdAt).toLocaleDateString('it-IT', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}