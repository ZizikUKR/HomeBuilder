import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "./homeBuilderComponent.scss";
import avatar from "../../../assets/images/avatar/avatar.png";
import { ToDoTaskGetAllViewItem } from "../../../shared/models/to-do/to-do-task-get-all-view-item";
import { get } from "../../../shared/services/HTTPUserService";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { CreateToDoPopup } from "../../../shared/components/popups/create-to-do-popup/CreateToDoPopup";

export const HomeBuilderComponent = () => {

    const [toDoList, setToDoList] = useState<ToDoTaskGetAllViewItem[]>([]);
    const [modalToDOeOpen, setModalToDoOpen] = useState(false)

    useEffect(() => {
        getAllToDo();
    }, [])

    const getAllToDo = () => {
        get(`ToDo/GetAll`)
            .then((response) => {
                setToDoList(response.data.toDos);
            });
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
                        <ul className="list">
                            <li className="item">
                                <div className="item-section">
                                    <button className="button" type="button">
                                        <IoCheckmarkDoneCircleOutline
                                            color="green"
                                            style={{ zoom: "200%" }}
                                        ></IoCheckmarkDoneCircleOutline>
                                    </button>
                                    <button className="button" type="button">
                                        <MdDelete></MdDelete>
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
        </>
    )
}