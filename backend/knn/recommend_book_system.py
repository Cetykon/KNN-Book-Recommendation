import csv

from knn.knn_implementation import euclidean_distance, knn
from knn.feature_vector_implementation import VectorCreator

def get_book_data_from_csv(file_path):
    raw_book_data = []
    
    # Using the CSV reader keeps us from skipping rows that have extra commas
    with open(file_path, 'r', encoding='utf-8') as md:
        csv_reader = csv.reader(md)
        # Discard the first line (headings)
        next(csv_reader)

        # Read the data into memory
        for row in csv_reader:
            raw_book_data.append(row)
    
    return raw_book_data

def convert_string_columns_to_numbers(raw_book_data):
    books_recommendation_data = []
    for row in raw_book_data:
        data_row = list(map(float, row[1:]))
        books_recommendation_data.append(data_row)
        
    return books_recommendation_data
    

def recommend_books(book_query, k_recommendations):
    
    raw_book_data = get_book_data_from_csv('./datasets/author_publisher_label_encoded_books.csv')
    # converting read in as strings to numbers
    books_recommendation_data = convert_string_columns_to_numbers(raw_book_data)
    
    # Use the KNN algorithm to get the 5 books that are most
    # similar to The Post.
    recommendation_indices, _ = knn(
        books_recommendation_data, book_query, k=k_recommendations,
        distance_fn=euclidean_distance, choice_fn=lambda x: None
    )

    book_recommendations = []
    for _, index in recommendation_indices:
        book_recommendations.append(raw_book_data[index])

    return book_recommendations


def recommend_books_ForAPI(book_query, k_recommendations):
    
    raw_book_data = get_book_data_from_csv('./datasets/author_publisher_label_encoded_books.csv')
    # converting read in as strings to numbers
    books_recommendation_data = books_recommendation_data = convert_string_columns_to_numbers(raw_book_data)
    
    # Use the KNN algorithm to get the 5 books that are most
    # similar to The Post.
    recommendation_indices, _ = knn(
        books_recommendation_data, book_query, k=k_recommendations,
        distance_fn=euclidean_distance, choice_fn=lambda x: None
    )

    book_recommendations = []
    for _, index in recommendation_indices:
        if index < len(raw_book_data):
            book_recommendations.append(raw_book_data[index])
        else:
            print("Warning: Index out of bounds")

    return book_recommendations


# if __name__ == '__main__':

#     vector_creator = VectorCreator()

#     user_id = 'A14OJS0VWMOSWO'  # Replace with the actual UserID
#     ratings_file = './datasets/ratings.csv'
#     books_file = './datasets/author_publisher_label_encoded_books.csv'

#     #the_post = [19443,1692,0.915000,0.000658,0.815385,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0] # feature vector for The Post
#     the_post = vector_creator.mode_vector(get_user_reviews_book_data(user_id, ratings_file, books_file))

#     # Custom logic should be go to not working correctly
#     #the_post = vector_creator.custom_logic(get_user_reviews_book_data(user_id, ratings_file, books_file))

#     recommended_books = recommend_books(book_query=the_post, k_recommendations=5)

#     print(str(the_post))
#     # Print recommended movie titles
#     for recommendation in recommended_books:
#         print(recommendation[0])
