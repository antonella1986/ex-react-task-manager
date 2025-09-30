import React from "react";
import { NavLink } from "react-router-dom";

//react eviterà di rirenderizzare il componente se le props (task) non cambiano
//TaskRow rappresenta una singola riga della tabella, quindi si passa il singolo oggetto task, uno per volta, così ogni riga sa cosa deve mostrare (title, status, data)
//non importo i task dal contesto globale, perché passo già il singolo task come prop, e TaskList passa ogni singolo task qui quando fa il map: glielo inietta con task={task}
export const TaskRow = React.memo(({ task }) => {
    //dichiaro una variabile per contenere il colore da usare in base allo stato del task
    let statusColor = "";
    if (task.status === "To do") {
        statusColor = "var(--red)";
    } else if (task.status === "Doing") {
        statusColor = "var(--yellow)";
    } else {
        statusColor = "var(--green)";
    }

    return (
        <tr>
            <td className="task task-title"><NavLink to={`/task/${task.id}`}>{task.title}</NavLink></td>
            <td className="task" style={{ color: statusColor }}>{task.status}</td>
            <td className="task">{new Date(task.createdAt).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
                })}
            </td>
        </tr>
    );
})