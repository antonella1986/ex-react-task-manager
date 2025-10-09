import { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "lodash";

export function useTasks() {
    const [ tasks, setTasks ] = useState([]);
    const [ query, setQuery ] = useState("");

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

    //FUNZIONE PER AGGIUNGERE I TASK
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

    //FUNZIONE PER RIMUOVERE I TASK
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
    
    //FUNZIONE PER FILTRARE I TASK IN BASE AL TESTO DIGITATO NELLA RICERCA
    const filteredTask = useMemo(() => {
        return tasks.filter(task =>
            task.title.toLowerCase().includes(query.toLowerCase())
        );
    //se ad esempio viene aggiunto un task, il filtro si ricalcola per includere il nuovo task se corrisponde alla query attuale
    }, [tasks, query]);

    //FUNZIONE PER AGGIUNGERE LA STELLINA AL TASK PER MARCARNE L'IMPORTANZA
    function toggleImportant(id) {
        //faccio un map dei task, e per ogni task, se l'id corrisponde all'id del task attuale, ALLORA lo aggiorno con la nuova proprietà 'important' (da true a false e viceversa), ALTRIMENTI lo lascio invariato
        setTasks(tasks.map(task => task.id === id ? { ...task, important: !task.important } : task));
    }

    //FUNZIONE DEBOUNCE LEGATA AL FILTRAGGIO TASK
    const debounceSearch = useCallback(
        //useCallback: per evitare che debounce venga ricreata ogni volta che viene digitato qualcosa
        //value è ciò che l'utente scrive sul campo di ricerca. funzione: primo argomento di useCallback
        //dopo 1 secondo dalla digitazione...
        debounce((value) => {
            //...viene chiamata setQuery che aggiorna lo stato query con il testo digitato dall'utente (tecnicamente è la chiamata a setQuery che provoca un nuovo render)
            setQuery(value);
        }, 300),
    //secondo argomento di useCallback
    []);

    //queste funzioni sono contenute dentro tasksData associato all'hook useTasks dentro il contesto
    return { tasks, setTasks, addTask, removeTask, filteredTask, query, setQuery, toggleImportant, debounceSearch };
}












/*  const updateTask = (taskId, updatedTask) => {
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    } */