import React from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import "./deletedPopup.scss";

export interface Props {
    title: string;
    text: string;
    modalIsOpen: boolean;
    closeModal: () => void;
    onDelete: () => void;
}

export const DeletedPopup = (props: Props) => {

    const { title, text, modalIsOpen, closeModal, onDelete } = props;

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal} className="modal-dialog-window">
                <ModalBody className="mat-dialog-container">

                    <div id="modal-content-wrapper">
                        <header id="modal-header">
                            <h1 id="modal-title">Are you sure you want to delete {title} zagolovok?</h1>
                        </header>
                        <section id="modal-body">
                            <p>
                                Delete {text} ?
                            </p>
                        </section>
                        <footer id="modal-footer">
                            <Button mat-raised-button id="modal-action-button" onClick={onDelete}>
                                Delete
                            </Button>
                            <Button mat-raised-button id="modal-cancel-button" onClick={closeModal}>
                                Cancel
                            </Button>
                        </footer >
                    </div >

                </ModalBody >
            </Modal >
        </>
    )
}