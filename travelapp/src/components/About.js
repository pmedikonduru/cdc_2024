// src/components/About.js
import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material'; // Import Material-UI components
import Travel1 from '../assets/travel1.jpg'; // Import travel images
import Travel2 from '../assets/travel2.jpg';
import Travel3 from '../assets/travel3.jpg';
import Travel4 from '../assets/travel4.jpg';

const About = () => {
    return (
        <Container 
            sx={{
                minHeight: '50vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '2rem',
                backgroundColor: '#f5f5f5',
            }}
        >
            <Box 
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    boxShadow: 3,
                    padding: '2rem',
                    maxWidth: '800px',
                }}
            >
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>
                    About Us
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ marginBottom: '1.5rem', fontFamily: 'Roboto, sans-serif' }}>
                Hello! Hola! Bonjour! We're just two college students with a passion for travel!
                We hope this app inspires you to embark on your own unforgettable adventures.
                Join us as we share vibrant cultures, diverse cuisines, and seek out thrilling experiences around the globe!
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: 'Roboto, sans-serif', marginBottom: '1.5rem' }}>
                This app was built for the Carolina Data Challenge 2024.
                </Typography>

                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', marginTop: '2rem' }}>
                    Our Travels:
                </Typography>

                {/* Grid for travel pictures */}
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <img 
                            src={Travel1} // Use imported image
                            alt="Travel 1"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img 
                            src={Travel2} // Use imported image
                            alt="Travel 2"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img 
                            src={Travel3} // Use imported image
                            alt="Travel 3"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img 
                            src={Travel4} // Use imported image
                            alt="Travel 4"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default About;
