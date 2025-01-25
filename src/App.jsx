import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import PredictionPage from "./Components/PredictionPage";

const App = () => {
  const [page, setPage] = useState(1);
  const [selectedCompany, setSelectedCompany] = useState('');

  const handleSearch = (company) => {
    setSelectedCompany(company);
    setPage(2);
  };

  const handleBack = () => {
    setPage(1);
  };

  return (
    <>
      {page === 1 && <WelcomePage onSearch={handleSearch} />}
      {page === 2 && (
        <PredictionPage 
          company={selectedCompany} 
          onBack={handleBack} 
        />
      )}
    </>
  );
};

export default App;