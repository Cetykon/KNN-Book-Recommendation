import React from "react";
import {Book} from "./interfaces/recommendationInterfaces.ts";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useStore} from "./store/searchStore.ts";

function UserRecommendations() {

    const recommendedBooks = useStore((state) => state.recommendations);

    const card = (params:Book, index: number) => {
        return (
            <Col sm={6} lg={3} xl={2} className="p-1" key={index}>
                <Card border="0" style={{backgroundColor: 'white', height: '19rem'}}>
                    <Card.Body style={{border: 'none'}}>
                        <Card.Img src={params.imageLink} alt={params.title} style={{border: 'none', backgroundColor: 'white'}}/>
                    </Card.Body>
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
                    {recommendedBooks.map ((book, index) => {
                        if (index < 6 ){
                            return card(book, index);
                        }
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default React.memo(UserRecommendations);