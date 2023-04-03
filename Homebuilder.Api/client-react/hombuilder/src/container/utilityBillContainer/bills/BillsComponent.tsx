import React, { useEffect, useState } from "react";
import "./billsComponent.scss";
import avatar from "../../../assets/images/avatar/avatar.png";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { UtilityBillGetAllViewItem } from "../../../shared/models/utility-bills/utility-bill-get-all-view-item";
import { get } from "../../../shared/services/HTTPUserService";
import { UtilityBillNameEnum } from "../../../shared/models/enums/utility-bill-name-enum";
import { MonthEnum } from "../../../shared/models/enums/month-enum";

export const BillsComponent = () => {

    const [utilityBills, setUtilityBills] = useState<UtilityBillGetAllViewItem[]>([]);

    useEffect(() => {
        getUtilityBills();
    }, [])


    const getUtilityBills = () => {
        get(`UtilityBill/GetAll?page=1&pageSize=20`).then((response) => {
            setUtilityBills(response.data.items);
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
            <section className="utility-bills">
                <h2 className="title">Bills</h2>
                <div className="board">
                    <header className="header">
                        <button className="button button-add" type="button">Add Bill</button>
                        <div className="header-section">
                            {/* <!-- <label className="search">
                            <input type="text" className="search-input" placeholder="Pick one" aria-label="Category"
            [formControl]="myControl" [matAutocomplete]="auto" (ngModelChange)="onChangeCategory($event)">
                            <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
                                <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
                                {{ option }}
                            </mat-option>
                        </mat-autocomplete>
                    </label> --> */}
                            <button className="button" type="button">
                                <IoIosArrowDown></IoIosArrowDown>
                            </button>
                        </div>
                    </header>

                    {utilityBills.map((item) => {
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
                                    </div >
                                    <div className="item-section section-info">
                                        <p className="item-title">{UtilityBillNameEnum[item?.name]}</p>
                                        <p className="item-description">{MonthEnum[item.month]}</p>
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
            </section >
        </>
    )
}