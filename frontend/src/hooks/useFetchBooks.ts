import {useEffect, useState} from "react";
import {Book} from "../interfaces/recommendationInterfaces.ts";

export function useFetchBooks() {

    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch('http://localhost:5000/api/v1/books',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const data = await response.json();
            setBooks(data);
        }
        fetchBooks();
    },[]);

    return books;
}