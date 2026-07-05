from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

# Load dataset
df = pd.read_csv("dataset/cardekho_dataset.csv")

# Load model
model = joblib.load("model/car_price_model.pkl")


@app.route("/")
def home():
    return jsonify({"message": "AutoWorth AI API Running"})


@app.route("/metadata")
def metadata():

    return jsonify({
        "brands": sorted(df["brand"].dropna().unique().tolist()),
        "fuel_types": sorted(df["fuel_type"].dropna().unique().tolist()),
        "transmission_types": sorted(df["transmission_type"].dropna().unique().tolist()),
        "seller_types": sorted(df["seller_type"].dropna().unique().tolist())
    })


@app.route("/models/<brand>")
def models(brand):

    models = sorted(
        df[df["brand"] == brand]["model"]
        .dropna()
        .unique()
        .tolist()
    )

    return jsonify(models)


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    print("\n========== DATA RECEIVED ==========")
    print(data)

    input_df = pd.DataFrame([data])

    print("\n========== INPUT DATAFRAME ==========")
    print(input_df)

    prediction = model.predict(input_df)[0]

    return jsonify({
        "success": True,
        "predicted_price": round(float(prediction), 2)
    })

@app.route("/analytics")
def analytics():

    analytics = {

        "total_cars": len(df),

        "average_price": round(df["selling_price"].mean(), 2),

        "average_mileage": round(df["mileage"].mean(), 2),

        "top_brands": (
            df["brand"]
            .value_counts()
            .head(10)
            .to_dict()
        ),

        "fuel_distribution": (
            df["fuel_type"]
            .value_counts()
            .to_dict()
        ),

        "vehicle_age": (
            df["vehicle_age"]
            .value_counts()
            .sort_index()
            .to_dict()
        )

    }

    return jsonify(analytics)

if __name__ == "__main__":
    app.run(debug=True)