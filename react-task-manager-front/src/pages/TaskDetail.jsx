import { useNavigate, useParams } from "react-router-dom"
import { useContext, useState } from "react"
import { GlobalContext } from "../contexts/GlobalContext"
import { Modal } from "../components/Modal"
import star from "../../public/icons/star.svg"
import star_empty from "../../public/icons/star_empty.svg"

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
    //importo toggleImportant
    const { toggleImportant } = useContext(GlobalContext);

    if (!task) return <p>Task non trovato</p>;

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
        <div className="task-detail">
            <div className="task-detail-container1">
                <div className="task-detail-name">
                    <h3>Nome</h3>
                    <p>{task.title}</p>
                </div>
                <div className="task-detail-description">
                    <h3>Descrizione</h3>
                    <p>{task.description}</p>
                </div>
            </div>
            <div className="task-detail-container2">
                <div className="task-detail-status">
                    <h3>Status</h3>
                    <p>{task.status}</p>
                </div>
                <div className="task-detail-date">
                    <h3>Data di creazione</h3>
                    <p>{new Date(task.createdAt).toLocaleDateString('it-IT', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                    })}</p>
                </div>
                <div className="task-detail-priority">
                    <h3>Priorità</h3>
                    <button onClick={() => toggleImportant(task.id)} className="important-button">
                        {task.important ? <img src={star} alt="Segna come non importante" className="star-img"/>  : <img src={star_empty} alt="Segna come importante" className="star-img"/>}
                    </button>
                </div>
            </div>
            <div className="task-detail-actions">
                <button onClick={() => setShowModal(true)} className="button-delete">ELIMINA TASK</button>
                <Modal
                    show={showModal}
                    title="Conferma eliminazione"
                    content="Sei sicuro di voler eliminare questo task?"
                    onClose={() => setShowModal(false)}
                    onConfirm={handleDelete}
                    confirmText="Elimina"
                />
            </div>
        </div>
    )
}