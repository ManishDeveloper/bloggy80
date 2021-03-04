import React,{useState} from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import {addPost} from '../redux/actions/post';

const PostForm = ({addPost,alertMsg : {alertType,msg}}) => {

    const [formData, setFormData] = useState({
        title:'',
        description:'',
        image:''
    });

    const {title, description, image} = formData;

    const changeFields = (e) => {

        console.log(e.target.files)

        if(e.target.files){
            setFormData({...formData, [e.target.name]:e.target.files[0]});   
        }
        else {
            setFormData({...formData, [e.target.name]:e.target.value});
        }
                
    }

    const submitForm = (e) => {
        e.preventDefault();

        let sendData = new FormData();
        sendData.append('title',title);
        sendData.append('description',description);
        sendData.append('image',image);

        addPost(sendData);

        setFormData({title:'',description:'',image:''});
        
    }

    return (
        <>
<Form className="login-form" style={{'margin':'0','width':'auto'}} onSubmit={submitForm} encType="multipart/form-data" >
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Post Title</Form.Label>
    <Form.Control type="text" placeholder="Post Title" name="title" value={title} onChange={changeFields} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Post Image (Optional)</Form.Label>
    <Form.Control type="file" placeholder="Post Image" name="image" onChange={changeFields} />
  </Form.Group>
  <Form.Group controlId="exampleForm.ControlTextarea">
    <Form.Label>Post Description</Form.Label>
    <Form.Control as="textarea" rows={3} name="description" value={description} onChange={changeFields} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  {alertType && <Alert variant={alertType} className="my-3 text-center">
    {msg}
  </Alert>}
  
</Form> 
        </>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    alertMsg:state.alertMsg
  });

export default connect(mapStateToProps,{addPost})(PostForm);
