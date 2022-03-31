import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PostService from '../Services/PostService';

import { Typography, Button, Card, CardContent, CardActions, CardHeader, Grid, TextField, Snackbar, SnackbarContent, Checkbox, FormControlLabel } from '@material-ui/core';

class SearchTopic extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // TODO : populate username and bio variables with the user's actual username and bio

        }



    }

    render() {
        localStorage.removeItem('username');
        localStorage.removeItem('accountId');
        localStorage.removeItem('isAuthenticated');
        return (
            <>
                <Navigate to={'/*'}/>;
            </>
        );
    }
}

export default SearchTopic;
