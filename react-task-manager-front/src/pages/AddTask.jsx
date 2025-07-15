import { NavLink } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export function AddTask() {
    //prendo la funzione addTask dal contesto globale, il quale ha il link per la sua logica nell'hook useTasks
    const { addTask } = useContext(GlobalContext);

    const descriptionRef = useRef(null);
    const statusRef = useRef(null);
    const [title, setTitle] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const description = descriptionRef.current.value;
        const status = statusRef.current.value;
        const symbols = /[!@#$%^&*()\-=+[\]{}|;:'\\]"?/;

        if (!title) {
            alert('Il campo non può essere vuoto')
            return
        } else if (symbols.test(title)) {
            alert('Il titolo non può contenere simboli speciali');
            return;
        }
        console.log({ title, description, status });
        //costruisco un oggetto con i dati raccolti dal form
        const newTask = {
            title,
            description,
            status,
        };
        //chiamo la funzione addTask() per inviare il nuovo task al backend
        try {
            await addTask(newTask);
            alert("Task aggiunto con successo!");
            //reset del form se il nuovo task è stato aggiunto con successo
            setTitle("");
            description = "";
            status = "To do";
        } catch (error) {
            alert("Errore: " + error.message);
        }
    }

    return (
        <div>
            <NavLink to="/">Homepage</NavLink>
            <h1>Aggiungi nuovo task</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Titolo</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="description">Descrizione</label>
                <input
                    type="text"
                    ref={descriptionRef}
                />
                <label htmlFor="status">Status</label>
                <select defaultValue={"To do"} ref={statusRef}>
                    <option value="To do">To do</option>
                    <option value="Doing">Doing</option>
                    <option value="Done">Done</option>
                </select>
                <button onClick={handleSubmit}>Aggiungi</button>
            </form>
        </div>
    );
}