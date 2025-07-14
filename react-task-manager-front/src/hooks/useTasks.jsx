import { useState, useEffect } from "react";

export function useTasks() {
    const [ tasks, setTasks ] = useState([]);

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

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            title: "Nuovo task",
            description: "Descrizione del nuovo task",
            status: "todo",
            createdAt: new Date().toISOString(),
        };
        //aggiorno lo stato tasks aggiungendo newTask alla fine dell'array esistente
        setTasks([...tasks, newTask]);
    }

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    const updateTask = (taskId, updatedTask) => {
        setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    }

    return { tasks, setTasks, addTask, removeTask, updateTask };
}