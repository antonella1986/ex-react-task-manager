import { NavLink } from "react-router-dom";
import { useRef, useState } from "react";

export function AddTask() {
    const descriptionRef = useRef(null);
    const statusRef = useRef(null);

    const [title, setTitle] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        const description = descriptionRef.current.value;
        const status = statusRef.current.value;
        const symbols = "!@#$%^&*()-_=+[]{}|;:'\\";

        if (!title) {
            alert('Il campo non può essere vuoto')
            return
        } else if (symbols.test(title)) {
            alert('Il titolo non può contenere simboli speciali');
            return;
        }
        console.log({ title, description, status });
    }

    return (
        <div>
            <NavLink to="/">Homepage</NavLink>
            <h1>Add task</h1>
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
                <button onClick={handleSubmit}>Aggiungi task</button>
            </form>
        </div>
    );
}