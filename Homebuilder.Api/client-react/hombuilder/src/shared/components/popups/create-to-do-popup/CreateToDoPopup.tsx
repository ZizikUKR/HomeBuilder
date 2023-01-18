import React, { useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import { CreateToDoView } from "../../../models/to-do/create-to-do-view";
import { post } from "../../../services/HTTPUserService";
import "./createToDoPopup.scss"

export interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const CreateToDoPopup = (props: Props) => {

    const { modalIsOpen, closeModal } = props;

    const [toDo, setTodo] = useState("");
    const [description, setDescription] = useState("");
    const [information, setInformation] = useState("");


    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let activityGetAllViewItem: CreateToDoView = {
            toDo: toDo,
            description: description,
            information: information,
        }

        post(`ToDo/Create`, activityGetAllViewItem)
            .then(() => {
                setTodo("");
                setDescription("");
                setInformation("");
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal} className="modal-dialog-window">
                <ModalBody className="mat-dialog-container">

                    <div id="modal-content-wrapper">
                        <header id="modal-header">
                            <h1 id="modal-title">Create Todo</h1>
                        </header>
                        <form >
                            <section id="modal-body">
                                <div className="form-group">
                                    <label>ToDo
                                        <input
                                            className="form-control modal-number-input"
                                            placeholder="toDo"
                                            onChange={(e) => setTodo(e.target.value)} />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Description
                                        <input
                                            className="form-control modal-number-input"
                                            placeholder="description"
                                            onChange={(e) => setDescription(e.target.value)} />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Information
                                        <input
                                            className="form-control modal-number-input"
                                            placeholder="information"
                                            onChange={(e) => setInformation(e.target.value)} />
                                    </label>
                                </div>

                            </section>
                            <footer id="modal-footer">
                                <Button
                                    mat-raised-button
                                    id="modal-action-button"
                                    onClick={onSubmitForm}
                                >
                                    Create
                                </Button>
                                <Button
                                    mat-raised-button
                                    id="modal-cancel-button"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                            </footer>
                        </form>
                    </div>

                </ModalBody >
            </Modal >
        </>
    )
}