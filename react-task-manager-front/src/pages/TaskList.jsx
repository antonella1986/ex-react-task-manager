import { NavLink } from "react-router-dom";
import { useContext, useState, useMemo } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { TaskRow } from "../components/TaskRow";
import { SearchBar } from "../components/SearchBar";
import bean2 from "../../public/icons/bean2.svg";

export function TaskList() {
    //prendo l'array di tutti i task dal file GlobalContext e li rendo leggibili e utilizzabili nel componente tramite useContext
    //se stampo, vedo un array di oggetti (id, title...)
    const { filteredTask } = useContext(GlobalContext);

    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(1);
    //la funzione riceve il nome della colonna cliccata
    function handleSort(column) {
        //se la colonna cliccata coincide con quella attuale
        if (sortBy === column) {
            //inverte l'ordine: se era crescente (1), passa a decrescente (-1), e viceversa
            setSortOrder(sortOrder === 1 ? -1 : 1);
        } else {
            //altrimenti, cambia la colonna attuale
            setSortBy(column);
            //e resetta a crescente
            setSortOrder(1);
        }
    }

    const sortedTasks = useMemo(() => {
        //copio l'array filteredTask così non modifico l'array originale
        const sorted = [...filteredTask];
        //ordino l'array copiato
        sorted.sort((a, b) => {
            //se clicco sulla colonna title
            if (sortBy === 'title') {
                //se l'ordine attuale è crescente, quindi 1, ordina in modo crescente
                if (sortOrder === 1) {
                    return a.title.localeCompare(b.title);
                //altrimenti, in ordine decrescente
                } else {
                    return b.title.localeCompare(a.title);
                }
            }

            if (sortBy === 'status') {
                if (sortOrder === 1) {
                    return a.status.localeCompare(b.status);
                } else {
                    return b.status.localeCompare(a.status);
                }
            }

            if (sortBy === 'createdAt') {
                if (sortOrder === 1) {
                    //converto createdAt in oggetti Date per poterli confrontare
                    //dal più vecchio al più nuovo
                    return new Date(a.createdAt) - new Date(b.createdAt);
                } else {
                    //dal più recente al più vecchio
                    return new Date(b.createdAt) - new Date(a.createdAt);
                }
            }
            //se per qualche motivo nessuna condizione è vera, lascia l'ordine così come sta
            return 0;
        });
        //ritorno l'array ordinato
        return sorted;
       //questo array verrà ricalcolato solo se cambiano i task, cambia la colonna per l'ordinamento, o cambia l'ordine crescente/decrescente
    }, [filteredTask, sortBy, sortOrder]);


    return (
        <>
            <div className="task-list">
                <h1 className="title"><img src={bean2} alt="coffe bean" style={{width: '32px', paddingRight: '1.1rem'}} />Lista dei task<img src={bean2} alt="coffe bean" style={{width: '32px', paddingLeft: '1rem'}} /></h1>
                <h2>Cerca un task</h2>
                <SearchBar />
                <table>
                    <thead className="table-header">
                        <tr>
                            {/* handleSort non sa da sola quale colonna è stata cliccata. Serve un argomento per dirglielo */}
                            <th className="sortable" onClick={() => handleSort('title')}>Nome</th>
                            <th className="sortable status" onClick={() => handleSort('status')}>Stato</th>
                            <th className="sortable" onClick={() => handleSort('createdAt')}>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedTasks.map(task =>
                            <TaskRow key={task.id} task={task} />
                        )}
                    </tbody>
                </table>
                <button className="button-add"><NavLink to={"/AddTask"}>Aggiungi un nuovo task</NavLink></button>
            </div>
        </>
    );
}