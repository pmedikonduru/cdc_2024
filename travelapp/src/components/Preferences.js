import React, { useState } from 'react';
import { Button, Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
import axios from 'axios';

const PreferencePage = () => {
    const [preferences, setPreferences] = useState({
        adventure: false,
        relaxation: false,
        culture: false,
        cuisine: false,
    });

    const handleChange = (event) => {
        setPreferences({
            ...preferences,
            [event.target.name]: event.target.checked,
        });
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/preferences', preferences);
            console.log('Preferences saved:', response.data);
        } catch (error) {
            console.error('Error saving preferences:', error);
        }
    };

    return (
        <Box sx={{ padding: '2rem', textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Select Your Ideal Travel Experiences
            </Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        checked={preferences.adventure}
                        onChange={handleChange}
                        name="adventure"
                    />
                }
                label="Adventure"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={preferences.relaxation}
                        onChange={handleChange}
                        name="relaxation"
                    />
                }
                label="Relaxation"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={preferences.culture}
                        onChange={handleChange}
                        name="culture"
                    />
                }
                label="Culture"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        checked={preferences.cuisine}
                        onChange={handleChange}
                        name="cuisine"
                    />
                }
                label="Cuisine"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginTop: '2rem' }}
            >
                Submit Preferences
            </Button>
        </Box>
    );
};

export default PreferencePage;
