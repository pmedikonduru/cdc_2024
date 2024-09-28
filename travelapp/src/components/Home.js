import React, { useEffect, useState } from 'react';
import { Button, Typography, Box } from '@mui/material'; // Material-UI components
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import TravelBackground1 from '../assets/bg1.avif'; // Ensure the image paths are correct
import TravelBackground2 from '../assets/bg2.avif';
import TravelBackground3 from '../assets/bg3.avif';
import TravelBackground4 from '../assets/bg4.avif';

const images = [
    TravelBackground1,
    TravelBackground2,
    TravelBackground3,
    TravelBackground4,
];

const Home = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const navigate = useNavigate(); // Initialize navigate function

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleGetStarted = () => {
        navigate('/preferences'); // Navigate to preferences page
    };

    return (
        <Box 
            sx={{
                backgroundImage: `url(${images[currentImage]})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
                textAlign: 'center',
                padding: '2rem',
                position: 'relative',
                transition: 'background-image 1s ease-in-out', // Transition effect for the background image
            }}
        >
            <Box 
                sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '3rem',
                    borderRadius: '50px',
                    boxShadow: 5,
                }}
            >
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>
                    Discover Your Next Adventure!
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ marginBottom: '1.5rem', fontFamily: 'Roboto, sans-serif' }}>
                    Find the perfect travel destinations tailored to your preferences. 
                    Explore new cultures, cuisines, and experiences!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={handleGetStarted} // Set onClick to navigate
                    sx={{ 
                        marginTop: '1.5rem', 
                        padding: '1rem 2rem', 
                        fontWeight: 'bold', 
                        borderRadius: '20px',
                        '&:hover': {
                            backgroundColor: '#FF4081', // Example hover color
                        },
                    }}
                >
                    Get Started
                </Button>
            </Box>
            {/* Optional: Add a decorative element or icons below */}
            <Box 
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    color: 'white',
                    display: 'flex',
                    gap: '1.5rem',
                }}
            >
                <Typography variant="body1" sx={{ fontWeight: 'light' }}>✈️ Travel,</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'light' }}>🏖️ Relax,</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'light' }}>🍽️ Savor!</Typography>
            </Box>
        </Box>
    );
};

export default Home;
