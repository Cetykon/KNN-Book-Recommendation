
export interface Book {
    title: string;
    AverageRating: number;
    imageLink?: string;
}

export interface BookForRecommendation {
    title: string;
}

export interface Store {
    searchInput: string;
    setSearchInput: (input: string) => void;
    books: Book[];
    setBooks: (books:Book[]) => void;
    filteredBooks: Book[];
    setFilteredBooks: (filteredBooks:Book[]) => void;
    selectedBooks: Book[];
    setSelectedBooks: (selectedBooks:Book[]) => void;
    recommendations: Book[];
    setRecommendations: (recommendations:Book[]) => void;
}