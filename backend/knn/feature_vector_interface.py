from abc import ABC, abstractmethod

class VectorCreatorInterface(ABC):
    # Use @abstractmethod to ensure Python enforces its implementation when inherited
    @abstractmethod
    def average_attribute(self, booksReadArray):
        # Use the higher liked books
        pass
    
    @abstractmethod
    def transpose_array(self, array):
        # Transpose the array to convert columns into rows
        pass
    
    @abstractmethod
    def mode_array_for_API(self, booksReadVectorsArray):
        # Compute the mode for each column in the given array
        pass
    
    @abstractmethod
    def custom_logic(self, booksReadVectorsArray):
        # Custom logic to compute modes and additional checks
        pass
