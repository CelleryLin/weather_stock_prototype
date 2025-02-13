import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { predplot } from './config';

const industryCompositionData = [
  { name: '半導體', value: 30, fill: '#8884d8' },
  { name: 'AI', value: 20, fill: '#82ca9d' },
  { name: 'IC 設計', value: 15, fill: '#ffc658' },
  { name: '網通', value: 10, fill: '#ff7300' },
  { name: '傳產(其他)', value: 25, fill: '#413ea0' }
];

const institutionalInvestmentData = [
  { name: '外資', value: 45 },
  { name: '投信', value: 25 },
  { name: '自營商', value: 30 }
];

const analystRatingsData = [
  { name: '增持', value: 60, fill: '#36A2EB' },
  { name: '減持', value: 20, fill: '#FF6384' },
  { name: '維持', value: 20, fill: '#FFCE56' }
];

const marketSentimentData = [
  { topic: '平日散戶討論度', value: 75 },
  { topic: '平日新聞報導度', value: 80 },
  { topic: '法人投資報告熱度', value: 85 },
  { topic: '股東會/董事會被報導', value: 65 },
  { topic: '公司公告熱度', value: 90 }
];

const featureColors = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', 
  '#413ea0', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
];

const PredictionResults = ({ 
  prediction, 
  historicalData, 
  selectedFeatures 
}) => {
  return (
    <Box sx={{ 
      width: '70%', 
      display: 'flex', 
      flexDirection: 'column',
      borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
      overflowY: 'auto'
    }}>
      <Box sx={{ width: '95%', margin: 'auto' }}>
        {/* Prediction Result */}
        <Box sx={{ padding: 2}}>
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

        {/* Industry Composition Chart */}
        {/* <Box sx={{ height: 400, width: '100%', padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            行業類比重(成分)
          </Typography>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={industryCompositionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {industryCompositionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box> */}

        {/* Conditional Charts based on selected features */}
        {selectedFeatures.includes("機構大型投資比重") && (
          <Box sx={{ height: 400, width: '100%', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              法人(機構大型)投資比重
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={institutionalInvestmentData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        )}

        {selectedFeatures.includes("分析師評價（投顧研究報告書）") && (
          <Box sx={{ height: 400, width: '100%', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              分析師評級
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={analystRatingsData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  fill="#8884d8"
                  label
                >
                  {analystRatingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Legend
                    layout="vertical"
                    align="right"
                    verticalAlign="middle"
                    formatter={(value, entry) => `${entry.payload.name}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        )}

        {selectedFeatures.includes("市場輿情熱度") && (
          <Box sx={{ height: 400, width: '100%', padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              市場輿情熱度
            </Typography>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={marketSentimentData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="topic" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Market Sentiment"
                  dataKey="value"
                  stroke="#8884d8"
                  fill="#8884d8"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PredictionResults;