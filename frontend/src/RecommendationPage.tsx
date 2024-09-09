import React, {useState} from "react";
import RecommendationPageHeader from "./RecommendationPageHeader.tsx";
import SearchResults from "./SearchResults.tsx";
import {useFetchBooks} from "./hooks/useFetchBooks.ts";
import {useStore} from "./store/searchStore.ts";
import UserBookSelections from "./UserBookSelections.tsx";
import UserRecommendations from "./UserRecommendations.tsx";
import {useSubmitFetchRecommendations} from "./hooks/useSubmitFetchRecommendations.ts";
import messageIcon from './images/message.svg'
import toast from "react-hot-toast";

function RecommendationPage() {

    const books = useFetchBooks();
    const recommendedBooks = useStore((state) => state.recommendations);
    const setBooks = useStore(state => state.setBooks);
    setBooks(books);
    const handleGetRecommendations = useSubmitFetchRecommendations();
    const [recommendBooksPressed, setRecommendBooksPressed] = useState<boolean>(false);
    const handlePressGetBookRecommendations = () => {
        handleGetRecommendations();
        setRecommendBooksPressed(true);
        toast.success(`Here they come! 11 Recommendations hot and ready!`,{duration: 13000});
    }

  return (
      <div className="d-flex justify-content-center recommendation-page">
          <div className="container p-5">
              <RecommendationPageHeader />
              {recommendedBooks && recommendedBooks.length > 0 ? (
                  <UserRecommendations />
              ) : (
                  <SearchResults />
              )}
              <UserBookSelections />
              <div className="d-flex justify-content-center align-items-center pt-4">
                    <button className="btn recommendation-button d-flex" onClick={handlePressGetBookRecommendations} disabled={recommendBooksPressed}>
                        <div className="p-1">
                            <img src={messageIcon} alt="message" height="42" width="auto"></img>
                        </div>
                        <div className="p-2">Recommend Me Books!</div>
                    </button>
              </div>
          </div>
      </div>
  );
}

export default React.memo(RecommendationPage);