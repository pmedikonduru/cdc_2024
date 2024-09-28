import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Container } from '@mui/material'; // Material-UI components
import TravelBackground from '../assets/websitebg.jpeg';

const Home = () => {
    return (
        <Box 
            sx={{
                backgroundImage: `url(${TravelBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
            }}
        >
            <Container
                maxWidth="sm"
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    padding: '2rem',
                    borderRadius: '10px',
                    textAlign: 'center',
                }}
            >
                <Typography 
                    variant="h2" 
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',  // Make it bold
                        fontSize: '3.5rem',  // Increase font size for a modern look
                        letterSpacing: '0.05em',  // Add slight spacing for a sleek look
                        textTransform: 'uppercase',  // Make it uppercase for a more impactful design
                        fontFamily: 'Roboto, sans-serif',  // Ensure modern sans-serif font
                    }}
                >
                    Welcome to the Travel Recommendation App!
                </Typography>
                <Typography 
                    variant="h6" 
                    gutterBottom
                    sx={{
                        fontSize: '1.2rem',  // Adjust font size for balance
                        fontWeight: '300',  // Lighter weight for contrast with the header
                        fontFamily: 'Roboto, sans-serif',
                    }}
                >
                    Find the perfect travel destinations based on your preferences!
                </Typography>
                <Button
                    component={Link}
                    to="/preferences"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ marginTop: '1.5rem' }}
                >
                    Get Started
                </Button>
            </Container>
        </Box>
    );
};

export default Home;
