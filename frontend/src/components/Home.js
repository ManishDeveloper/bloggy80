import React from 'react';
import {Container, Col, Row} from 'react-bootstrap';
import Posts from './Posts';
import RightSidebar from './RightSidebar';

const Home = () => {
    return (
        <Container style={{'marginTop':'40px'}}>
            <Row>
                <Col lg="8">
                    <Posts />
                </Col>
                <Col lg="4">
                    <RightSidebar />
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
