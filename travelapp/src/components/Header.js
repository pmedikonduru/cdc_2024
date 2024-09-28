import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1E1E2F', boxShadow: 'none', padding: '0.5rem 0' }}>
      <Container>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Montserrat, sans-serif' }}>
            Travel Recommendation
          </Typography>
          <div>
            <Button color="inherit" component={Link} to="/" sx={{ marginLeft: '1rem', fontWeight: '500' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/preferences" sx={{ marginLeft: '1rem', fontWeight: '500' }}>
              Preferences
            </Button>
            <Button color="inherit" component={Link} to="/recommendations" sx={{ marginLeft: '1rem', fontWeight: '500' }}>
              Recommendations
            </Button>
            <Button color="inherit" component={Link} to="/about" sx={{ marginLeft: '1rem', fontWeight: '500' }}>
              About
            </Button>
            <Button color="inherit" component={Link} to="/contact" sx={{ marginLeft: '1rem', fontWeight: '500' }}>
              Contact
            </Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
