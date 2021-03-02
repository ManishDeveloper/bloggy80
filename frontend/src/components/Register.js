import React,{useState} from 'react';
import {Form,Button,Alert} from 'react-bootstrap';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {registerUser} from '../redux/actions/auth';

const Register = ({isAuthenticated,registerUser, alertMsg : {alertType,msg}}) => {

  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  const {name, email, password, password2} = formData;

  if(isAuthenticated) {
    return <Redirect to="/" />

  }

  const changeFields = (e) => {
      setFormData({...formData,[e.target.name]:e.target.value});
  }

  const submitForm = (e) => {
    e.preventDefault();
    
    if(password !== password2){
      alert('Confirm Password not Matched!');
      return false;
    }
    registerUser(name, email, password);

  }
    return (
        <Form className="login-form" onSubmit={submitForm} >
<Form.Group controlId="formBasicEmail">
    <Form.Label>Your Name</Form.Label>
    <Form.Control type="text" placeholder="Enter your Name" name="name" value={name} onChange={changeFields} />
  </Form.Group>

  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter your Email" name="email" value={email} onChange={changeFields} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Enter your Password" name="password" value={password} onChange={changeFields} />
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Confirm Password</Form.Label>
    <Form.Control type="password" placeholder="Password" name="password2" value={password2} onChange={changeFields} />
  </Form.Group>

  <Form.Group controlId="formBasicCheckbox">
    <Form.Text className="text-muted">
      Already Register? <Link to="/login">Login</Link>
    </Form.Text>
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
  {alertType && <Alert variant={alertType} className="my-3 text-center">
    {msg}
  </Alert>}
</Form>
    )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  alertMsg:state.alertMsg
})

export default connect(mapStateToProps, {registerUser})(Register);
