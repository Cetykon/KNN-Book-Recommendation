import csv

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
# for all routes
CORS(app)


@app.route('/api/v1/books', methods=['GET'])
def get_books():
    books = []

    if request.method == 'GET':
        try:
            with open('./datasets/books.csv', 'r', encoding='utf-8') as md:
                csv_reader = csv.reader(md)
                next(csv_reader)

                for row in csv_reader:
                    books.append({"title": row[0], "imageLink": row[6]})

            return jsonify(books)
        except Exception as e:
            return jsonify({"error": str(e)})




if __name__ == '__main__':
    # Run script directly to start Flask server.
    app.run(debug=True, host="127.0.0.1", port=5000)
