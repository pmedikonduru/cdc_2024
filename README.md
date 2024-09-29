# Travel Recommendation App

This application provides personalized travel recommendations based on user preferences. It combines a React frontend with a Flask backend to deliver a seamless user experience for planning trips.

## Functionality

### User Preference Selection
- Users can select their travel preferences from a wide range of categories including:
  - Outdoor Attractions (e.g., Parks, Beaches, Gardens)
  - Cultural & Historical Sites (e.g., Churches, Museums, Art Galleries)
  - Entertainment & Nightlife (e.g., Theatres, Dance Clubs, Pubs/Bars)
  - Shopping & Dining (e.g., Malls, Restaurants, Cafes)
  - Accommodation (Hotels/Other Lodgings)
  - Health & Wellness (e.g., Gyms, Beauty & Spas)
  - Local Services

### City Recommendations
- Based on the user's selected preferences, the app recommends cities that best match their interests.
- The system uses cosine similarity to compare user preferences with city activity profiles.
- Top 5 recommended cities are provided.

### Personalized Itinerary
- For the top recommended city, the app generates a personalized itinerary.
- It uses the TripAdvisor API to fetch top attractions for each selected activity category.

### Flight Information
- The app integrates with the Amadeus API to provide flight options to the recommended city.
- Flight details include airline, price, and departure time.

### Activity Recommendations
- In addition to city recommendations, the app suggests additional activities based on the user's preferences.
- It uses a collaborative filtering approach to recommend activities similar to those selected by the user.

### Location-Based Personalization
- The app attempts to determine the user's current city based on their IP address for more relevant recommendations.

## Technical Features

- React frontend with Material-UI for a responsive and modern UI.
- Flask backend for processing user preferences and generating recommendations.
- Integration with external APIs:
  - TripAdvisor for attraction information
  - Amadeus for flight data
  - IP geolocation for user location
- Data analysis using pandas and scikit-learn for recommendation algorithms.
- CORS handling for cross-origin requests between frontend and backend.

## Getting Started



## API Keys

To run this application, you'll need to obtain API keys for:
- TripAdvisor
- Amadeus



## Contributing



## License

