import React from "react";

export const TaskRow = React.memo(({ task }) => {
    let statusColor = "";
    if (task.status === "To do") {
        statusColor = "red";
    } else if (task.status === "Doing") {
        statusColor = "yellow";
    } else {
        statusColor = "green";
    }

    return (
        <tr>
            <td>{task.title}</td>
            <td style={{ color: statusColor }}>{task.status}</td>
            <td>{new Date(task.createdAt).toLocaleDateString('it-IT', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            })}</td>
        </tr>
    );
})