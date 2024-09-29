from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/preferences', methods=['POST'])
def handle_preferences():
    data = request.json
    preferences = data.get('preferences', [])
    
    # Replace this with your actual logic to generate recommendations
    recommendations = {
        "cities": ["Paris", "Tokyo", "New York"],  # Example city recommendations
        "activities": [
            {"title": "Adventure Hiking", "description": "Explore breathtaking trails.", "image": "path/to/image1.jpg"},
            {"title": "Culinary Delights", "description": "Taste the local cuisine.", "image": "path/to/image2.jpg"},
            # Add more activity recommendations here
        ]
    }

    return jsonify({"message": "Preferences received", "recommendations": recommendations})

if __name__ == '__main__':
    app.run(debug=True)
