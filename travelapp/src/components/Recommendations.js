import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Recommendations = () => {
    const location = useLocation();
    const { recommendations } = location.state || { recommendations: { cities: [], activities: [] } }; // Ensure safe access

    const { cities, activities } = recommendations;

    return (
        <Box sx={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Based on Your Preferences
            </Typography>
            <Typography variant="h6" gutterBottom>
                Here are some experiences you might love!
            </Typography>

            {/* Recommended Cities */}
            <Typography variant="h5" gutterBottom>
                Recommended Cities
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {cities.map((city, index) => (
                    <Card key={index} sx={{ margin: '1rem', width: '300px' }}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {city}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Recommended Activities */}
            <Typography variant="h5" gutterBottom mt={4}>
                Recommended Activities
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {activities.map((activity, index) => (
                    <Card key={index} sx={{ margin: '1rem', width: '300px' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={activity.image} // You may need to provide an image for activities
                            alt={activity.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {activity.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {activity.description}
                            </Typography>
                            <Button variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
                                Learn More
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Button variant="outlined" sx={{ marginTop: '2rem' }}>
                Explore More Options
            </Button>
        </Box>
    );
};

export default Recommendations;
