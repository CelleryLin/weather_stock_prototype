import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Autocomplete,
  TextField
} from '@mui/material';
import { COMPANY_LIST } from './config';

const WelcomePage = ({ onSearch }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleSearch = () => {
    if (selectedCompany) {
      onSearch(selectedCompany);
    }
  };

  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            股票預測系統
          </Typography>
          <Button color="inherit">登入</Button>
        </Toolbar>
      </AppBar>
      <Container 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <Card sx={{ width: '50%' }}>
          <CardContent>
            <Autocomplete
              fullWidth
              options={COMPANY_LIST}
              getOptionLabel={(option) => `${option.code} ${option.name}`}
              renderOption={(props, option) => (
                <li {...props} key={option.code}>
                  {option.code} {option.name}
                </li>
              )}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="搜尋上市公司" 
                  variant="outlined" 
                />
              )}
              value={selectedCompany}
              onChange={(_, newValue) => setSelectedCompany(newValue)}
              sx={{ mb: 2 }}
            />
            <Button 
              fullWidth 
              variant="contained" 
              onClick={handleSearch}
              disabled={!selectedCompany}
            >
              搜尋
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default WelcomePage;