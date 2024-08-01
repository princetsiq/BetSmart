// src/PredictionComponent.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PredictionComponent.css";

const PredictionComponent = () => {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const getPrediction = async () => {
      try {
        const hardcodedFeatures = {
          PTS: 100,
          FGM: 40,
          FGA: 80,
          "FG%": 50,
          "3PM": 10,
          "3PA": 25,
          "3P%": 40,
          FTM: 15,
          FTA: 20,
          "FT%": 75,
          OREB: 10,
          DREB: 30,
          REB: 40,
          AST: 20,
          TOV: 15,
          STL: 5,
          BLK: 3,
          PF: 18,
          "+/-": 5,
        };

        console.log("Sending hardcoded features:", hardcodedFeatures); // Logging the features being sent

        const response = await axios.post("http://localhost:5002/api/predict", {
          features: hardcodedFeatures,
        });

        console.log("Received response:", response.data); // Logging the received response
        setPrediction(response.data.prediction);
      } catch (error) {
        console.error("Error fetching prediction:", error);
      }
    };

    getPrediction();
  }, []);

  return (
    <div className="prediction-container">
      {prediction !== null ? (
        <div className="prediction-result">
          <p className="score">Prediction:</p>
          <p> {Math.round(prediction)} points</p>
        </div>
      ) : (
        <p className="loading-message">Loading prediction...</p>
      )}
    </div>
  );
};

export default PredictionComponent;
