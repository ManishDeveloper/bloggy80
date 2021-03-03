import React from 'react';
import {Col, Row, Image} from 'react-bootstrap';
import Image1 from '../images/1614738175376pic-3.png'
import './styles.css';

const Posts = () => {
    return (
        <Row className="post-box">
            <Col lg="3">
            <Image className="post-image" src={Image1} rounded />
            </Col>
            <Col lg="9">
                <h1 className="post-title">This is Post Title</h1>
                <small className="post-author">FEBRUARY 27, 2021 BY GOPAL MISHRA</small>
                <p className="post-description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus itaque voluptate deserunt impedit voluptas praesentium explicabo, deleniti consequatur illum aliquam odit in quisquam facere dolores corrupti magnam at, fuga minus?</p>
            </Col>
        </Row>
    )
}

export default Posts;
