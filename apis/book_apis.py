import csv

from flask import Flask, jsonify, request
from flask_cors import CORS

from knn.feature_vector_implementation import VectorCreator
from knn.recommend_book_system import recommend_books_ForAPI, recommend_books
from testing.getBooks_based_on_user_testing import get_user_reviews_book_dataAPI_no_user_Review

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


@app.route('/api/v1/recommend-me', methods=['POST'])
def get_recommendations():
    books = []

    if request.method == 'POST':
        try:
            data = request.get_json()
            titles = [item['title'] for item in data]
            print(data)
            vector_creator = VectorCreator()
            books_file = './datasets/author_publisher_label_encoded_books.csv'
            recommended_books = recommend_books_ForAPI(vector_creator.mode_vector_For_API_Vectors_With_No_Rating(get_user_reviews_book_dataAPI_no_user_Review(titles, books_file)), 12)

            return jsonify(recommended_books)
        except Exception as e:
            print(e)
            return jsonify({"error": str(e)})


if __name__ == '__main__':
    # Run script directly to start Flask server.
    app.run(debug=True, host="127.0.0.1", port=5000)
