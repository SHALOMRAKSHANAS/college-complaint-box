from flask import Flask, request, jsonify
from flask_cors import CORS
import json
from datetime import datetime

app = Flask(__name__)
CORS(app)

DB_FILE = 'complaints.json'

# Load from file
def load_complaints():
    try:
        with open(DB_FILE, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return []

# Save to file
def save_complaints(complaints):
    with open(DB_FILE, 'w') as f:
        json.dump(complaints, f)

@app.route('/')
def home():
    return "✅ Server is running!"

@app.route('/complaints', methods=['GET', 'POST'])
def handle_complaints():
    complaints = load_complaints()
    if request.method == 'POST':
        data = request.get_json()
        new_complaint = {
            "id": int(datetime.now().timestamp() * 1000),
            "text": data.get('text', ''),
            "category": data.get('category', 'Other'),
            "status": "Open",
            "timestamp": datetime.now().isoformat(),
            "starred": False
        }
        complaints.append(new_complaint)
        save_complaints(complaints)
        return jsonify({"message": "✅ Complaint added"}), 201
    else:
        return jsonify(complaints)

@app.route('/complaints/<int:complaint_id>', methods=['PUT', 'DELETE'])
def handle_single_complaint(complaint_id):
    complaints = load_complaints()
    for i, complaint in enumerate(complaints):
        if complaint['id'] == complaint_id:
            if request.method == 'PUT':
                data = request.get_json()
                complaint.update(data)
                complaints[i] = complaint
                save_complaints(complaints)
                return jsonify({"message": "✅ Complaint updated"}), 200
            elif request.method == 'DELETE':
                del complaints[i]
                save_complaints(complaints)
                return jsonify({"message": "✅ Complaint deleted"}), 200
    return jsonify({"error": "❌ Complaint not found"}), 404

@app.route('/clear', methods=['POST'])
def clear_complaints():
    save_complaints([])
    return jsonify({"message": "✅ All complaints cleared"}), 200

if __name__ == '__main__':
    app.run(port=5000, debug=True)
