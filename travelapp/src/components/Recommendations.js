import React from 'react';
import { Box, Typography, Card, CardContent, List, ListItem, ListItemText, Button } from '@mui/material';

const Recommendations = () => {
    // Hard-coded data for demonstration
    const recommendedCity = "Paris, France";
    const tripAdvisorLocations = [
        "Eiffel Tower",
        "Louvre Museum",
        "Notre-Dame Cathedral",
        "Arc de Triomphe",
        "Seine River Cruise"
    ];
    const flights = [
        { airline: "Air France", price: "$650", departure: "10:00 AM" },
        { airline: "Lufthansa", price: "$720", departure: "2:30 PM" },
        { airline: "British Airways", price: "$680", departure: "8:45 PM" }
    ];

    return (
        <Box sx={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Your Personalized Recommendation
            </Typography>

            {/* Recommended City */}
            <Card sx={{ marginBottom: '2rem' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Recommended City: {recommendedCity}
                    </Typography>
                    <Typography variant="body1">
                        Based on your preferences, we think you'll love visiting {recommendedCity}!
                    </Typography>
                </CardContent>
            </Card>

            {/* TripAdvisor Locations */}
            <Card sx={{ marginBottom: '2rem' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Top Places to Visit in {recommendedCity}
                    </Typography>
                    <List>
                        {tripAdvisorLocations.map((location, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={location} />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>

            {/* Flights */}
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Available Flights to {recommendedCity}
                    </Typography>
                    <List>
                        {flights.map((flight, index) => (
                            <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <ListItemText 
                                    primary={flight.airline} 
                                    secondary={`Departure: ${flight.departure}`} 
                                />
                                <Box>
                                    <Typography variant="h6" component="span" sx={{ marginRight: '1rem' }}>
                                        {flight.price}
                                    </Typography>
                                    <Button variant="contained" color="primary">
                                        Book
                                    </Button>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Recommendations;
