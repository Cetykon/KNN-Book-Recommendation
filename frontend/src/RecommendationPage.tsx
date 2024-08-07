import React from "react";
import RecommendationPageHeader from "./RecommendationPageHeader.tsx";
import SearchResults from "./SearchResults.tsx";
import {useFetchBooks} from "./hooks/useFetchBooks.ts";
import {useStore} from "./store/searchStore.ts";
import UserBookSelections from "./UserBookSelections.tsx";

function RecommendationPage() {

    const books = useFetchBooks();

    const setBooks = useStore(state => state.setBooks);
    setBooks(books);

  return (
      <div className="d-flex justify-content-center recommendation-page">
          <div className="container p-5">
              <RecommendationPageHeader />
              <SearchResults />
              <UserBookSelections />
              <div className="d-flex justify-content-center align-items-center pt-4">
                    <button className="btn btn-primary">
                        Get Recommendations
                    </button>
              </div>
          </div>
      </div>
  );
}

export default React.memo(RecommendationPage);