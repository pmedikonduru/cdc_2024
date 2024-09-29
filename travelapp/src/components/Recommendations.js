import React from 'react';
import { Box, Typography, Button, Card, CardMedia, CardContent } from '@mui/material';

const recommendations = [
    { title: "Adventure Hiking", description: "Explore breathtaking trails.", image: "path/to/image1.jpg" },
    { title: "Culinary Delights", description: "Taste the local cuisine.", image: "path/to/image2.jpg" },
    // Add more recommendations here
];

const Recommendations = () => {
    return (
        <Box sx={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Based on Your Preferences
            </Typography>
            <Typography variant="h6" gutterBottom>
                Here are some experiences you might love!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                {recommendations.map((rec, index) => (
                    <Card key={index} sx={{ margin: '1rem', width: '300px' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={rec.image}
                            alt={rec.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {rec.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {rec.description}
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
