import React,{useEffect} from 'react';
import Menubar from './components/Menubar';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import Register from './components/Register';
import setAuthToken from './utils/setAuthToken';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import { loadUser } from './redux/actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  useEffect(()=>{
      if(localStorage.token){
        setAuthToken(localStorage.token);
      }
      store.dispatch(loadUser());
  },[])
  return (
    <Router>
    <>
      <Menubar />
      <Switch>
        <PrivateRoute exact path="/" component={Home}  />
        <PrivateRoute exact path="/logout" component={Logout}  />
        <Route exact path="/login" component={Login} />
        <Route exact path="/Register" component={Register} />
      </Switch>
    </>
    </Router>
  );
}


export default App;
