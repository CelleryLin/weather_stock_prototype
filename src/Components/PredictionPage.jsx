import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Checkbox, 
  FormControlLabel, 
  Grid 
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { predplot } from './config';

export const PREDICTION_FEATURES = [
  '年營業額成長比率', 
  '公司現金流', 
  '每股盈餘 EPS',
  '公司市值（同業比較）', 
  '公司產業屬性（半導體…）', 
  '機構大型投資比重',
  '分析師評價（投顧研究報告書）', 
  '市場輿情熱度', 
  '氣候風險因子評級'
];

const PredictionPage = ({ company, onBack }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
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

      //  if dayIndex > 25, set all value to null
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

  const featureColors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff7300', 
    '#413ea0', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
  ];

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'row' }}>
      {/* Left Column - Feature Selection */}
      <Box sx={{ 
        width: '30%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            {company.name} ({company.code})
          </Typography>
          <Typography variant="h6" gutterBottom>
            選擇預測特徵
          </Typography>
          <Grid container spacing={2}>
            {PREDICTION_FEATURES.map((feature) => (
              <Grid item xs={12} key={feature}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedFeatures.includes(feature)}
                      onChange={() => handleFeatureSelect(feature)}
                    />
                  }
                  label={feature}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ padding: 2, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handlePredict}
            disabled={selectedFeatures.length === 0}
          >
            預測
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={onBack}
          >
            返回
          </Button>
        </Box>
      </Box>

      {/* Right Column - Prediction Results */}
      <Box sx={{ 
        width: '60%', 
        display: 'flex', 
        flexDirection: 'column',
        borderLeft: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        {/* Prediction Result */}
        <Box sx={{ padding: 2 }}>
          <Typography variant="h4" gutterBottom>
            預測結果
          </Typography>
          {prediction ? (
            <>
              <Typography variant="h6" gutterBottom>
                預測股價: {prediction.predictedPrice} 元
              </Typography>
              <Typography variant="body1" gutterBottom>
                信心指數: {prediction.confidence}%
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="textSecondary">
              請選擇預測特徵並點擊預測按鈕
            </Typography>
          )}
        </Box>

        {/* Feature Trends Chart */}
        <Box sx={{ height: 400, width: '100%', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            特徵趨勢
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedFeatures.map((feature, index) => (
                <Line 
                  key={feature}
                  type="monotone" 
                  dataKey={feature} 
                  stroke={featureColors[index % featureColors.length]} 
                  name={feature}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Box>

        {/* Market Return Rate Chart */}
        <Box sx={{ height: 400, width: '100%', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            市場回報率
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={predplot}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="Market Return Rate"
                stroke="#FF0000"
                strokeWidth={2}
              />
              <Line 
                type="monotone"
                dataKey="Market Return Rate Pred"
                stroke="#FF0000"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default PredictionPage;