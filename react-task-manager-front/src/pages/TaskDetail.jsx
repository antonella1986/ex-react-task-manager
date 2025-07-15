import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../contexts/GlobalContext"

export function TaskDetail({ task }) {
    //useParams mi fornisce l'id del task
    const { id } = useParams()
    //accedo a tutti i task (da cui cercare il task voluto)
    const { tasks } = useContext(GlobalContext)
    //cerco il task giusto grazie all'id ottenuto da useParams
    const task = tasks.find(t => t.id.toString() === id)

    return (
        <div>
            <h3>Nome</h3>
            <p>{task.title}</p>
            <h4>Descrizione</h4>
            <p>{task.description}</p>
            <h4>Status</h4>
            <p>{task.status}</p>
            <h4>Data di creazione</h4>
            <p>{task.createdAt}</p>
            <button>Elimina task</button>
        </div>
    )
}