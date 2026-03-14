from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Сервер запущен! Привет от бэкенда."

@app.route('/api/status')
def status():
    return jsonify({"status": "ok", "message": "Бэкенд готов к работе"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
    
