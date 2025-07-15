import ReactDOM from "react-dom";

export function Modal({ title, content, show, onClose, onConfirm, confirmText }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-box">
                <h2>{title}</h2>
                <div className="modal-content">{content}</div>
                <div className="modal-actions">
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        //inserisce la modale fuori dal flusso normale del DOM
        //il portale renderizza direttamente nel body del documento HTML
        document.body
    );
}