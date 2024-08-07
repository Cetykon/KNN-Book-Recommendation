import React from "react";
import {Book, BookForRecommendation} from "./interfaces/recommendationInterfaces.ts";
import {Card, Col, Container, Row} from "react-bootstrap";
import {useStore} from "./store/searchStore.ts";

function UserRecommendations() {

    const recommendedBooks = useStore((state) => state.recommendations);

    const card = (params:BookForRecommendation, index: number) => {
        return (
            <p>
                {(index) + " - " + params.title}
            </p>
        );
    }

    return (
        <div className="p-3" style={{border: '1px solid #DEDDDD', borderRadius: '12px', backgroundColor: 'white'}}>
            <div>
                <h3 className="pt-2 pb-3">Our Top 11 Recommendations</h3>
            </div>
            <Container>
                <Row>
                    {recommendedBooks.map ((book, index) => {
                        if(index != 0) {
                            return card(book, index);
                        }
                    })}
                </Row>
            </Container>
        </div>
    );
}

export default React.memo(UserRecommendations);