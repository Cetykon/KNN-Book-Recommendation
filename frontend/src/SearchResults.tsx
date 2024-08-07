import React from "react";
import rateIcon from './images/rate-icon.svg';
import {Card, Col, Container, Row} from "react-bootstrap";

function SearchResults(params: {books: {title: string, image: string}[]}) {

    const card = (params:{image: string, title: string}, index: number) => {
        return (
            <Col sm={6} lg={3} xl={2} className="p-2" key={index}>
                <Card border="0" style={{backgroundColor: 'white'}}>
                    <Card.Img src={params.image} alt={params.title} style={{border: 'none', backgroundColor: 'white'}}/>
                    <Card.Footer style={{backgroundColor: 'white'}}>
                        <button className="btn rate-button d-flex justify-content-center align-items-center">
                            <img src={rateIcon} style={{paddingRight: '.5rem'}} alt="Rate Icon" />
                            Rate
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
                    {params.books.map ((book, index) => {
                        return card(book, index);
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default React.memo(SearchResults);