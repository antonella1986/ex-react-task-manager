import React from "react";
import { NavLink } from "react-router-dom";

//react eviterà di rirenderizzare il componente se le props (task) non cambiano
//TaskRow rappresenta una singola riga della tabella, quindi si passa il singolo oggetto task, uno per volta, così ogni riga sa cosa deve mostrare (title, status, data)
export const TaskRow = React.memo(({ task }) => {
    //dichiaro una variabile per contenere il colore da usare in base allo stato del task
    let statusColor = "";
    if (task.status === "To do") {
        statusColor = "red";
    } else if (task.status === "Doing") {
        statusColor = "yellow";
    } else {
        statusColor = "green";
    }

    return (
        <tr>
            <td><NavLink to={`/task/${task.id}`}></NavLink>{task.title}</td>
            <td style={{ color: statusColor }}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
                })}
            </td>
        </tr>
    );
})