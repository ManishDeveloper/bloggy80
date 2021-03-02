import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {logoutUser} from '../redux/actions/auth';

const Logout = ({logoutUser}) => {

    logoutUser();

    return (
        <Redirect to="/login" />
            
    )
}

export default connect(null,{logoutUser})(Logout);
