import React from "react";
import { NavLink } from "react-router-dom";
import star from "../../public/icons/star.svg";
import star_empty from "../../public/icons/star_empty.svg";

//react eviterà di rirenderizzare il componente se le props (task) non cambiano
//TaskRow rappresenta una singola riga della tabella, quindi si passa il singolo oggetto task, uno per volta, così ogni riga sa cosa deve mostrare (title, status, data)
//non importo i task dal contesto globale, perché passo già il singolo task come prop, e TaskList passa ogni singolo task qui quando fa il map: glielo inietta con task={task}
export const TaskRow = React.memo(({ task, toggleImportant }) => {
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
            <td className="task status" style={{ color: statusColor }}>{task.status}</td>
            <td className="important-td">
                <button onClick={() => toggleImportant(task.id)} className="important-button">
                {task.important ? <img src={star} alt="Segna come non importante" style={{width: '30px'}} /> : <img src={star_empty} alt="Segna come importante" style={{width: '30px'}} />}
                </button>
            </td>
        </tr>
    );
})

/* {task.important && <img src={star} alt="star" style={{width: '30px'}} />} */






/* import auntie from 'family'

function smartBoy() {
    return {
        brain: '🚀',
        hearth: '❤️',
        powerSource: auntie
    }
}

console.log(smartBoy()) */





