from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD
import requests
from flask_cors import CORS

app = Flask(__name__)
# CORS(app, origins=["*"])

# TripAdvisor and SkyScanner API keys
TRIPADVISOR_API_KEY = 'C335434239844AB38B263FB395EC4A3E'
AMADEUS_API_KEY = '2EkhPLIlrYp3tVH7uqtGzty6q1gUQWGx'
AMADEUS_API_SECRET = 'y5Ff1mNZGlc34lX6'

#dataset cleaning
df = pd.read_excel("backend/Social_Science_Dataset.xlsx")
df.columns = ['user'] + [f'category {i}' for i in range(1, 26)]
df.drop(columns=['category 25'], inplace=True)
df.drop(index=0, inplace=True)
df.reset_index(drop=True, inplace=True)

# Convert all columns except 'user' to numeric, coercing errors to NaN
for col in df.columns:
    if col != 'user':
        df[col] = pd.to_numeric(df[col], errors='coerce')

cleaned_df = df.replace(0, np.nan)
numeric_cols = cleaned_df.select_dtypes(include=[np.number]).columns
cleaned_df[numeric_cols] = cleaned_df[numeric_cols].fillna(cleaned_df[numeric_cols].mean())
cleaned_df.rename(columns={'user': 'User', 'category 1': 'churches', 'category 2': 'resorts',
                           'category 3': 'beaches', 'category 4': 'parks',
                           'category 5': 'theatres', 'category 6': 'museums',
                           'category 7': 'malls', 'category 8': 'zoos', 'category 9': 'restaurants',
                           'category 10': 'pubs/bars', 'category 11': 'local services', 
                           'category 12': 'burger/pizza shops', 'category 13': 'hotels/other lodgings',
                           'category 14': 'juice bars', 'category 15': 'art galleries', 
                           'category 16': 'dance clubs', 'category 17': 'swimming pools', 
                           'category 18': 'gyms', 'category 19': 'bakeries', 
                           'category 20': 'beauty & spas', 'category 21': 'cafes', 
                           'category 22': 'view points', 'category 23': 'monuments', 
                           'category 24': 'gardens'}, inplace=True)

X = cleaned_df.drop(columns=["User"])
mean_values = X.mean(axis=0)
discounted_df = X.copy()

for column in discounted_df.columns:
    discounted_df[column] = discounted_df[column].where(discounted_df[column] != mean_values[column] - 0.01)

normalized_discounted_df = discounted_df.fillna(0)

item_similarity = cosine_similarity(normalized_discounted_df.T)
item_similarity_df = pd.DataFrame(item_similarity, index=X.columns, columns=X.columns)

# Modify the city_activity_mapping
city_activity_mapping = {
    'Paris':    [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    'Barcelona': [1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    'Moscow':    [0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1]
    # Add more cities as needed, ensuring each has 24 values (one for each activity)
}

cities = list(city_activity_mapping.keys())
city_activity_matrix = np.array(list(city_activity_mapping.values()))

activities = ['churches', 'resorts', 'beaches', 'parks', 'theatres', 'museums', 'malls', 'zoos', 
              'restaurants', 'pubs/bars', 'local services', 'burger/pizza shops', 'hotels/other lodgings',
              'juice bars', 'art galleries', 'dance clubs', 'swimming pools', 'gyms', 'bakeries',
              'beauty & spas', 'cafes', 'view points', 'monuments', 'gardens']

#Get user location city
def get_user_city(ip):
    url = f"http://ip-api.com/json/{ip}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        if data['status'] == 'success':
            return data['city']
    return 'Chapel Hill'

#TripAdvisor API Call - fetches top attraction
def get_top_attraction(city, category):
    url = f"https://api.tripadvisor.com/api/partner/2.0/location/{city}/attractions"
    headers = {'Authorization': f'Bearer {TRIPADVISOR_API_KEY}'}
    params = {
        'category': category,
        'limit': 1  
    }
    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if data['data']:
            top_attraction = data['data'][0]
            return top_attraction['name']
    return None

#flight getter - skyscanner API call
def get_flights(origin, destination):
    auth_url = 'https://test.api.amadeus.com/v1/security/oauth2/token'
    auth_data = {
        'grant_type': 'client_credentials',
        'client_id': AMADEUS_API_KEY,
        'client_secret': AMADEUS_API_SECRET,
    }
    auth_response = requests.post(auth_url, data=auth_data)
    if auth_response.status_code != 200:
        return []

    access_token = auth_response.json().get('access_token')

    url = f'https://test.api.amadeus.com/v2/shopping/flight-offers'
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {
        'origin': origin,
        'destination': destination,
        'departureDate': '2024-10-04',
        'adults': 1,
        'maxPrice': 1000
    }
    response = requests.get(url, headers=headers, params=params)
    if response.status_code == 200:
        return response.json().get('data', [])
    return []


#City Recommender
@app.route('/recommend_cities', methods=['POST'])
def recommend_cities():
    user_ip = request.headers.get('X-Forwarded-For', request.remote_addr)
    user_city = get_user_city(user_ip)
    user_data = request.json
    selected_activities = user_data.get('activities', [])
    
    user_vector = np.zeros(len(activities))
    for activity in selected_activities:
        if activity in activities:
            user_vector[activities.index(activity)] = 1
    
    city_similarity = cosine_similarity([user_vector], city_activity_matrix)[0]
    similar_cities_indices = city_similarity.argsort()[-5:][::-1]
    recommended_cities = [cities[i] for i in similar_cities_indices]

    top_city = recommended_cities[0]
    itinerary = {activity: get_top_attraction(top_city, activity) for activity in selected_activities}
    flight_info = get_flights(user_city, top_city)
    
    return jsonify({
        'recommended_cities': recommended_cities,
        'itinerary': itinerary,
        'flight_info': flight_info
        })

#Activity recommendation
@app.route('/recommend_activities', methods=['POST'])
def recommend_activities():
    user_data = request.json
    selected_activities = user_data.get('activities', [])
    
    user_input_activities = [activity.lower() for activity in selected_activities]
    activity_similarity_df = item_similarity_df.rename(str.lower, axis='columns').rename(str.lower, axis='index')

    activity_scores = pd.Series(0, index=activity_similarity_df.columns)
    for activity in user_input_activities:
        if activity in activity_similarity_df.index:
            activity_scores += activity_similarity_df[activity]
    
    recommended_activities = activity_scores.drop(user_input_activities, errors='ignore').sort_values(ascending=False).head(5)
    
    return jsonify({'recommended_activities': recommended_activities.index.tolist()})


@app.route('/api/preferences', methods=['POST'])
# @cross_origin()
def process_preferences():
    user_preferences = request.json.get('preferences', [])
    # user_preferences = request.get_json()
    # print(user_preferences)
    
    # Call the existing functions to get recommendations
    city_recommendations = recommend_cities()
    activity_recommendations = recommend_activities()
    
    return jsonify({
        'recommended_cities': city_recommendations['recommended_cities'],
        'recommended_activities': activity_recommendations['recommended_activities']
    })

if __name__ == '__main__':
    app.run(debug=True)
