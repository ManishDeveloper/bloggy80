import React,{useState} from 'react';
import {Form,Button,Alert} from 'react-bootstrap';
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import {loginUser} from '../redux/actions/auth';
import {Redirect} from 'react-router-dom';
import PageLoader from './PageLoader';

const Login = ({loginUser,auth:{isAuthenticated,loading},alertMsg : {alertType,msg}}) => {

  let [formData, setFormData] = useState({
    email:'',
    password:''
  });

  const {email, password} = formData;

  const changeFields = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value});

  }
  const submitForm = (e) => {
    e.preventDefault();

    loginUser(email, password);

  }

  if(isAuthenticated) {
    return <Redirect to="/" />
  }

  const loginForm = (<Form className="login-form" onSubmit={submitForm} >
    <h3>Login User</h3>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={changeFields} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={changeFields} />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
  <Form.Text className="text-muted">
      Register not yet? <Link to="/register">Register</Link>
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  {alertType && <Alert variant={alertType} className="my-3 text-center">
    {msg}
  </Alert>}
  
</Form>);


    return (
      <>
      {loading ? <PageLoader /> : loginForm}
      </>
      
    )    
}


const mapStateToProps = state => ({
  auth: state.auth,
  alertMsg:state.alertMsg
});

export default connect(mapStateToProps,{loginUser})(Login);
