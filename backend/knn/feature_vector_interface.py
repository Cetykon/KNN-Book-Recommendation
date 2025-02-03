from abc import ABC, abstractmethod

class VectorCreatorInterface(ABC):
    # Use @abstractmethod to ensure Python enforces its implementation when inherited
    @abstractmethod
    def average_attribute_book_array(self, booksReadArray):
        # Use the higher liked books
        pass

    @abstractmethod
    def mode_book_array_for_API(self, booksReadVectorsArray):
        # Compute the mode for each column in the given array
        pass
    
    @abstractmethod
    def custom_logic_book_array(self, booksReadVectorsArray):
        # Custom logic to compute modes and additional checks
        pass
    
    @abstractmethod
    def transpose_array(self, array):
        # Transpose the array to convert columns into rows
        pass
    
