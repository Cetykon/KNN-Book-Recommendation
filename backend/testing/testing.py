import pandas as pd

import sys
import os

# Get the parent directory of the current file
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from knn.feature_vector_implementation import VectorCreator
from knn.recommend_book_system import recommend_books

def get_titles_a_user_reviewed(user_id, ratings_file):
    # Load the ratings CSV file into a dataframe
    ratings_df = pd.read_csv(ratings_file)

    # Filter reviews for the specified user
    user_reviews = ratings_df[ratings_df['UserID'] == user_id]

    # Extract unique titles from the user reviews
    review_titles = user_reviews['Title'].unique()

    return review_titles.tolist()


def compare_user_review_tittles_to_recommended(recommend_tittles, user_titles):

    match_count = 0

    # List to keep track of matched titles
    matched_titles = []

    # Check each user title against recommended titles
    for title in user_titles:
        if title in recommend_tittles:
            match_count += 1
            matched_titles.append(title)

    print(f"Number of user titles in recommended titles: {match_count}")
    print("Matching titles:", matched_titles)

    
    
    
# vector_creator = VectorCreator()

# # Usage example
# user_id = 'A14OJS0VWMOSWO'  # Replace with the actual UserID
# ratings_file = '../datasets/ratings.csv'
# books_file = '../datasets/author_publisher_label_encoded_books.csv'


    
# the_post = vector_creator.mode_vector(get_user_reviews_book_data(user_id, ratings_file, books_file))

# # Custom logic should be go to not working correctly
# #the_post = vector_creator.custom_logic(get_user_reviews_book_data(user_id, ratings_file, books_file))

# recommended_books = recommend_books(book_query=the_post, k_recommendations=100)

# print("book Recommendations")
# recommend_tittles = recommended_books_To_Tittle_array(recommended_books)
# print(recommend_tittles)
# print("user Review Tittles")
# user_titles = get_user_review_titles(user_id, ratings_file)
# print(user_titles)
# compare_matches(recommend_tittles, user_titles)
