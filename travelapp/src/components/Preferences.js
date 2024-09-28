import React, { useState } from 'react';
import { Button, Typography, Container, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Preferences = () => {
  const [preferences, setPreferences] = useState({
    outdoor: {
      parks: false,
      beaches: false,
      gardens: false,
      viewpoints: false,
      monuments: false,
      zoos: false,
    },
    cultural: {
      churches: false,
      museums: false,
      artGalleries: false,
    },
    entertainment: {
      theatres: false,
      danceClubs: false,
      pubsBars: false,
      swimmingPools: false,
    },
    shoppingDining: {
      malls: false,
      restaurants: false,
      burgerPizza: false,
      juiceBars: false,
      bakeries: false,
      cafes: false,
    },
    accommodation: {
      hotels: false,
    },
    wellness: {
      gyms: false,
      beautySpas: false,
    },
    localServices: {
      localServices: false,
    },
  });

  const navigate = useNavigate(); // Hook to navigate between routes

  const handleToggle = (group, name) => {
    setPreferences((prevState) => ({
      ...prevState,
      [group]: {
        ...prevState[group],
        [name]: !prevState[group][name],
      },
    }));
  };

  const handleSubmit = () => {
    console.log(preferences);
    // Navigate to the recommendations page when the user clicks Submit
    navigate('/recommendations', { state: { preferences } }); // Pass preferences as state
  };

  const renderButton = (group, name, label) => (
    <Button
      variant={preferences[group][name] ? 'contained' : 'outlined'}
      color={preferences[group][name] ? 'primary' : 'default'}
      onClick={() => handleToggle(group, name)}
      sx={{ width: '100%' }} // Make buttons full width in their grid cell
    >
      {label}
    </Button>
  );

  return (
    <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: '2rem', borderRadius: '10px' }}>
      <Typography variant="h4" color="primary" gutterBottom>
        Select Your Preferences
      </Typography>

      {/* Outdoor Attractions */}
      <Typography variant="h6" gutterBottom>Outdoor Attractions</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('outdoor', 'parks', 'Parks')}</Grid>
        <Grid item xs={6}>{renderButton('outdoor', 'beaches', 'Beaches')}</Grid>
        <Grid item xs={6}>{renderButton('outdoor', 'gardens', 'Gardens')}</Grid>
        <Grid item xs={6}>{renderButton('outdoor', 'viewpoints', 'Viewpoints')}</Grid>
        <Grid item xs={6}>{renderButton('outdoor', 'monuments', 'Monuments')}</Grid>
        <Grid item xs={6}>{renderButton('outdoor', 'zoos', 'Zoos')}</Grid>
      </Grid>

      {/* Cultural & Historical */}
      <Typography variant="h6" gutterBottom mt={2}>Cultural & Historical</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('cultural', 'churches', 'Churches')}</Grid>
        <Grid item xs={6}>{renderButton('cultural', 'museums', 'Museums')}</Grid>
        <Grid item xs={6}>{renderButton('cultural', 'artGalleries', 'Art Galleries')}</Grid>
      </Grid>

      {/* Entertainment & Nightlife */}
      <Typography variant="h6" gutterBottom mt={2}>Entertainment & Nightlife</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('entertainment', 'theatres', 'Theatres')}</Grid>
        <Grid item xs={6}>{renderButton('entertainment', 'danceClubs', 'Dance Clubs')}</Grid>
        <Grid item xs={6}>{renderButton('entertainment', 'pubsBars', 'Pubs/Bars')}</Grid>
        <Grid item xs={6}>{renderButton('entertainment', 'swimmingPools', 'Swimming Pools')}</Grid>
      </Grid>

      {/* Shopping & Dining */}
      <Typography variant="h6" gutterBottom mt={2}>Shopping & Dining</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('shoppingDining', 'malls', 'Malls')}</Grid>
        <Grid item xs={6}>{renderButton('shoppingDining', 'restaurants', 'Restaurants')}</Grid>
        <Grid item xs={6}>{renderButton('shoppingDining', 'burgerPizza', 'Burger/Pizza Shops')}</Grid>
        <Grid item xs={6}>{renderButton('shoppingDining', 'juiceBars', 'Juice Bars')}</Grid>
        <Grid item xs={6}>{renderButton('shoppingDining', 'bakeries', 'Bakeries')}</Grid>
        <Grid item xs={6}>{renderButton('shoppingDining', 'cafes', 'Cafes')}</Grid>
      </Grid>

      {/* Accommodation */}
      <Typography variant="h6" gutterBottom mt={2}>Accommodation</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('accommodation', 'hotels', 'Hotels/Other Lodgings')}</Grid>
      </Grid>

      {/* Health & Wellness */}
      <Typography variant="h6" gutterBottom mt={2}>Health & Wellness</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('wellness', 'gyms', 'Gyms')}</Grid>
        <Grid item xs={6}>{renderButton('wellness', 'beautySpas', 'Beauty & Spas')}</Grid>
      </Grid>

      {/* Local Services */}
      <Typography variant="h6" gutterBottom mt={2}>Local Services</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>{renderButton('localServices', 'localServices', 'Local Services')}</Grid>
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
