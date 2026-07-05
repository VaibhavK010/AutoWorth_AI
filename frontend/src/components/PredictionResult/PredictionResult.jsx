import "./PredictionResult.css";
import { useEffect, useState } from "react";

function PredictionResult({ prediction }) {

    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {

        let start = 0;
        const duration = 1800; // milliseconds
        const startTime = performance.now();

        function animate(currentTime) {

            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const value = prediction * progress;

            setDisplayValue(value);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }

        }

        requestAnimationFrame(animate);

    }, [prediction]);

    const formattedPrice = new Intl.NumberFormat("en-IN").format(
        Math.round(displayValue)
    );

    const lakhPrice = (displayValue / 100000).toFixed(2);

    return (

        <section
            id="prediction-result"
            className="prediction-section"
        >

            <div className="container">

                <div className="result-card">

                    <p className="result-tag">
                        AI MARKET ESTIMATE
                    </p>

                    <h2>
                        Estimated Market Value
                    </h2>

                    <h1>

                        ₹ {lakhPrice} Lakh

                    </h1>

                    <p className="result-small">

                        ₹ {formattedPrice}

                    </p>

                </div>

            </div>

        </section>

    );

}

export default PredictionResult;