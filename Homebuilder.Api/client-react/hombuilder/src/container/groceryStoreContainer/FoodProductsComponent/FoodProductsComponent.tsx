import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FoodProductGetAllViewItem } from "../../../shared/models/food-products/food-product-get-all-view-item";
import { get } from "../../../shared/services/HTTPUserService";
import "./foodProductsComponent.scss";
import avatar from "../../../assets/images/avatar/avatar.png";
import { MdDelete } from "react-icons/md";

export const FoodProductsComponent = () => {

    const [food, setFood] = useState<FoodProductGetAllViewItem[]>([]);

    useEffect(() => {
        getAllFood();
    }, [])


    const getAllFood = () => {
        get(`FoodProduct/GetAll?page=1&pageSize=20`).then((response) => {
            setFood(response.data.items);
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

    return (
        <>
            <section className="food-products">
                <h2 className="title">Food</h2>
                <div className="board">
                    <header className="header">
                        <button className="button button-add" type="button" >Add Food</button>
                        <div className="header-section">
                            <label className="search">
                                <input type="text" className="search-input" placeholder="Pick one" aria-label="Category" />
                            </label>
                            <button className="button" type="button">
                                <IoIosArrowDown></IoIosArrowDown>
                            </button>
                        </div>
                    </header>
                    {food.map((item) => {
                        return (
                            <ul className="list" key={item.id}>
                                <li className="item" >
                                    <div className="item-section">
                                        <button className="button" type="button">
                                            <MdDelete
                                                color="green"
                                                style={{ zoom: "250%" }}
                                            ></MdDelete>
                                        </button>
                                    </div>
                                    <div className="item-section section-info">
                                        <p className="item-title">{item?.category.name}</p>
                                        {/* <p className="item-description">{months[item?.month]}</p> */}
                                    </div>
                                    <div className="item-section">
                                        <p className={getChipsColour(item.price)}>
                                            {item.price} GRN
                                        </p>
                                    </div>
                                    <div className="item-section">
                                        <div className="avatar">
                                            <img src={avatar} alt="avatar" />
                                        </div>
                                    </div>
                                </li>
                            </ul >
                        )
                    })}
                </div >
            </section >
        </>
    )
}