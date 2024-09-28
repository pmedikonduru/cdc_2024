import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

const Recommendations = () => {
  const location = useLocation();
  const preferences = location.state?.preferences || {};

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Your Recommendations
      </Typography>

      <Typography variant="h6">Based on your preferences:</Typography>
      <pre>{JSON.stringify(preferences, null, 2)}</pre>
      {/* Here you can display recommendations based on preferences */}
    </Container>
  );
};

export default Recommendations;
