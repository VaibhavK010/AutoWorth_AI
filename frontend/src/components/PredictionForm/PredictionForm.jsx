import "./PredictionForm.css";
import { useEffect, useState } from "react";
import API from "../../utils/api";

function PredictionForm({ setPrediction }) {
  const [metadata, setMetadata] = useState({
    brands: [],
    fuel_types: [],
    transmission_types: [],
    seller_types: [],
  });

  const [models, setModels] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    vehicle_age: "",
    km_driven: "",
    seller_type: "",
    fuel_type: "",
    transmission_type: "",
    mileage: "",
    engine: "",
    max_power: "",
    seats: "",
  });

  // Load metadata once
  useEffect(() => {
    API.get("/metadata")
      .then((res) => setMetadata(res.data))
      .catch(console.error);
  }, []);

  // Load models whenever brand changes
  useEffect(() => {
    if (!formData.brand) {
      setModels([]);
      return;
    }

    API.get(`/models/${formData.brand}`)
      .then((res) => setModels(res.data))
      .catch(console.error);
  }, [formData.brand]);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handlePredict() {
    try {
      setLoading(true);

      const payload = {
        ...formData,
        vehicle_age: Number(formData.vehicle_age),
        km_driven: Number(formData.km_driven),
        mileage: Number(formData.mileage),
        engine: Number(formData.engine),
        max_power: Number(formData.max_power),
        seats: Number(formData.seats),
      };

      const res = await API.post("/predict", payload);

      if (res.data.success) {
        setPrediction(res.data.predicted_price);

      } else {
        alert(res.data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Prediction failed.");
    }

    setLoading(false);
  }

  return (
    <div className="prediction-card">

      <h3 className="mb-4">Quick Prediction</h3>

      <div className="row">

        {/* Brand */}
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          >
            <option value="">Brand</option>

            {metadata.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            name="model"
            value={formData.model}
            onChange={handleChange}
          >
            <option value="">Model</option>

            {models.map((model) => (
              <option key={model} value={model}>
                {model}
              </option>
            ))}
          </select>
        </div>

        {/* Seller */}
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            name="seller_type"
            value={formData.seller_type}
            onChange={handleChange}
          >
            <option value="">Seller</option>

            {metadata.seller_types.map((seller) => (
              <option key={seller} value={seller}>
                {seller}
              </option>
            ))}
          </select>
        </div>

        {/* Fuel */}
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            name="fuel_type"
            value={formData.fuel_type}
            onChange={handleChange}
          >
            <option value="">Fuel</option>

            {metadata.fuel_types.map((fuel) => (
              <option key={fuel} value={fuel}>
                {fuel}
              </option>
            ))}
          </select>
        </div>

        {/* Transmission */}
        <div className="col-md-6 mb-3">
          <select
            className="form-select"
            name="transmission_type"
            value={formData.transmission_type}
            onChange={handleChange}
          >
            <option value="">Transmission</option>

            {metadata.transmission_types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Age */}
        <div className="col-md-6 mb-3">
          <input
            type="number"
            className="form-control"
            name="vehicle_age"
            placeholder="Vehicle Age (Years)"
            value={formData.vehicle_age}
            onChange={handleChange}
          />
        </div>

        {/* KM */}
        <div className="col-md-6 mb-3">
          <input
            type="number"
            className="form-control"
            name="km_driven"
            placeholder="Kilometers Driven"
            value={formData.km_driven}
            onChange={handleChange}
          />
        </div>

        {/* Mileage */}
        <div className="col-md-4 mb-3">
          <input
            type="number"
            className="form-control"
            name="mileage"
            placeholder="Mileage (km/l)"
            value={formData.mileage}
            onChange={handleChange}
          />
        </div>

        {/* Engine */}
        <div className="col-md-4 mb-3">
          <input
            type="number"
            className="form-control"
            name="engine"
            placeholder="Engine (cc)"
            value={formData.engine}
            onChange={handleChange}
          />
        </div>

        {/* Power */}
        <div className="col-md-4 mb-3">
          <input
            type="number"
            className="form-control"
            name="max_power"
            placeholder="Power (bhp)"
            value={formData.max_power}
            onChange={handleChange}
          />
        </div>

        {/* Seats */}
        <div className="col-md-12 mb-4">
          <input
            type="number"
            className="form-control"
            name="seats"
            placeholder="Number of Seats"
            value={formData.seats}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button
            className="btn btn-success btn-lg w-100"
            onClick={handlePredict}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default PredictionForm;