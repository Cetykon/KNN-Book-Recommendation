import React from "react";
import RecommendationPageHeader from "./RecommendationPageHeader.tsx";
import SearchResults from "./SearchResults.tsx";

function RecommendationPage() {

    const books = [
        {title: 'Red Rising', image: 'https://images-us.bookshop.org/ingram/9780345539809.jpg?height=250&v=v2-e56070db7470400522ffc4cdaa7db42b'},
        {title: 'Red Rising', image: 'https://images-us.bookshop.org/ingram/9780345539809.jpg?height=250&v=v2-e56070db7470400522ffc4cdaa7db42b'},
        {title: 'Red Rising', image: 'https://images-us.bookshop.org/ingram/9780345539809.jpg?height=250&v=v2-e56070db7470400522ffc4cdaa7db42b'},
        {title: 'Red Rising', image: 'https://images-us.bookshop.org/ingram/9780345539809.jpg?height=250&v=v2-e56070db7470400522ffc4cdaa7db42b'},
        {title: 'Red Rising', image: 'https://images-us.bookshop.org/ingram/9780345539809.jpg?height=250&v=v2-e56070db7470400522ffc4cdaa7db42b'},
        {title: 'Red Rising', image: 'https://images-us.bookshop.org/ingram/9780345539809.jpg?height=250&v=v2-e56070db7470400522ffc4cdaa7db42b'},
        {title: 'Red Rising', image: 'https://images-us.bookshop.org/ingram/9780345539809.jpg?height=250&v=v2-e56070db7470400522ffc4cdaa7db42b'}
    ]

  return (
      <div className="d-flex justify-content-center recommendation-page">
          <div className="container p-5">
              <RecommendationPageHeader/>
              <SearchResults books={books}/>
          </div>
      </div>
  );
}

export default React.memo(RecommendationPage);