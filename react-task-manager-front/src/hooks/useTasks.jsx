import { useState, useEffect, useMemo } from "react";

export function useTasks() {
    const [ tasks, setTasks ] = useState([]);
    const [ query, setQuery ] = useState("");
    const [ filteredTasks, setFilteredTasks ] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const response = await fetch("http://localhost:3001/tasks");
            const data = await response.json();
            //i dati ricevuti li metto nello stato tasks tramite setTasks(data)
            setTasks(data);
        }
        //avvio davvero la richiesta (altrimenti la funzione non sarebbe mai eseguita, ma solo dichiarata, e i task non verrebbero mai caricati nello stato)
        fetchTasks();
    }, []);

    //questa funzione riceverà un oggetto chiamato newTask perché lo userò all'interno della funzione stessa
    async function addTask(newTask) {
        try {
            const response = await fetch("http://localhost:3001/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                //converto l'oggetto JS newTask in JSON da mandare nel body
                body: JSON.stringify(newTask),
            });
            //ricevo la risposta e la converto in JSON
            //result conterrà un oggetto con due proprietà: success: true e task: { id: x, title: y...}
            const result = await response.json();

            if (result.success) {
                //aggiorno lo stato dei task aggiungendo quello nuovo a quelli già esistenti
                //prevTasks è una fotografia aggiornata dell'array corrente dei task
                setTasks(prevTasks => [...prevTasks, result.task]);
            } else {
                //l'API ha risposto, ma con errore (es. validazione)
                throw new Error(result.message || "Errore sconosciuto");
            }
        } catch (error) {
            //errore nel fetch (es. connessione) o errore lanciato sopra
            throw new Error(error.message || "Errore nell'aggiunta del task");
        }
    };

    async function removeTask(id) {
        try {
            const response = await fetch(`http://localhost:3001/tasks/${id}`, {
                method: "DELETE"
            });
            //ricevo la risposta e la converto in JSON
            //result conterrà un oggetto con due proprietà: success: true e task: { id: x, title: y...}
            const result = await response.json();

            if (result.success) {
                //aggiorno lo stato dei task rimuovendo quello selezionato da quelli già esistenti
                setTasks(tasks => tasks.filter(task => task.id !== id));
            } else {
                throw new Error(result.message || "Errore sconosciuto");
            }
        } catch (error) {
            //errore nel fetch (es. connessione) o errore lanciato sopra
            throw new Error(error.message || "Errore nella rimozione del task");
        }
    };

/*  const updateTask = (taskId, updatedTask) => {
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } */

    const filteredTask = useMemo(() => {
        return tasks.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
    }, [tasks, query]);


    //queste funzioni sono contenute dentro tasksData associato all'hook useTasks dentro il contesto
    return { tasks, setTasks, addTask, removeTask, filteredTask, query, setQuery };
}