// store.js
import create from 'zustand';
import {Book, Store} from "../interfaces/recommendationInterfaces.ts";

export const useStore = create<Store>(set => ({
    searchInput: '',
    setSearchInput: (input: string) => set(() => ({ searchInput: input })),
    books: [],
    setBooks: (books:Book[]) => set(() => ({ books })),
    filteredBooks: [],
    setFilteredBooks: (filteredBooks:Book[]) => set(() => ({ filteredBooks })),
    selectedBooks: [],
    setSelectedBooks: (selectedBooks:Book[]) => set(() => ({ selectedBooks })),
}));