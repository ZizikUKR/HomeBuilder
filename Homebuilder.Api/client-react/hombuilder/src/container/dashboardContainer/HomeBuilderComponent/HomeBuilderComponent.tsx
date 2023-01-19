import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./homeBuilderComponent.scss";
import avatar from "../../../assets/images/avatar/avatar.png";
import { ToDoTaskGetAllViewItem } from "../../../shared/models/to-do/to-do-task-get-all-view-item";
import { deleteRequest, get, put } from "../../../shared/services/HTTPUserService";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { CreateToDoPopup } from "../../../shared/components/popups/create-to-do-popup/CreateToDoPopup";
import { DeletedPopup } from "../../../shared/components/popups/deleted-popup/DeletedPopup";
import { UpdateToDoView } from "../../../shared/models/to-do/update-to-do-view";

export const HomeBuilderComponent = () => {

    const [toDoList, setToDoList] = useState<ToDoTaskGetAllViewItem[]>([]);
    const [modalToDOeOpen, setModalToDoOpen] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [toDoToDelete, setToDoToDelete] = useState<ToDoTaskGetAllViewItem>();
    useEffect(() => {
        getAllToDo();
    }, [])

    const getAllToDo = () => {
        get(`ToDo/GetAll`)
            .then((response) => {
                setToDoList(response.data.toDos);
            });
    }

    const updateStatus = (toDO: ToDoTaskGetAllViewItem) => {
        const updatedTodo: UpdateToDoView = {
            id: toDO.id,
            isComppleted: !toDO.isComppleted
        };
        put(`ToDo/Update`, updatedTodo)
            .then(() => {
                getAllToDo();
            })
    }

    const deleteToDo = (id: number) => {
        deleteRequest(`toDo/delete?id=${id}`)
            .then(() => {
                setModalDelete(false);
            });
    }

    const onDelete = (item: ToDoTaskGetAllViewItem) => {
        setToDoToDelete(item);
        setModalDelete(true);
    }

    return (
        <>
            <section className="home-builder">
                <h2 className="title">Homebuilder</h2>
                <div className="board">
                    <header className="header">
                        <button className="button button-add" type="button" onClick={() => setModalToDoOpen(true)} >Add Items</button>
                        <div className="header-section">
                            <label className="search">
                                <input className="search-input" type="search" placeholder="Search" />
                            </label>
                            <button className="button" type="button">
                                <IoIosArrowDown></IoIosArrowDown>
                            </button>
                        </div>
                    </header>
                </ div>

                {toDoList.map((item) => {
                    return (
                        <ul className="list" key={item.id}>
                            <li className="item">
                                <div className="item-section">
                                    <button className="button" type="button" >
                                        <IoCheckmarkDoneCircleOutline
                                            onClick={() => updateStatus(item)}
                                            color={item.isComppleted == true ? "green" : "darkgrey"}
                                            style={{ zoom: "250%" }}
                                        ></IoCheckmarkDoneCircleOutline>
                                    </button>
                                    <button className="button" type="button" onClick={() => onDelete(item)}>
                                        <MdDelete
                                            color="green"
                                            style={{ zoom: "250%" }}
                                        ></MdDelete>
                                    </button>
                                </div>
                                <div className="item-section section-info">
                                    <p className="item-title">{item?.toDo}</p>
                                    <p className="item-description">{item?.description}</p>
                                </div>
                                <div className="item-section ">
                                    <p>{item?.information}</p>
                                    <p className="chips" >
                                        {item.state}
                                    </p>
                                </div >
                                <div className="item-section">
                                    <div className="avatar">
                                        <img src={avatar} alt="avatar" />
                                    </div>
                                </div>
                            </li >
                        </ul >)
                })}
            </section >
            <CreateToDoPopup
                modalIsOpen={modalToDOeOpen}
                closeModal={() => setModalToDoOpen(false)}
            ></CreateToDoPopup>
            {toDoToDelete &&
                <DeletedPopup
                    title={toDoToDelete.toDo!}
                    text={toDoToDelete.description!}
                    onDelete={() => deleteToDo(toDoToDelete.id!)}
                    modalIsOpen={modalDelete}
                    closeModal={() => setModalDelete(false)}
                ></DeletedPopup>
            }
        </>
    )
}