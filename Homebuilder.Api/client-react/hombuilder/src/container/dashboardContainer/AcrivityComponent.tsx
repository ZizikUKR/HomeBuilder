import React, { useState } from "react";
import avatar from "../../assets/images/avatar/user-placeholder.png";
import home from "../../assets/images/picture/home.jpg";
import "./activity.component.scss"

export const AcrivityComponent = () => {

    const [item, setItem] = useState()


    return (
        <>
            <section className="activity">
                <h2 className="title">Activity</h2>
                <div className="board">
                    <header className="header">
                        <button className="button button-add" type="button" >Add Activity</button>
                        <div className="header-section">
                            <label className="search">
                                <input className="search-input" type="search" placeholder="Search" />
                            </label>
                            <button className="button" type="button">
                                стрелочка(мат иконка)
                            </button>
                        </div>
                    </header>
                </ div>
            </ section>
        </>
    )
}