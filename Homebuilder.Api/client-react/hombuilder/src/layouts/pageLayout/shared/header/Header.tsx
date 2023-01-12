import React, { useState } from "react";
import "./header.scss";
import logo from "../../../../assets/images/logo/logo.png";
import avatar from "../../../../assets/images/avatar/avatar.png";
import { FiMail } from "react-icons/fi";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { MdSettingsApplications } from "react-icons/md";
import { Link } from "react-router-dom";

export const Header = () => {
    const [toggleView, setToggleView] = useState(false)

    return (
        <>
            <header className="header">
                <div className="container-template">
                    <Link to="/">
                        <img src={logo} alt="logo" className="logo" />
                    </Link>
                    <nav className="nav">
                        <button className="button button-nav-menu" type="button"
                            onClick={() => setToggleView(true)}
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className="nav-menu">
                            <Link to={"/"} className="button button-nav">DashBoard</Link>
                            <Link to={"/grocery-store"} className="button button-nav" type="button">Grocery Store</Link>
                            <Link to={"/food-waste"} className="button button-nav" type="button">Food Waste</Link>
                            <Link to={"/utility-bill"} className="button button-nav" type="button">Utility Bills</Link>
                        </div>
                    </nav >
                    <div className="section">
                        <div className="action">
                            <button className="button" type="button">
                                <FiMail />
                                <span className="counter">5</span>
                            </button>
                            <button className="button" type="button">
                                <BsFillChatLeftTextFill />
                            </button>
                            <button className="button" type="button">
                                <MdSettingsApplications />
                            </button>
                        </div >
                        <div>
                            <img src={avatar} alt="avatar" className="avatar" />
                        </div>
                    </div >
                </div >
            </header >
        </>
    )
}