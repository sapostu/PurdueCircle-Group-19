import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Paper, Typography, Divider } from '@material-ui/core';
import axios from 'axios';
import PostService from '../Services/PostService';

class Timeline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            username: localStorage.getItem('username'),
            account_id: localStorage.getItem('accountId'),
            posts: []
        };

    }

    componentDidMount() {
        PostService.getFollowedTagsByAccountId(this.state.account_id).then(tags_response => {
            var arr = [];

            tags_response.data.forEach(tag => {
                console.log(tag)
                PostService.getPostsByTagId(tag.tag_id).then(post_response => {
                    post_response.data.forEach(post => {
                        arr.push({id: post.id, userName: post.name, content: post.bio});
                    });
                });
            });

            this.setState({posts: arr});
        });


        // todo: figure out how to put them in chrono order
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
                        {this.state.topic}
                        </h1>
                    </Paper>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

            {this.state.posts && this.state.posts.map(post => {
            const labelId = `checkbox-list-label-${post.id}`;

                return (
                    <>
                    <Paper elevation={8} style={{
                        backgroundColor: "#f5f5f5",
                        margin: "auto",
                        padding: "20px"
                    }} id="login_cont">
                    <ListItem
                    key={post.id}
                    secondaryAction={
                        <IconButton edge="end" aria-label="comments">
                        </IconButton>
                    }
                    
                    >

                        <ListItemText id={post.id} primary={`${post.userName}`} secondary={`${post.content}`} />
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

export default Timeline;