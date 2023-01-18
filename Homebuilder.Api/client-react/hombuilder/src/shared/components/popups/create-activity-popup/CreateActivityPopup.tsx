import React, { useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { CreateActivityView } from "../../../models/activities/create-activity-view";
import { post } from "../../../services/HTTPUserService";
import "./createActivityPopup.scss";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";


export interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const CreateActivityPopup = (props: Props) => {

    const { modalIsOpen, closeModal } = props;

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [code, setCode] = useState("");
    const [date, setDate] = useState(new Date());

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let activityGetAllViewItem: CreateActivityView = {
            title: title,
            description: description,
            code: code,
            scheduledDate: new Date(date)
        }

        post(`Activity/Create`, activityGetAllViewItem)
            .then(() => {
                setTitle("");
                setDescription("");
                setCode("");
            });
        closeModal();
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal} className="modal-dialog-window">
                <ModalBody className="mat-dialog-container">
                    <div id="modal-content-wrapper">
                        <header id="modal-header ">
                            <h1 id="modal-title">Create Activity</h1>
                        </header>
                        <form>
                            <section id="modal-body">
                                <div className="form-group">
                                    <label
                                    >Title
                                        <input
                                            className="form-control modal-number-input"
                                            placeholder="Title"
                                            type="text"
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label
                                    >Description
                                        <input
                                            className="form-control modal-number-input"
                                            placeholder="Description"
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label
                                    >Code
                                        <input
                                            className="form-control modal-number-input"
                                            placeholder="Code"
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="form-group d-flex">
                                    <label 
                                    >Date
                                        <DatePicker
                                            selected={date}
                                            onChange={(date: Date) => setDate(date)}
                                            className="form-control modal-number-input"
                                        />
                                        <BsCalendarEvent />
                                    </label>
                                </div>
                            </section>
                            <footer id="modal-footer">
                                <Button
                                    id="modal-action-button"
                                    onClick={onSubmitForm}
                                >
                                    Create
                                </Button>
                                <Button
                                    id="modal-cancel-button"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                            </footer>
                        </form >
                    </div >

                </ModalBody >
            </Modal >
        </>
    )
}