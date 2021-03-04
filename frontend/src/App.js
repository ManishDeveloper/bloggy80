import React,{useEffect} from 'react';
import Menubar from './components/Menubar';
import Login from './components/Login';
import Home from './components/Home';
import Logout from './components/Logout';
import Register from './components/Register';
import {getPosts,getLoginUserPost} from './redux/actions/post';
import SinglePost from './components/SinglePost';
import UserPosts from './components/UserPosts';
import setAuthToken from './utils/setAuthToken';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import { loadUser } from './redux/actions/auth';
import PrivateRoute from './components/routing/PrivateRoute';
import Dashboard from './components/Dashboard';

function App() {
  useEffect(()=>{
      if(localStorage.token){
        setAuthToken(localStorage.token);
      }
      store.dispatch(getPosts());
      store.dispatch(loadUser());
      store.dispatch(getLoginUserPost());
  },[])
  return (
    <Router>
    <>
      <Menubar />
      <Switch>
        <PrivateRoute exact path="/logout" component={Logout}  />
        <PrivateRoute exact path="/dashboard" component={Dashboard}  />
        <Route exact path="/" component={Home}  />
        <Route exact path="/login" component={Login} />
        <Route exact path="/post/:id" component={SinglePost} />
        <Route exact path="/user/post/:id/:name" component={UserPosts} />
        <Route exact path="/Register" component={Register} />
      </Switch>
    </>
    </Router>
  );
}


export default App;
