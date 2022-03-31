import React, {  Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, Navigate } from "react-router-dom";
import TagService from '../Services/TagService';

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
            topic: this.props.router.params.topic,
            users: [
                // { id: 1, userName: 'user 1', content: 'this is a post 1' },
                // { id: 2, userName: 'user 2', content: 'this is a post 2' },
                // { id: 3, userName: 'user 3', content: 'this is a post 3' }
            ]
        }
    }

    componentDidMount() {
        let tag = { tagName: this.props.router.params.topic }
        //console.log(this.props);
        //console.log(this.props.router.params.username);
        console.log(tag)
        axios.get('http://localhost:8080/tags/getByName/'.concat(this.props.router.params.topic)).then((response) => {
            //    console.log(response);
            //    this.setState({ username: response.data.username });
            //    this.setState({ bio: response.data.bio });
                console.log(response)
                if (response.data.length == 0) {
                    this.setState({ exists: false });
                    return;
                }
            });
        axios.get('http://localhost:8080/posts/postByTag/'.concat(this.props.router.params.topic)).then((response) => {
        //    console.log(response);
        //    this.setState({ username: response.data.username });
        //    this.setState({ bio: response.data.bio });
            console.log(response)
            this.setState({ users: Array.from(response.data)} )
        });
    }

    render() {

        if (!this.state.exists) {
            return (
                <div>
                    <Paper elevation={8} style={{
                        backgroundColor: "#f5f5f5",
                        margin: "auto",
                        padding: "20px",
                        "text-align": "center"
                    }} id="login_cont">
                        <Typography>
                            Error: Topic does not exist
                        </Typography>
                    </Paper>

                </div>
            )
        }

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
                        {this.state.topic}
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

                    <ListItemText id={user.id} primary={`${user.isAnon}` == 1 ? 'Anonymous' : `${user.username}`} secondary={`${user.bio}`} />
                
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