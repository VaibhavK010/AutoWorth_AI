import { useEffect, useState } from "react";
import API from "../../utils/api";

import {
    Pie,
    Bar,
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";

import "./Analytics.css";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    Title
);

function Analytics() {

    const [data, setData] = useState(null);

    useEffect(() => {

        API.get("/analytics")
            .then(res => setData(res.data))
            .catch(console.error);

    }, []);

    if (!data)
        return <h3 className="text-center my-5">Loading analytics...</h3>;

    const fuelChart = {

        labels: Object.keys(data.fuel_distribution),

        datasets: [

            {

                label: "Fuel Types",

                data: Object.values(data.fuel_distribution)

            }

        ]

    };

    const brandChart = {

        labels: Object.keys(data.top_brands),

        datasets: [

            {

                label: "Cars",

                data: Object.values(data.top_brands)

            }

        ]

    };

    const ageChart = {

        labels: Object.keys(data.vehicle_age),

        datasets: [

            {

                label: "Vehicles",

                data: Object.values(data.vehicle_age)

            }

        ]

    };

    return (

        <section className="analytics-section">

            <div className="container">

                <h1 className="text-center mb-2">

                    Market Insights

                </h1>

                <p className="text-center mb-5">

                    Analytics generated from the Cardekho dataset.

                </p>

                <div className="row mb-5">

                    <div className="col-md-6">

                        <div className="summary-card">

                            <h4>Total Cars</h4>

                            <h2>{data.total_cars}</h2>

                        </div>

                    </div>

                    <div className="col-md-6">

                        <div className="summary-card">

                            <h4>Average Price</h4>

                            <h2>

                                ₹ {Math.round(data.average_price).toLocaleString()}

                            </h2>

                        </div>

                    </div>

                </div>

                <div className="row">

                    <div className="col-lg-6 mb-4">

                        <div className="chart-card">

                            <h4>Fuel Distribution</h4>

                            <Pie data={fuelChart}/>

                        </div>

                    </div>

                    <div className="col-lg-6 mb-4">

                        <div className="chart-card">

                            <h4>Top Brands</h4>

                            <Bar data={brandChart}/>

                        </div>

                    </div>

                    <div className="col-12">

                        <div className="chart-card">

                            <h4>Vehicle Age</h4>

                            <Line data={ageChart}/>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );

}

export default Analytics;