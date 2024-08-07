import React from "react";
import booksIcon from "./images/books.svg";

function NavBar () {
    return (
        <div className="d-flex justify-content-center align-items-center m-0 p-0" style={{backgroundColor: 'white'}}>
            <h3 className="d-flex justify-content-center align-items-center pt-3 pb-3 m-0"
                style={{fontWeight: 'bolder', color: '#32335E'}}>
                <img src={booksIcon} alt="Books" className="px-2" style={{height: '2.3rem'}}/>
                Page Turners
            </h3>
        </div>
    );
}

export default React.memo(NavBar);