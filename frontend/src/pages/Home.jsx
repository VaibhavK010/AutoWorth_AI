import { useState } from "react";
import Analytics from "../components/Analytics/Analytics";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import PredictionResult from "../components/PredictionResult/PredictionResult";
import Stats from "../components/Stats/Stats";

function Home() {

    const [prediction, setPrediction] = useState(null);

    return (

        <>

            <Navbar />

            <Hero
                setPrediction={setPrediction}
            />

            {
                prediction && (

                    <PredictionResult
                        prediction={prediction}
                    />

                )
            }

            <Stats />

            <Analytics />

        </>

    );

}

export default Home;