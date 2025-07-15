import { useNavigate, useParams, NavLink } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Modal } from "../components/Modal"

export function TaskDetail() {
    //useParams mi fornisce l'id del task
    const { id } = useParams()
    const navigate = useNavigate()
    //accedo a tutti i task (da cui cercare il task voluto)
    const { tasks } = useContext(GlobalContext)
    //cerco il task giusto grazie all'id ottenuto da useParams
    const task = tasks.find(t => t.id.toString() === id)
    //accedo alla funzione removeTask che si trova nel contesto
    const { removeTask } = useContext(GlobalContext);
    const [showModal, setShowModal] = useState(false);

    if (!task) return <p>Task non trovato</p>;

    let statusColor = "";
    if (task.status === "To do") {
        statusColor = "red";
    } else if (task.status === "Doing") {
        statusColor = "yellow";
    } else {
        statusColor = "green";
    }

    const handleDelete = async () => {
        try {
            //"aspetta che io comunichi con il backend e cancelli il task con questo id (rispondendo al frontend { success: true }). Dopo il frontend aggiorna lo stato locale con setTasks(). Completato questo con successo, passo alla riga successiva."
            await removeTask(task.id)
            alert("Task eliminato")
            navigate("/TaskList")
        } catch (error) {
            alert("Errore nella rimozione del task" + error.message)
        }
    }


    return (
        <div>
            <NavLink to="/"><h1>Homepage</h1></NavLink>
            <h3>Nome</h3>
            <p>{task.title}</p>
            <h4>Descrizione</h4>
            <p>{task.description}</p>
            <h4>Status</h4>
            <p style={{ color: statusColor }}>{task.status}</p>
            <h4>Data di creazione</h4>
            <p>{new Date(task.createdAt).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })}</p>
            <button onClick={() => setShowModal(true)}>Elimina task</button>
            <Modal
                show={showModal}
                title="Conferma eliminazione"
                content="Sei sicuro di voler eliminare questo task?"
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
                confirmText="Elimina"
            />
        </div>
    )
}