import {Book} from "./interfaces/recommendationInterfaces.ts";
import {Card, Col, Container, Row} from "react-bootstrap";
import React from "react";
import {useStore} from "./store/searchStore.ts";

function UserBookSelections() {
    const selectedBooks = useStore((state) => state.selectedBooks);
    const card = (params:Book, index: number) => {
        return (
            <Col sm={6} lg={3} xl={2} className="p-2" key={index}>
                <Card border="0" style={{backgroundColor: 'white',height: '16rem'}}>
                    <Card.Img src={params.imageLink} alt={params.title} style={{border: 'none', backgroundColor: 'white'}}/>
                </Card>
            </Col>
        );
    }

    return (
        <div className="pt-4">
            <div className="p-3" style={{border: '1px solid #DEDDDD', borderRadius: '12px', backgroundColor: 'white'}}>
                <div>
                    <h3>Your Selections</h3>
                </div>
                <Container>
                    <Row>
                        {selectedBooks.map ((book, index) => {
                            return card(book, index);
                        })}
                    </Row>
                </Container>
            </div>
        </div>

    );
}

export default React.memo(UserBookSelections);