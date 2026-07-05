import "./Stats.css";

function Stats() {

    const stats = [

        {
            icon: "🚗",
            number: "15,000+",
            label: "Cars Analysed"
        },

        {
            icon: "🎯",
            number: "93.7%",
            label: "Model Accuracy"
        },

        {
            icon: "⚡",
            number: "< 1 sec",
            label: "Prediction Time"
        },

        {
            icon: "🤖",
            number: "Random Forest",
            label: "ML Model"
        }

    ];

    return (

        <section className="stats-section">

            <div className="container">

                <div className="row">

                    {
                        stats.map((item, index) => (

                            <div
                                className="col-lg-3 col-md-6 mb-4"
                                key={index}
                            >

                                <div className="stat-card">

                                    <div className="icon">

                                        {item.icon}

                                    </div>

                                    <h2>

                                        {item.number}

                                    </h2>

                                    <p>

                                        {item.label}

                                    </p>

                                </div>

                            </div>

                        ))
                    }

                </div>

            </div>

        </section>

    );

}

export default Stats;