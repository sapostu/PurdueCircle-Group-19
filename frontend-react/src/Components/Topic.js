import React, {  Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, Navigate } from "react-router-dom";

import { List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Paper, Typography, Divider } from '@material-ui/core';


function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

class Topic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            exists: true,
            topic: '',
            users: [
                { id: 1, userName: 'user 1', content: 'this is a post 1' },
                { id: 2, userName: 'user 2', content: 'this is a post 2' },
                { id: 3, userName: 'user 3', content: 'this is a post 3' }
            ]
        }
    }

    componentDidMount() {
        //console.log(this.props);
        //console.log(this.props.router.params.username);
        //axios.get('http://localhost:8080/account/getByUsername/'.concat(this.props.router.params.username)).then((response) => {
        //    console.log(response);
        //    this.setState({ username: response.data.username });
        //    this.setState({ bio: response.data.bio });
        
        //});
    }

    render() {

        return (
            
            <div style={{ "padding-top": "80px", "width": "70%", "margin": "auto"}}>

            <div style = {{ "width": "30%", "margin": "auto"}}>
            <Paper elevation={8} style={{
                        backgroundColor: "#f5f5f5",
                        margin: "auto",
                        padding: "20px",
                        "text-align": "center"
                    }} id="login_cont">
                        <h1>
                        this.state.topic
                        </h1>
                    </Paper>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            
            {this.state.users && this.state.users.map(user => {
            const labelId = `checkbox-list-label-${user.id}`;

            return (
                <>
                <Paper elevation={8} style={{
                    backgroundColor: "#f5f5f5",
                    margin: "auto",
                    padding: "20px"
                }} id="login_cont">
                <ListItem
                key={user.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                    </IconButton>
                }
                
                >

                    <ListItemText id={user.id} primary={`${user.userName}`} secondary={`${user.content}`} />
                </ListItem>
                
                </Paper>
                <Divider variant="inset" component="li" />
                </>

                    
            );
            })}
        </List>
            </div>
            

            </div>

        );

    }
}

export default withRouter(Topic);