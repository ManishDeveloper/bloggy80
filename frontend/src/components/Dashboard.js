import React from 'react';
import {Container, Row, Col, Table,Image} from 'react-bootstrap';
import PostForm from './PostForm';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {deletePost} from '../redux/actions/post';

const Dashboard = ({authPost,deletePost}) => {
    const postDelete = (e) => {
        e.preventDefault();
        deletePost(e.target.id);
    }
    return (
        <Container style={{'marginTop':'40px'}}>
            <Row>
                <Col lg="3">
                <PostForm /> 
                </Col>
                <Col lg="9">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {authPost.map((post,index)=>(
                            <tr>
                            <td>{1+index}</td>
                            <td><Link to={`/post/${post._id}`}>{post.title}</Link> </td>
                            <td>{post.description.slice(0,150)}...</td>
                            <td><Image style={{'width':'70px','height':'70px'}} className="post-image" src={post.image ? `/images/${post.image}`: `/images/no-image.jpg`} rounded /></td>
                            <td>Edit</td>
                            <td><a href="javascript:void(0)" id={post._id} onClick={postDelete}> Delete</a></td>
                            </tr>
                        ))}
                    </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

const mapStateToProps = state => ({
    authPost: state.posts.authPost
})
export default connect(mapStateToProps,{deletePost})(Dashboard);
