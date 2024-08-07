
export interface Book {
    title: string;
    imageLink?: string;
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
}