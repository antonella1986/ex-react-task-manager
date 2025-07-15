import { createContext } from "react";
import { useTasks } from "../hooks/useTasks";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    //contenitore per tutto quello che useTasks() restituisce
    const tasksData = useTasks();

    return (
        <GlobalContext.Provider value={ tasksData }>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };