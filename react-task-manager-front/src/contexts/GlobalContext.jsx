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

/*

useTasks()         → ritorna logiche e dati (tasks, addTask, filteredTask, ecc.)
    ↓
GlobalProvider     → prende questi dati e li passa nel contesto
    ↓
useContext(GlobalContext)
    → recupera i dati già pronti (senza rieseguire l’hook)

🔄 useTasks() = la "centrale operativa"
Contiene:
- tutti gli stati (tasks, query, ecc.)
- tutta la logica (aggiunta, rimozione, ricerca, debounce, ecc.)

🧠 GlobalContext = la "scatola condivisa"
Serve a non dover chiamare useTasks() in ogni componente, perché così avresti tanti stati scollegati.

📣 GlobalProvider = il "megafono"
Prende tutto da useTasks() e lo distribuisce a tutti i componenti figli con value={tasksData}.
*/