import React from 'react';
import {Col, Row, Image, Container} from 'react-bootstrap';
import {Link,useParams} from 'react-router-dom';
import moment from 'moment';
import './styles.css';
import {connect} from 'react-redux';

const UserPosts = ({posts}) => {

    const {id,name} = useParams();

    return (
        <>
        <Container style={{'maxWidth':'900px','margin':'40px auto'}}>
        <h5 style={{'marginBottom':'20px','color':'#555'}}>All POST : {name.toUpperCase()}</h5>
        {posts.map((post,index)=>{
            if(post.user._id.toString() === id){
                return (
                <Row className="post-box">
                <Col lg="3" className="post-image-box">
                <Link to={`/post/${post._id}`}>
                    <Image className="post-image" src={`/images/${post.image}`} rounded />
                </Link>
                </Col>
                <Col lg="9" className="post-detail-box">
                    <h1 className="post-title">{post.title}</h1>
                    <p className="post-description">{post.description.slice(0,200)}... <Link to={`/post/${post._id}`}>Read More</Link> </p>
                    <small style={{'float':'right'}} className="post-author">Posted : {`${moment(post.createdAt).fromNow()}`}</small>
                </Col>

                <hr style={{'width':'96%'}} />
            </Row>
            
                )
            }
            
        } )}
        </Container>
        
        </>
    )
}

const mapStateToProps = state => ({
    posts:state.posts.posts
});

export default connect(mapStateToProps)(UserPosts);
