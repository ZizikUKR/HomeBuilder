import React from "react";
import { AcrivityComponent } from "./AcrivityComponent";
import "./dasboardComponent.scss"
import { HomeBuilderComponent } from "./HomebuilderComponent";


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