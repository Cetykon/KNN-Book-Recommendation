import React from "react";
import image from "./images/stack-of-books.svg";
import magnifyingGlass from "./images/magnifying-glass.svg";
import {useStore} from "./store/searchStore.ts";
import useSearchForBooks from "./hooks/useSearchForBooks.ts";

function RecommendationPageHeader() {

    const searchInput = useStore(state => state.searchInput);
    const setSearchInput = useStore(state => state.setSearchInput);
    const handleSearch = useSearchForBooks();

    return (
        <div className="row">
            <div className="col-12 col-lg-6 p-5 d-flex align-items-center justify-content-center">
                <img src={image} alt="Recommendation Page" className="m-0 p-0"/>
            </div>
            <div className="col-12 col-lg-6 d-flex align-items-center">
                <div className="p-3">
                    <div className="d-flex justify-content-center pb-3 text-center">
                        <h1>Get Recommendations</h1>
                    </div>
                    <div className="d-flex justify-content-center text-center">
                        <p style={{fontSize: '1.3rem'}}>
                            Add some books you like, and we’ll provide you with additional recommendations.
                        </p>
                    </div>
                    <div className="d-flex justify-content-center pt-3">
                        <div className="input-icon w-100">
                            <img src={magnifyingGlass} alt="Magnifying Glass" className="input-class-name"/>
                            <input type="text" className="form-control" placeholder="Search for a book ..."
                                   style={{borderRadius: '2rem', height: '3.2rem', textIndent: '1rem'}}
                                      value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                                   onKeyDown={event => handleSearch.handleSearch(event)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default React.memo(RecommendationPageHeader);