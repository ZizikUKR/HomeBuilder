import React from "react";
import "./utilityBillContainer.scss";
import { UtilityBillChartComponent } from "./utility-bill-chart/UtilityBillChartComponent";
import { BillsComponent } from "./bills/BillsComponent";

export const UtilityBillContainer = () => {

    return (
        <>
            <div className="container-template">
                <main className="grid-template">
                    <UtilityBillChartComponent></UtilityBillChartComponent>
                    <BillsComponent></BillsComponent>
                </main>
            </div>
        </>
    )
}