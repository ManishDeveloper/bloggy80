import React from 'react';
import {Spinner} from 'react-bootstrap';

const PageLoader = () => {
    return (
        <Spinner animation="border" role="status" variant="primary" style={{'width':'70px','height':'70px','margin':'40px auto','display':'flex'}}>
            <span className="sr-only">Loading...</span>
        </Spinner>
    )
}

export default PageLoader;
