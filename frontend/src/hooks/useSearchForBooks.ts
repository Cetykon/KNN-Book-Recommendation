import {useStore} from "../store/searchStore.ts";
import React from "react";
import {Book} from "../interfaces/recommendationInterfaces.ts";

export default function useSearchForBooks() {
    const searchInput = useStore(state => state.searchInput);
    const setFilteredBooks = useStore(state => state.setFilteredBooks);
    const books = useStore (state => state.books);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const filteredBooks = books.filter((book: Book) => book.title.toLowerCase().includes(searchInput.toLowerCase()));
            setFilteredBooks(filteredBooks);
        }
    }
    return {handleSearch};
}