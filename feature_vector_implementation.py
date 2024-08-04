from feature_vector_interface import VectorCreatorInterface

class VectorCreator(VectorCreatorInterface):
    def average_vector(self, booksReadArray):
        # Example implementation
        return sum(booksReadArray) / len(booksReadArray)