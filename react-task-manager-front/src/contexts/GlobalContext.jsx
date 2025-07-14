import { createContext, useEffect, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    async function fetchTasks() {
        const response = await fetch ("http://localhost:3001/tasks");
        const data = await response.json();
        setTasks(data);
        console.log(data);
    }

    return (
        <GlobalContext.Provider value={{ tasks, setTasks }}>{children}</GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };