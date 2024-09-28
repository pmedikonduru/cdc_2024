import React, { useState } from 'react';
import { Button, Typography, Container, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const [preferences, setPreferences] = useState([]);
  
  const navigate = useNavigate();

  const handleToggle = (preference) => {
    setPreferences((prevPreferences) => {
      if (prevPreferences.includes(preference)) {
        // Remove preference if already selected
        return prevPreferences.filter((pref) => pref !== preference);
      } else {
        // Add preference if not already selected
        return [...prevPreferences, preference];
      }
    });
  };

  const handleSubmit = () => {
    console.log(preferences);
    navigate('/recommendations', { state: { preferences } });
  };

  const renderButton = (preference, label) => {
    const isSelected = preferences.includes(preference);

    return (
      <Button
        variant="contained"
        sx={{
          width: '100%',
          backgroundColor: isSelected ? 'primary.main' : 'grey.300',
          color: isSelected ? 'white' : 'black',
          '&:hover': {
            backgroundColor: isSelected ? 'primary.dark' : 'grey.400',
          },
          transition: 'background-color 0.3s ease',
        }}
        onClick={() => handleToggle(preference)}
      >
        <Typography variant="body1">
          {label}
        </Typography>
      </Button>
    );
  };

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Select Your Preferences
      </Typography>

      {/* Outdoor Attractions */}
      <Typography variant="h6" gutterBottom>Outdoor Attractions</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('Parks', 'Parks')}</Grid>
        <Grid item xs={6}>{renderButton('Beaches', 'Beaches')}</Grid>
        <Grid item xs={6}>{renderButton('Gardens', 'Gardens')}</Grid>
        <Grid item xs={6}>{renderButton('Viewpoints', 'Viewpoints')}</Grid>
        <Grid item xs={6}>{renderButton('Monuments', 'Monuments')}</Grid>
        <Grid item xs={6}>{renderButton('Zoos', 'Zoos')}</Grid>
      </Grid>

      {/* Cultural & Historical */}
      <Typography variant="h6" gutterBottom mt={2}>Cultural & Historical</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('Churches', 'Churches')}</Grid>
        <Grid item xs={6}>{renderButton('Museums', 'Museums')}</Grid>
        <Grid item xs={6}>{renderButton('Art Galleries', 'Art Galleries')}</Grid>
      </Grid>

      {/* Entertainment & Nightlife */}
      <Typography variant="h6" gutterBottom mt={2}>Entertainment & Nightlife</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('Theatres', 'Theatres')}</Grid>
        <Grid item xs={6}>{renderButton('Dance Clubs', 'Dance Clubs')}</Grid>
        <Grid item xs={6}>{renderButton('Pubs/Bars', 'Pubs/Bars')}</Grid>
        <Grid item xs={6}>{renderButton('Swimming Pools', 'Swimming Pools')}</Grid>
      </Grid>

      {/* Shopping & Dining */}
      <Typography variant="h6" gutterBottom mt={2}>Shopping & Dining</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('Malls', 'Malls')}</Grid>
        <Grid item xs={6}>{renderButton('Restaurants', 'Restaurants')}</Grid>
        <Grid item xs={6}>{renderButton('Burger/Pizza Shops', 'Burger/Pizza')}</Grid>
        <Grid item xs={6}>{renderButton('Juice Bars', 'Juice Bars')}</Grid>
        <Grid item xs={6}>{renderButton('Bakeries', 'Bakeries')}</Grid>
        <Grid item xs={6}>{renderButton('Cafes', 'Cafes')}</Grid>
      </Grid>

      {/* Accommodation */}
      <Typography variant="h6" gutterBottom mt={2}>Accommodation</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('Hotels', 'Hotels/Other Lodgings')}</Grid>
      </Grid>

      {/* Health & Wellness */}
      <Typography variant="h6" gutterBottom mt={2}>Health & Wellness</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('Gyms', 'Gyms')}</Grid>
        <Grid item xs={6}>{renderButton('Beauty & Spas', 'Beauty & Spas')}</Grid>
      </Grid>

      {/* Local Services */}
      <Typography variant="h6" gutterBottom mt={2}>Local Services</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('Local Services', 'Local Services')}</Grid>
      </Grid>

      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit Preferences
        </Button>
      </Box>
    </Container>
  );
};

export default Preferences;
