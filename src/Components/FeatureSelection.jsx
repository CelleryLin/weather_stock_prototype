import React from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { PREDICTION_FEATURES } from './config';

const FeatureSelection = ({ 
  company, 
  selectedFeatures, 
  onFeatureSelect, 
  onPredict, 
  onBack 
}) => {
  return (
    <Box sx={{ 
      width: '30%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRight: '1px solid rgba(0, 0, 0, 0.12)',
      overflowY: 'hidden'
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
                    onChange={() => onFeatureSelect(feature)}
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
          onClick={onPredict}
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
  );
};

export default FeatureSelection;