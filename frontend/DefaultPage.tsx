import useWindowWidth, {LG_SCREEN_WIDTH_PX} from "./hooks/useWindowWidth.ts";
import defaultPageBooksImageLarge from "./images/default-page-books-image.svg";
import defaultPageBooksImageSmall from "./images/books-sm-screen-image.svg";
import React from "react";

function DefaultPage() {

    const windowWidth = useWindowWidth();
    return (
        <div className="default-page" style={windowWidth > LG_SCREEN_WIDTH_PX ? {paddingTop: '4rem', minHeight: '98.5vh'} : {paddingTop: '1.3rem', minHeight: '70vh'}}>
            <div className="d-lg-flex justify-content-center align-items-center m-0 p-0 h-100">
                <div className="w-100 p-3">
                    <div className="d-flex justify-content-center align-items-center">
                        <h1 className="text-center text-white" style={windowWidth > LG_SCREEN_WIDTH_PX ? {
                            fontSize: '5rem',
                            fontWeight: '700'
                        } : {fontSize: '3rem',  fontWeight: '700'}}>Looking
                            for books?</h1>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <p className="text-center text-white"
                           style={windowWidth > LG_SCREEN_WIDTH_PX ? {fontSize: '2rem'} : {fontSize: '1.3rem'}}>
                            Our state of the art AI will recommend some to you!
                        </p>
                    </div>
                    <div className="d-flex justify-content-center align-items-center">
                        <img src={windowWidth > LG_SCREEN_WIDTH_PX ? defaultPageBooksImageLarge : defaultPageBooksImageSmall} alt="Books"
                             style={windowWidth > LG_SCREEN_WIDTH_PX ? {maxWidth: '80rem'} : {width: '80%'}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(DefaultPage);