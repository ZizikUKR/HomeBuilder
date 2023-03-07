import React, { useState } from "react";
import "./wasteChartComponent.scss";

export const WasteChartComponent = () => {

    const [currentYear, setCurrentYear] = useState(0);
    const [currentMonth, setCurrentMonth] = useState("");
    const [month, setMonth] = useState("");

    return (
        <div>
            <section className="waste-chart">
                <h2 className="title">{currentYear} Waste</h2>
                <div className="board">
                    <div style={{ display: "block" }}>
                        {/* <canvas
                            baseChart
        [datasets]="barChartData"
                        [labels]="barChartLabels"
                        [options]="barChartOptions"
                        [plugins]="barChartPlugins"
                        [legend]="barChartLegend"
                        [chartType]="barChartType"
    >
                    </canvas> */}
                    </div>
                    <div style={{ display: "block" }}>
                        <div>
                            <h4>{currentMonth} Waste</h4>
                            <div>
                                <label className="round-chart-button"
                                >Month
                                    <select
                                        className="form-control modal-number-input"
                                        placeholder="month"


                                    >
                                        <option >{month}</option>
                                    </select>
                                </label>
                            </div>
                        </div >
                        {/* <canvas
                        baseChart
                    [data] = "pieChartData"
                    [labels] = "pieChartLabels"
                    [chartType] = "pieChartType"
                    [options] = "pieChartOptions"
                    [plugins] = "pieChartPlugins"
                    [legend] = "pieChartLegend"
        >
                </canvas > */}
                    </div >
                </div >
            </section >

        </div >
    )
}