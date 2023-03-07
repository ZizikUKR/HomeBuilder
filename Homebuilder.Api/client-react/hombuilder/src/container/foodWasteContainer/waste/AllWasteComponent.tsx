import React, { useEffect, useState } from "react";
import "./allWasteComponent.scss";
import avatar from "../../../assets/images/avatar/avatar.png";
import { HomeBuilderConstants } from "../../../shared/models/constants/home-builder.constants";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { FoodProductGetAllViewItem } from "../../../shared/models/food-products/food-product-get-all-view-item";
import { get } from "../../../shared/services/HTTPUserService";

export const AllWasteComponent = () => {

    const [modalOpen, setModalOpen] = useState(false);
    const [foodProducts, setFoodProducts] = useState<FoodProductGetAllViewItem[]>([]);
    const [item, setItem] = useState();
    const [months] = useState("");

    useEffect(() => {
        getAllToDo();
    }, [])

    const getAllToDo = () => {
        get(`WasteProduct/GetAll`)
            .then((response) => {
                debugger;
                setFoodProducts(response.data.items);
            });
    }

    const getChipsColour = (price: number) => {
        if (price <= 50) {
            return HomeBuilderConstants.chipColorGreen;
        }
        if (price <= 100) {
            return HomeBuilderConstants.chipColorYellow;
        }
        if (price >= 101) {
            return HomeBuilderConstants.chipColorRed;
        }
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

                    {foodProducts.map((item) => {
                        return (

                            <ul className="list">
                                <li className="item">
                                    <div className="item-section">
                                        <button className="button" type="button">
                                            <IoCheckmarkDoneCircleOutline
                                                color="green"
                                                style={{ zoom: "250%" }}
                                            ></IoCheckmarkDoneCircleOutline>
                                        </button>
                                        <button className="button" type="button">
                                            <MdDelete
                                                color="green"
                                                style={{ zoom: "250%" }}
                                            ></MdDelete>
                                        </button>
                                    </div >
                                    <div className="item-section section-info">
                                        <p className="item-title">{item?.category.name}</p>
                                        <p className="item-description">{months[item?.month]}</p>
                                    </div>
                                    <div className="item-section">
                                        {/* <p>{item?.price} GRN</p> */}
                                        <p className="chips">
                                            {/* {getChipsColour({item.price})} GRN  */}
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
        </div>
    )
}