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
            //var arr = [];

            tags_response.data.forEach(tag => {
                //console.log(tag)
                PostService.getPostsByTagId(tag.tag_id).then(post_response => {
                    post_response.data.forEach(post => {
                        //console.log("_1")
                        console.log(post);
                        var posts = this.state.posts;
                        if (post.isAnon == 1){
                            posts.push({ id: post.postId, userName: 'Anonymous', content: post.bio, tagName: post.tag_id, date: post.dateOfPost.substring(0, 10) })
                        } else {
                            posts.push({ id: post.postId, userName: post.username, content: post.bio, tagName: post.tag_id, date: post.dateOfPost.substring(0, 10) })
                        }
                        posts.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
                        this.setState({posts: posts});
                        //arr.push({id: post.id, userName: post.name, content: post.bio});
                    });
                });
            });

            //this.setState({posts: arr});
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
                        <a href={'/profile/'.concat(`${post.userName}`)} style={{"text-decoration": "none"}}>
                        <ListItemText id={post.id} primary={`${post.userName}`} secondary={`${post.date}`} />
                        </a>
                    </ListItem>
                    <ListItem>
                        <a href={'/p/'.concat(`${post.id}`)} style={{"text-decoration": "none"}}>
                        <ListItemText style={{"padding": 0}} id={post.id} secondary={`${post.content}`} />
                        </a>
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