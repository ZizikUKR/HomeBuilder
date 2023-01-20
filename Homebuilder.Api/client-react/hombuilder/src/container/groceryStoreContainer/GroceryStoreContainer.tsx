import React from "react";
import { FoodChartComponent } from "./FoodChartComponent/FoodChartComponent";
import { FoodProductsComponent } from "./FoodProductsComponent/FoodProductsComponent";
import "./groceryStoreContainer.scss"

export const GroceryStoreContainer = () => {

    return (
        <>
            <div className="container-template">
                <main className="grid-template">
                    <FoodChartComponent></FoodChartComponent>
                    <FoodProductsComponent></FoodProductsComponent>
                </main>
            </div>
        </>
    )
}