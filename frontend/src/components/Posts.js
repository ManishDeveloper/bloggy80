import React,{useState} from 'react';
import {Col, Row, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import moment from 'moment';
import './styles.css';
import {connect} from 'react-redux';

const Posts = ({posts}) => {

    return (
        <>
        {posts.map((post,index)=>(
            <Row className="post-box">
            <Col lg="3" className="post-image-box">
            <Link to={`/post/${post._id}`}>
                <Image className="post-image" src={`/images/${post.image}`} rounded />
            </Link>
            </Col>
            <Col lg="9" className="post-detail-box">
                <h1 className="post-title">{post.title}</h1>
                <p className="post-description">{post.description.slice(0,200)}... <Link to={`/post/${post._id}`}>Read More</Link> </p>
                <small style={{'float':'right'}} className="post-author">Posted : {`${moment(post.createdAt).fromNow()}`} (<Link to={`/user/post/${post.user._id}/${post.user.name}`}>{post.user.name.toUpperCase()}</Link>)</small>
            </Col>

            <hr style={{'width':'96%'}} />
        </Row>

        ))}
        
        </>
    )
}

const mapStateToProps = state => ({
    posts:state.posts.posts.reverse()
});

export default connect(mapStateToProps)(Posts);
