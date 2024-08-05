from feature_vector_interface import VectorCreatorInterface

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

# using class for testing
vector_creator = VectorCreator()

books_read_array_examples = [
    [1, 2, 3, 4],
    [4, 5, 6, 4],
    [7, 8, 9, 4]
]

modes = vector_creator.mode_vector(books_read_array_examples)
print("Modes of each column:", modes)

# The average vector doesn't make sense in the book recommendation system, but we can still use it to test results
averages = vector_creator.average_vector(books_read_array_examples)
print("Averages of each column:", averages)






