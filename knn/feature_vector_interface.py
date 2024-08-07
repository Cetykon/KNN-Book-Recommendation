from abc import ABC, abstractmethod

class VectorCreatorInterface(ABC):
    #use @abstractmethod to ensure python enforces its implementation when its ingereted
    @abstractmethod
    def average_vector(self, booksReadArray):
        # use the higher liked books
        pass
    
    def category_vector(self):
        pass

        
    

    