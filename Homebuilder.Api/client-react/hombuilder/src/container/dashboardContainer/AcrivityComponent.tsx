import React, { useEffect, useState } from "react";
import avatar from "../../assets/images/avatar/user-placeholder.png";
import home from "../../assets/images/picture/home.jpg";
import "./activity.component.scss";
import { IoIosArrowDown, IoMdAddCircleOutline } from "react-icons/io";
import { ActivityGetAllViewItem } from "../../shared/models/activities/activity-get-all-view-item";
import { get } from "../../shared/services/HTTPUserService";

export const AcrivityComponent = () => {


    const [activities, setActivities] = useState<ActivityGetAllViewItem[]>([]);

    useEffect(() => {
        debugger;
        getAllMessage();
    }, [])

    const getAllMessage = () => {
        get(`Activity/GetAll`)
            .then((response) => {
                setActivities(response);
            });
    }

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
                                <IoIosArrowDown></IoIosArrowDown>
                            </button>
                        </div>
                    </header>

                    <ul className="articles" >

                        <li className="article">
                            <div className="article-logo">
                                <img src={avatar} alt="avatar" />
                            </div>
                            <div className="post">
                                <div className="post-content">
                                    <div className="post-header">
                                        <div className="post-info">
                                            <p className="post-title">
                                                <span className="post-name author">John R. Doe </span>
                                                <span className="post-event">Uploaded Photos</span>
                                            </p>
                                            <div className="address">
                                                <p>365 Boyer Circle, Lafayette</p>
                                                <span className="code">#DE80090</span>
                                            </div>
                                            <p className="date">
                                                <time dateTime="2018-07-07T13:22:00">Today at 1:22pm</time>
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="list">
                                        <li className="item">
                                            <img className="photo" src={home} alt="img" />
                                        </li>
                                        <li className="item">
                                            <img className="photo" src={home} alt="img" />
                                        </li>
                                        <li className="item">
                                            <img className="photo" src={home} alt="img" />
                                        </li>
                                        <li className="item">
                                            <img className="photo" src={home} alt="img" />
                                        </li>
                                    </ul>
                                    <button className="button button-view" type="button">
                                        View All Photos
                                    </button>
                                </div>
                            </div>
                            <div className="article-action">
                                <div className="dropdown" >
                                    <button className="button" type="button">
                                        <IoMdAddCircleOutline></IoMdAddCircleOutline>
                                    </button>

                                    <ul className="drop-menu">
                                        <li className="drop-item">
                                            <button className="button" type="button">
                                                chat
                                                <span>Review</span>
                                            </button>
                                        </li>
                                        <li className="drop-item">
                                            <button className="button" type="button">
                                                chat
                                                <span>Massage</span>
                                            </button>
                                        </li>
                                        <li className="drop-item">
                                            <button className="button" type="button">
                                                calendar_today
                                                <span>Reschedule</span>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </li>

                        {activities.map((item) => {
                            return (
                                <li className="article poll">
                                    <div className="article-logo">
                                        notifications_none
                                    </div>
                                    <div className="post">
                                        <div className="post-content">
                                            <div className="post-header">
                                                <div className="post-info">
                                                    <p className="post-title">
                                                        <span className="post-name">{item?.title} </span>
                                                        <span className="post-event warning">{item?.scheduledDate}</span>
                                                    </p>
                                                    <div className="address">
                                                        <p>{item?.description}</p>
                                                        <span className="code">{item?.code}</span>
                                                    </div>
                                                    <p className="date">
                                                        <time dateTime="2018-07-07T22:22:00">{item?.creationDate}</time>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="article-action">
                                        <div className="dropdown" >
                                            <button className="button" type="button" >
                                                add_circle_outline
                                            </button>

                                            <ul className="drop-menu">
                                                <li className="drop-item">
                                                    <button className="button" type="button">
                                                        chat
                                                        <span>Review</span>
                                                    </button>
                                                </li>
                                                <li className="drop-item">
                                                    <button className="button" type="button">
                                                        chat
                                                        <span>Massage</span>
                                                    </button>
                                                </li>
                                                <li className="drop-item">
                                                    <button className="button" type="button">
                                                        calendar_today
                                                        <span>Reschedule</span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>)
                        }
                        )}


                    </ul >
                </ div >
            </ section >
        </>
    )
}