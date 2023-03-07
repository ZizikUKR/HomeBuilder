import React from "react";
import { WasteChartComponent } from "./waste-chart/WasteChartComponent";
import { AllWasteComponent } from "./waste/AllWasteComponent";
import "./foodWasteContainer.scss"

export const FoodWasteContainer = () => {

    return (
        <>
            <div className="container-template">
                <main className="grid-template">
                    <WasteChartComponent></WasteChartComponent>
                    <AllWasteComponent></AllWasteComponent>
                </main>
            </div>
        </>
    )
}