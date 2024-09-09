import React from "react";
import rateIcon from './images/rate-icon.svg';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Book} from "./interfaces/recommendationInterfaces.ts";
import {useStore} from "./store/searchStore.ts";
import starFilled from './images/star-filled.svg'
import starHalf from './images/star-half.svg';
import toast from "react-hot-toast";

function SearchResults() {

    const books = useStore((state) => state.filteredBooks);
    const selectedBooks = useStore((state) => state.selectedBooks);
    const setSelectedBooks = useStore((state) => state.setSelectedBooks);

    const displayStars = (book: Book) => {

        let total = book.AverageRating * 100;
        let totalFullStars = Math.trunc(total/20);

        return (
            <div className="pt-2 pb-2 d-flex justify-content-center">
                {Array.from({ length: totalFullStars }, (_, index) => (
                    <img src={starFilled} alt="star" key={index}></img>
                ))}
                {total % 20 >= 10 ? (<img src={starHalf} alt="star"></img>) : (<></>)}
            </div>
        );
    }

    const card = (params:Book, index: number) => {
        return (
            <Col sm={6} lg={3} xl={2} className="p-1" key={index}>
                <Card border="0" style={{backgroundColor: 'white'}}>
                    <Card.Body style={{border: 'none', height: '16rem'}}>
                        {selectedBooks.filter(book => book.title === params.title).length > 0 ? (
                            <Card.Img src={params.imageLink} alt={params.title} style={{filter: 'grayscale(100%)'}}/>
                            ) : (
                            <Card.Img src={params.imageLink} alt={params.title} style={{border: 'none', backgroundColor: 'white'}}/>
                        )}

                    </Card.Body>
                    <Card.Footer style={{backgroundColor: 'white', border: 'none', paddingBottom: '1rem', height: '6rem'}}>
                        {displayStars(params)}
                        {selectedBooks.filter(book => book.title === params.title).length > 0 ? (
                        <div className="p-2 d-flex justify-content-center" style={{fontSize: '1.3rem'}}>
                            Favorited
                        </div>) : (
                            <button className="btn favorite-button d-flex justify-content-center align-items-center"
                                    onClick={() => {
                                        if (!selectedBooks.includes(params)) {
                                            setSelectedBooks([...selectedBooks, params]);
                                            toast.success(`${params.title} has been added to your favorites!`,{duration: 3000});
                                        }
                                    }}
                            >
                                <img src={rateIcon} style={{paddingRight: '.5rem'}} alt="Rate Icon"/>
                                Favorite
                            </button>
                        )}
                    </Card.Footer>
                </Card>
            </Col>
        );
    }

    return (
        <div className="p-4" style={{border: '1px solid #DEDDDD', borderRadius: '12px', backgroundColor: 'white'}}>
            <div>
                <h3>Search Results</h3>
            </div>
            <Container>
                <Row>
                    {books.map((book, index) => {
                        if (index < 6) {
                            return card(book, index);
                        }
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default React.memo(SearchResults);