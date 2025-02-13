import React, { useState } from 'react';
import { Box } from '@mui/material';
import FeatureSelection from './FeatureSelection';
import PredictionResults from './PredictionResults';
import { PREDICTION_FEATURES } from './config';

const PredictionPage = ({ company, onBack }) => {
  const [selectedFeatures, setSelectedFeatures] = useState(["氣候風險因子評級"]);
  const [prediction, setPrediction] = useState(null);

  // Generate daily data for 9 features over 30 days
  const generateFeatureData = () => {
    const days = 30;
    const baseData = Array.from({ length: days }, (_, dayIndex) => {
      const dayData = { day: dayIndex + 1 };
      
      PREDICTION_FEATURES.forEach(feature => {
        const baseValue = Math.random() * 100;
        const trend = Math.sin(dayIndex / 5) * 10 + baseValue;
        dayData[feature] = Number(trend.toFixed(2));
      });
      
      // Market return rate
      const marketReturnBase = Math.sin(dayIndex / 3) * 5 + 10;
      dayData['市場回報率'] = Number(marketReturnBase.toFixed(2));

      if (dayIndex > 25) {
        PREDICTION_FEATURES.forEach(feature => {
          dayData[feature] = null;
        });
        dayData['市場回報率'] = null;
      }
      
      return dayData;
    });
    
    return baseData;
  };

  const historicalData = generateFeatureData();

  const handleFeatureSelect = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handlePredict = () => {
    setPrediction({
      predictedPrice: Math.floor(Math.random() * 1000),
      confidence: Math.floor(Math.random() * 100)
    });
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row' }}>
      <FeatureSelection
        company={company}
        selectedFeatures={selectedFeatures}
        onFeatureSelect={handleFeatureSelect}
        onPredict={handlePredict}
        onBack={onBack}
      />
      <PredictionResults
        prediction={prediction}
        historicalData={historicalData}
        selectedFeatures={selectedFeatures}
      />
    </Box>
  );
};

export default PredictionPage;