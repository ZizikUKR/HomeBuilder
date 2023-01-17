import React from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import "./createToDoPopup.scss"

export interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const CreateToDoPopup = (props: Props) => {

    const { modalIsOpen, closeModal } = props;

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal} className="modal-dialog-window">
                <ModalBody className="mat-dialog-container">

                    <div>tipa SMS</div>

                </ModalBody >
            </Modal >
        </>
    )
}