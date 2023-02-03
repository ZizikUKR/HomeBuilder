import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import { BsCalendarEvent } from "react-icons/bs";
import { MonthEnum } from "../../../models/enums/month-enum";
import "./createFoodProductPopup.scss";
import DatePicker from "react-datepicker";
import { CreateFoodProductView } from "../../../models/food-products/create-food-product-view";
import { get, post } from "../../../services/HTTPUserService";
import { Typeahead } from "react-bootstrap-typeahead";
import { GetAllFoodCategoriesViewItem } from "../../../models/food-products/get-all-food-categories-view";

export interface Props {
    modalIsOpen: boolean;
    closeModal: () => void;
}

export const CreateFoodProductPopup = (props: Props) => {

    const { modalIsOpen, closeModal } = props;
    const [price, setPrice] = useState(0);
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(MonthEnum.None);
    const [category, setCategory] = useState<any>();
    const [date, setDate] = useState(new Date());

    const [foodCategory, setFoodCategory] = useState<GetAllFoodCategoriesViewItem[]>([]);


    useEffect(() => {
        getAllFoodCategoryes();
    }, [])

    const onSubmitForm = (event: any) => {
        event.preventDefault();

        let activityGetAllViewItem: CreateFoodProductView = {
            price: price,
            year: year,
            month: month,
            category: category,
            orderDay: date
        }
        post(`foodProduct/create`, activityGetAllViewItem)
            .then(() => {
                setPrice(0);
                setYear(0);
                setMonth(MonthEnum.None);
                setCategory("");
                setDate(new Date());
            });
        closeModal();
    }

    const getAllFoodCategoryes = () => {
        get(`foodCategory/getProductCreationData`)
            .then((response) => {
                const categories = response.data.categories.map((item: string) => { return { id: item, name: item } })
                setFoodCategory(categories);
            });
    }

    return (
        <>
            <Modal show={modalIsOpen} onHide={closeModal} className="modal-dialog-window">
                <ModalBody className="mat-dialog-container">

                    <div id="modal-content-wrapper">
                        <header id="modal-header">
                            <h1 id="modal-title">Create food product</h1>
                        </header>
                        <form >
                            <section id="modal-body">
                                <div className="form-group">
                                    <label
                                    >Price
                                        <input
                                            className="form-control modal-number-input"
                                            type="number"
                                            min="0"
                                            placeholder="price"
                                            onChange={(e) => setPrice(+e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label
                                    >Year
                                        <input
                                            className="form-control modal-number-input"
                                            type="number"
                                            min="0"
                                            placeholder="year"
                                            onChange={(e) => setYear(+e.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label
                                    >Month
                                        <select className="form-control modal-number-input" placeholder="month" onChange={(e) => setMonth(+e.target.value)}>
                                            <option key={MonthEnum.None} value={MonthEnum.None} >month</option>
                                            <option key={MonthEnum.January} value={MonthEnum.January} >January</option>
                                            <option key={MonthEnum.February} value={MonthEnum.February} >February</option>
                                            <option key={MonthEnum.March} value={MonthEnum.March} > March</option>
                                            <option key={MonthEnum.April} value={MonthEnum.April} >April</option>
                                            <option key={MonthEnum.May} value={MonthEnum.May} >May</option>
                                            <option key={MonthEnum.June} value={MonthEnum.June} >June</option>
                                            <option key={MonthEnum.July} value={MonthEnum.July} >July</option>
                                            <option key={MonthEnum.August} value={MonthEnum.August} >August</option>
                                            <option key={MonthEnum.September} value={MonthEnum.September} >September</option>
                                            <option key={MonthEnum.October} value={MonthEnum.October} >October</option>
                                            <option key={MonthEnum.November} value={MonthEnum.November} >November</option>
                                            <option key={MonthEnum.December} value={MonthEnum.December} >December</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label
                                    >Category

                                        <Typeahead
                                            id="id"
                                            labelKey="name"
                                            className="form-control modal-number-input"
                                            allowNew={true}
                                            options={foodCategory}
                                            onChange={(selected) => setCategory(selected[0])}
                                        />

                                    </label>
                                </div>

                                <div className="form-group">
                                    <DatePicker
                                        selected={date}
                                        onChange={(date: Date) => setDate(date)}
                                        className="form-control modal-number-input"
                                    />
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
                                </Button >
                            </footer >
                        </form >
                    </div >

                </ModalBody >
            </Modal >
        </>
    )
} 