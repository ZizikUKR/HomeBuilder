import React from "react";
import { AcrivityComponent } from "./AcrivityComponent/AcrivityComponent";
import "./dasboardComponent.scss"
import { HomeBuilderComponent } from "./HomeBuilderComponent/HomeBuilderComponent";


export const DashboardContainer = () => {

    return (
        <>
            <div className="container-template">
                <div className="grid-template">
                    <AcrivityComponent></AcrivityComponent>
                    <HomeBuilderComponent></HomeBuilderComponent>
                </div>
            </div>
        </>
    )
}