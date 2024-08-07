import {useStore} from "../store/searchStore.ts";
import {BookForRecommendation} from "../interfaces/recommendationInterfaces.ts";

export function useGetRecommendations() {

    const selectedBooks = useStore(state => state.selectedBooks);
    const setRecommendations = useStore(state=> state.setRecommendations);
    const setFilteredBooks = useStore(state => state.setFilteredBooks);


    const fetchRecommendations = async () => {
        try {
        const response = await fetch('http://localhost:5000/api/v1/recommend-me',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedBooks.map((book: BookForRecommendation) => ({title: book.title})))
            });
        const data = await response.json();
        if (response.ok) {
            setRecommendations(data.recommendations);
            setFilteredBooks([]);
        } else {
            alert('Unable to get recommendations. Try again later.');
        }
        } catch (error) {
            alert('Unable to get recommendations. Try again later.');
        }

    }
    return {fetchRecommendations};

}