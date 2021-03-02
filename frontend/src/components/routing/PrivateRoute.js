import React from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import PageLoader from '../PageLoader';


const PrivateRoute = ({component:Component,auth:{isAuthenticated, loading},...rest}) => {

    return (
        <Route {...rest} render={props => loading ? <PageLoader /> : isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />}  />
    )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute);
