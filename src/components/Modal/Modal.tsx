import { createPortal } from "react-dom";
import css from "./Modal.module.css";
import NoteForm from "../NoteForm/NoteForm";

interface ModalProps{
    onClose: () => void;
}

export default function Modal({ onClose }: ModalProps) {

    const closeClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return createPortal(
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={closeClick}>
            <div className={ css.modal}>
                <NoteForm onClose={onClose}/>
            </div>
        </div>,
    document.body
    )
}