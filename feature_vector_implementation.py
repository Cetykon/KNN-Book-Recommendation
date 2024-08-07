from typing import Counter
from feature_vector_interface import VectorCreatorInterface
from getBooks_based_on_user_testing import get_user_reviews_book_data

class VectorCreator(VectorCreatorInterface):
    
    # note: I will make a combination of mode and average to get an ideal vector method
    # Also I would like to also give recommendation based on category if enough data is available
    
    def mode_vector(self, booksReadVectorsArray):
        
        # Transpose the array to convert columns into rows
        # this way we can easily iterate over each column, and even allowing us to use math functions
        transposed_array = list(zip(*booksReadVectorsArray))
        
        modes = []
        
        for column in transposed_array:
            # Using a dictionary to count the frequency of each element in each column
            frequency = {}
            
            # Count the frequency of each element in the column
            for value in column:
                if value in frequency:
                    frequency[value] += 1
                else:
                    frequency[value] = 1
            
            # Find the mode (the element with the highest frequency)
            mode = max(frequency, key=frequency.get)
            modes.append(mode)
        
        # Dropping the last item as it is the user rating
        modes = modes[:-1]
        
        return modes

    def average_vector(self, array):
        # Transpose the array to convert columns into rows
        transposed_array = list(zip(*array))
        
        averages = []
        
        for column in transposed_array:
            # Calculate the average for the column
            column_average = sum(column) / len(column)
            # add the column average to the array/vector
            averages.append(column_average)
        
        
        
        return averages
    
    # Make me a function that add the mode of the first 5 columns to an array, 
    # then check the last value of the array if it's bigger then 3, 
    # the go on column 6 find if 1 has appeared more than 3 time is it has add it to the array, 
    # do this till you reach the last value. 
    def custom_logic(self, booksReadVectorsArray):
        # Transpose the array to convert columns into rows
        transposed_array = list(zip(*booksReadVectorsArray))
        
        modes = []
        
        # Calculate mode for the first 5 columns
        for i in range(min(5, len(transposed_array))):
            frequency = Counter(transposed_array[i])
            mode = frequency.most_common(1)[0][0]
            modes.append(mode)
        
        print("Modes for first 5 columns:", modes)  # Debug statement
        
        # Check the last value of the modes array
        if modes and modes[-1] > 1:
            # Iterate over columns from index 5 up to the second to last column
            for i in range(5, len(transposed_array) - 1):
                frequency = Counter(transposed_array[i])
                if frequency.get(1, 0) > 3:
                    modes.append(1)
                else:
                    modes.append(0)
        else:
            modes.append(0)
        
        
        print("Final modes array:", modes)  # Debug statement
        
        return modes

# using class for testing
vector_creator = VectorCreator()

# books_read_array_examples = [
#     [1, 2, 3, 4],
#     [4, 5, 6, 4],
#     [7, 8, 9, 4]
# ]

# Usage example
user_id = 'A14OJS0VWMOSWO'  # Replace with the actual UserID
ratings_file = 'ratingsV3.csv'
books_file = 'author_publisher_label_encoded_books.csv'

modes = vector_creator.mode_vector(get_user_reviews_book_data(user_id, ratings_file, books_file))
print("Modes of each column:", modes)

# Calculate modes and perform checks
# modes_and_checks = vector_creator.add_modes_and_check(get_user_reviews_book_data(user_id, ratings_file, books_file))
# print("Modes and checks result:", modes_and_checks)

# The average vector doesn't make sense in the book recommendation system, but we can still use it to test results
# averages = vector_creator.average_vector(books_read_array_examples)
# print("Averages of each column:", averages)






