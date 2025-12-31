import { createPortal } from "react-dom";
import css from "./Modal.module.css";

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
        <div className={css.backdrop} onClick={closeClick}>
            <div className={ css.modal}>
                MODAL
            </div>
        </div>,
    document.body
    )
}