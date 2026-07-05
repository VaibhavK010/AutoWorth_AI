import "./Hero.css";
import PredictionForm from "../PredictionForm/PredictionForm";
import heroVideo from "../../assets/car.mp4";

function Hero({ setPrediction }) {
  return (
    <section className="hero">

      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="overlay"></div>

      <div className="container hero-content">

        <div className="row align-items-center">

          <div className="col-lg-4">

            <span className="hero-tag">
              AI Powered Car Valuation
            </span>

            <h1>
              Know Your Car's
              <br />
              <span>True Value</span>
            </h1>

            <p>
              Instantly estimate your vehicle's market value using Machine Learning trained on thousands of real used-car listings.
            </p>

          </div>

          <div className="col-lg-8">

            <PredictionForm
              setPrediction={setPrediction}
            />

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;