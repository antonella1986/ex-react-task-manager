import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export function Modal({ title, content, show, onClose, onConfirm, confirmText }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-box">
                {/* --- Bottone di chiusura in alto a destra --- */}
                <button className="modal-close" onClick={onClose} aria-label="Chiudi">
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <h2 className="modal-title">{title}</h2>
                <div className="modal-content">{content}</div>
                <div className="modal-actions">
                    <button onClick={onClose} className="button-cancel">ANNULLA</button>
                    <button onClick={onConfirm} className="button-confirm">{confirmText}</button>
                </div>
            </div>
        </div>,
        //inserisce la modale fuori dal flusso normale del DOM
        //il portale renderizza direttamente nel body del documento HTML
        document.body
    );
}