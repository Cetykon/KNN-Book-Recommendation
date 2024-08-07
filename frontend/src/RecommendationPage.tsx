import React from "react";
import RecommendationPageHeader from "./RecommendationPageHeader.tsx";
import SearchResults from "./SearchResults.tsx";
import {useFetchBooks} from "./hooks/useFetchBooks.ts";
import {useStore} from "./store/searchStore.ts";
import UserBookSelections from "./UserBookSelections.tsx";
import UserRecommendations from "./UserRecommendations.tsx";
import {useSubmitFetchRecommendations} from "./hooks/useSubmitFetchRecommendations.ts";

function RecommendationPage() {

    const books = useFetchBooks();
    const recommendedBooks = useStore((state) => state.recommendations);
    const setBooks = useStore(state => state.setBooks);
    setBooks(books);
    const handleGetRecommendations = useSubmitFetchRecommendations();

  return (
      <div className="d-flex justify-content-center recommendation-page">
          <div className="container p-5">
              <RecommendationPageHeader />
              <SearchResults />
              {recommendedBooks && recommendedBooks.length > 0 && (
                  <UserRecommendations />
              )}
              <UserBookSelections />
              <div className="d-flex justify-content-center align-items-center pt-4">
                    <button className="btn btn-primary" onClick={handleGetRecommendations}>
                        Get Recommendations
                    </button>
              </div>
          </div>
      </div>
  );
}

export default React.memo(RecommendationPage);