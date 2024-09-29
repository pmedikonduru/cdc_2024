from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD


app = Flask(__name__)

df = pd.read_excel("/Users/pranav_medikonduru/Downloads/Social_Science_Dataset.xlsx")
df.columns = ['user'] + [f'category {i}' for i in range(1, 26)]
df.drop(columns=['category 25'], inplace=True)
df.drop(index=0, inplace=True)
df.reset_index(drop=True, inplace=True)
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

city_activity_mapping = {
    'Paris': [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
    'Barcelona': [1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1],
    # add more OR find api
}

cities = list(city_activity_mapping.keys())
city_activity_matrix = np.array(list(city_activity_mapping.values()))

activities = ['churches', 'resorts', 'beaches', 'parks', 'theatres', 'museums', 'malls', 'zoos', 
              'restaurants', 'art galleries', 'dance clubs', 'swimming pools', 'gyms', 'bakeries',
              'beauty & spas', 'cafes', 'view points', 'monuments', 'gardens', 'gardens']

#City Recommender
@app.route('/recommend_cities', methods=['POST'])
def recommend_cities():
    user_data = request.json
    selected_activities = user_data.get('activities', [])
    
    user_vector = np.zeros(len(activities))
    for activity in selected_activities:
        if activity in activities:
            user_vector[activities.index(activity)] = 1
    
    city_similarity = cosine_similarity([user_vector], city_activity_matrix)[0]
    similar_cities_indices = city_similarity.argsort()[-5:][::-1]
    recommended_cities = [cities[i] for i in similar_cities_indices]
    
    return jsonify({'recommended_cities': recommended_cities})

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


if __name__ == '__main__':
    app.run(debug=True)
