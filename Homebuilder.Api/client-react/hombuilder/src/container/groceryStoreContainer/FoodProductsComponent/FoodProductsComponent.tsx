import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FoodProductGetAllViewItem } from "../../../shared/models/food-products/food-product-get-all-view-item";
import { deleteRequest, get } from "../../../shared/services/HTTPUserService";
import "./foodProductsComponent.scss";
import avatar from "../../../assets/images/avatar/avatar.png";
import { MdDelete } from "react-icons/md";
import { CreateFoodProductPopup } from "../../../shared/components/popups/create-food-product-popup/CreateFoodProductPopup";
import { DeletedPopup } from "../../../shared/components/popups/deleted-popup/DeletedPopup";
import { MonthEnum } from "../../../shared/models/enums/month-enum";

export const FoodProductsComponent = () => {

    const [modalToDOeOpen, setModalToDoOpen] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [food, setFood] = useState<FoodProductGetAllViewItem[]>([]);
    const [foodToDelete, setFoodToDelete] = useState<FoodProductGetAllViewItem>();

    useEffect(() => {
        getAllFood();
    }, [])


    const getAllFood = () => {
        get(`FoodProduct/GetAll?page=1&pageSize=20`).then((response) => {
            setFood(response.data.items);
        });
    }

    const deleteFood = (id: string) => {
        deleteRequest(`foodProduct/Delete?id=${id}`)
            .then(() => {
                setModalDelete(false);
            });
    }

    const onDelete = (item: FoodProductGetAllViewItem) => {
        setFoodToDelete(item);
        setModalDelete(true);
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
                        <button className="button button-add" type="button" onClick={() => setModalToDoOpen(true)}>Add Food</button>
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
                                        <button className="button" type="button" onClick={() => onDelete(item)}>
                                            <MdDelete
                                                color="green"
                                                style={{ zoom: "250%" }}
                                            ></MdDelete>
                                        </button>
                                    </div>
                                    <div className="item-section section-info">
                                        <p className="item-title">{item?.category.name}</p>
                                        <p className="item-description">{MonthEnum[item?.month]}</p>
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
                {foodToDelete &&
                    <DeletedPopup
                        title={foodToDelete.category.name!}
                        text={foodToDelete.category.name!}
                        onDelete={() => deleteFood(foodToDelete.id)}
                        modalIsOpen={modalDelete}
                        closeModal={() => setModalDelete(false)}
                    ></DeletedPopup>
                }
                <CreateFoodProductPopup
                    modalIsOpen={modalToDOeOpen}
                    closeModal={() => setModalToDoOpen(false)}
                ></CreateFoodProductPopup>
            </section >
        </>
    )
}