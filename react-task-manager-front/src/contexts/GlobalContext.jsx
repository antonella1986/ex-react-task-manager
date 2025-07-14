import { createContext, useEffect, useState } from "react";
import { useTasks } from "../hooks/useTasks";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const tasksData = useTasks();

    return (
        <GlobalContext.Provider value={ tasksData }>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContext, GlobalProvider };