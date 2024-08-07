import React from "react";
import rateIcon from './images/rate-icon.svg';
import {Card, Col, Container, Row} from "react-bootstrap";
import {Book} from "./interfaces/recommendationInterfaces.ts";
import {useStore} from "./store/searchStore.ts";

function SearchResults() {

    const books = useStore((state) => state.filteredBooks);
    const selectedBooks = useStore((state) => state.selectedBooks);
    const setSelectedBooks = useStore((state) => state.setSelectedBooks);


    const card = (params:Book, index: number) => {
        return (
            <Col sm={6} lg={3} xl={2} className="p-1" key={index}>
                <Card border="0" style={{backgroundColor: 'white', height: '18rem'}}>
                    <Card.Body style={{border: 'none'}}>
                        <Card.Img src={params.imageLink} alt={params.title} style={{border: 'none', backgroundColor: 'white'}}/>
                    </Card.Body>
                    <Card.Footer style={{backgroundColor: 'white', border: 'none'}}>
                        <button className="btn rate-button d-flex justify-content-center align-items-center"
                        onClick={() => {
                            if(!selectedBooks.includes(params)) {
                                setSelectedBooks([...selectedBooks, params]);
                            }
                        }}
                        >
                            <img src={rateIcon} style={{paddingRight: '.5rem'}} alt="Rate Icon" />
                            Favorite
                        </button>
                    </Card.Footer>
                </Card>
            </Col>
        );
    }

    return (
        <div className="p-3" style={{border: '1px solid #DEDDDD', borderRadius: '12px', backgroundColor: 'white'}}>
            <div>
                <h3>Search Results</h3>
            </div>
            <Container>
                <Row>
                    {books.map ((book, index) => {
                        if (index < 6 ){
                            return card(book, index);
                        }
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default React.memo(SearchResults);