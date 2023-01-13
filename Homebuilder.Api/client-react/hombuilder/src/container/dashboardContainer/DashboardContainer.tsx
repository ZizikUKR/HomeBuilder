import React from "react";
import { AcrivityComponent } from "./AcrivityComponent";
import { HomebuilderComponent } from "./HomebuilderComponent";
import "./dasboardComponent.scss"

export const DashboardContainer = () => {

    return (
        <>
            <div className="dasboard">
                <AcrivityComponent></AcrivityComponent>
                <HomebuilderComponent></HomebuilderComponent>
            </div>
        </>
    )
}