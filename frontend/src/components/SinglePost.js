import React from 'react';
import {useParams,Link} from 'react-router-dom';
import {Row,Col,Image} from 'react-bootstrap';
import {connect} from 'react-redux';
import moment from 'moment';
import "./styles.css";

const SinglePost = ({posts}) => {

    const {id} = useParams();

    return (

        <>
        {posts.map((post,index)=>{
            if(post._id.toString() === id) {
                return (
            <Row className="post-box" style={{'justifyContent':'center','margin':'40px auto','textAlign':'center'}}>
            <Col lg="6" className="post-image-box">
            {post.image && <Image className="post-image" src={`/images/${post.image}`} rounded /> }         
                <h1 className="post-title" style={{'marginTop':'10px'}}>{post.title}</h1>
                <p className="post-description">{post.description}</p>

                <small style={{'float':'right'}} className="post-author">Posted : {`${moment(post.createdAt).fromNow()}`} (<Link to={`/user/post/${post.user._id}/${post.user.name}`}>{post.user.name.toUpperCase()}</Link>)</small>
            </Col>
        </Row>
                )
            }

        } ) }
        
        </>
    )
}

const mapStateToProps = state => ({
    posts:state.posts.posts
});

export default connect(mapStateToProps)(SinglePost) ;
