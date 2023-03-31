import React, { useEffect, useState } from "react";
import "./allWasteComponent.scss";
import avatar from "../../../assets/images/avatar/avatar.png";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FoodProductGetAllViewItem } from "../../../shared/models/food-products/food-product-get-all-view-item";
import { deleteRequest, get } from "../../../shared/services/HTTPUserService";
import { CreateWasteProductPopup } from "../../../shared/components/popups/create-waste-product-popup/CreateWasteProductPopup";
import { DeletedPopup } from "../../../shared/components/popups/deleted-popup/DeletedPopup";
import { MonthEnum } from "../../../shared/models/enums/month-enum";

export const AllWasteComponent = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [wasteProducts, setWasteProducts] = useState<FoodProductGetAllViewItem[]>([]);
    const [wasteProductDelete, setWasteProductDelete] = useState<FoodProductGetAllViewItem>();
    const [modalDelete, setModalDelete] = useState(false);

    useEffect(() => {
        getAllToDo();
    }, [])

    const getAllToDo = () => {
        get(`WasteProduct/GetAll?page=1&pageSize=20`)
            .then((response) => {
                debugger;
                setWasteProducts(response.data.items);
            });
    }

    const getChipsColour = (price: number) => {
        if (price <= 50) {
            return "chips colorGreen";
        }
        if (price <= 100) {
            return "chips colorYellow";
        }
        if (price >= 101) {
            return "chips colorRed";
        }
    }

    const onDelete = (item: FoodProductGetAllViewItem) => {
        setWasteProductDelete(item);
        setModalDelete(true);
    }

    const deleteWaste = (id: string) => {
        deleteRequest(`WasteProduct/Delete?id=${id}`)
            .then(() => {
                setModalDelete(false);
            });
    }

    return (
        <div>
            <section className="waste">
                <h2 className="title">Waste</h2>
                <div className="board">
                    <header className="header">
                        <button
                            className="button button-add"
                            type="button"
                            onClick={() => setModalOpen(true)}
                        >Add items</button>
                        <div className="header-section">
                            <label className="search">
                                <input type="text" className="search-input" placeholder="Pick one" aria-label="Category" />
                                {/* <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
                                        <mat-option>
                                            {option}
                                        </mat-option>
                                    </mat-autocomplete> */}
                            </label>
                            <button className="button" type="button">
                                <IoIosArrowDown></IoIosArrowDown>
                            </button>
                        </div>
                    </header>

                    {wasteProducts.map((item) => {
                        return (

                            <ul className="list">
                                <li className="item">
                                    <div className="item-section">
                                        <button className="button" type="button" onClick={() => onDelete(item)}>
                                            <MdDelete
                                                color="green"
                                                style={{ zoom: "250%" }}
                                            ></MdDelete>
                                        </button>
                                    </div >
                                    <div className="item-section section-info">
                                        <p className="item-title">{item?.category.name}</p>
                                        <p className="item-description">{MonthEnum[item?.month]}</p>
                                    </div>
                                    <div className="item-section">
                                        <p className={getChipsColour(item.price)}>
                                            {item.price} GRN
                                        </p>
                                    </div >
                                    <div className="item-section">
                                        <div className="avatar">
                                            <img src={avatar} alt="avatar" />
                                        </div>
                                    </div>

                                </li >
                            </ul >
                        )
                    })}
                </div >
                {/* <mat [length] = "length"[pageSize] = "pageSize"(page) = "onPaginateFood($event)" >
            </mat - paginator > */}
            </section >
            <CreateWasteProductPopup
                modalIsOpen={modalOpen}
                closeModal={() => setModalOpen(false)}
            ></CreateWasteProductPopup>
            {wasteProductDelete &&
                <DeletedPopup
                    title={wasteProductDelete?.category.name!}
                    text={wasteProductDelete?.category.name!}
                    onDelete={() => deleteWaste(wasteProductDelete.id)}
                    modalIsOpen={modalDelete}
                    closeModal={() => setModalDelete(false)}
                ></DeletedPopup>
            }
        </div>
    )
}