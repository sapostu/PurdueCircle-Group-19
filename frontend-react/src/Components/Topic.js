import React, {  Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, Navigate } from "react-router-dom";
import TagService from '../Services/TagService';
import FollowService from '../Services/FollowService';
import BlockService from '../Services/BlockService';

import { List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Paper, Typography, Divider, Button } from '@material-ui/core';


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
            followed: false,
            account: null,
            topic: this.props.router.params.topic,
            users: [
                // { id: 1, userName: 'user 1', content: 'this is a post 1' },
                // { id: 2, userName: 'user 2', content: 'this is a post 2' },
                // { id: 3, userName: 'user 3', content: 'this is a post 3' }
            ]
        }

        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.handleBlock = this.handleBlock.bind(this);
    }

    handleFollow() {
        FollowService.followTopic(this.state.account);
        this.setState({ followed: true });
    }

    handleUnfollow() {
        FollowService.unfollowTopic(this.state.account);
        this.setState({ followed: false });
    }

    handleBlock(blocked) {
        console.log(blocked);
        var accountId = localStorage.getItem('accountId');
        var blockObj = new Object();
        blockObj.account_id = accountId;
        blockObj.blocked = blocked;
        console.log('blocking ' + blockObj.account_id + " " + blockObj.blocked)
        BlockService.blockAccount(blockObj);
    }

    componentDidMount() {
        let tag = { tagName: this.props.router.params.topic }
        //console.log(this.props);
        //console.log(this.props.router.params.username);
        //console.log(tag)
        axios.get('http://localhost:8080/tags/getByName/'.concat(this.props.router.params.topic)).then((response) => {
            //    console.log(response);
            //    this.setState({ username: response.data.username });
            //    this.setState({ bio: response.data.bio });
                //console.log(response)
                if (response.data.length == 0) {
                    this.setState({ exists: false });
                    return;
                }
            });
        axios.get('http://localhost:8080/posts/postByTagBlock/'.concat(this.props.router.params.topic).concat('/').concat(localStorage.getItem('accountId'))).then((response) => {
           // console.log('postByTag/'.concat(this.props.router.params.topic));
        //    this.setState({ username: response.data.username });
        //    this.setState({ bio: response.data.bio });
            //console.log(response)
            this.setState({ users: Array.from(response.data).sort((a, b) => parseFloat(b.postId) - parseFloat(a.postId)) } )
            console.log(this.state.users);
            axios.get('http://localhost:8080/tags/getByName/'.concat(this.props.router.params.topic)).then((response) => {
                this.setState( { account: {account_id: localStorage.getItem('accountId'), tag_id: response.data.tagId} });
                //console.log(response.data)
                FollowService.isFollowingTopic(this.state.account).then((response) => {
                    this.setState( { followed: response.data });
                    //console.log(this.state.account);
                });
            });
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
                        <Button size="small" onClick={this.handleUnfollow} style={{display: this.state.followed ? 'inherit' : 'none'}}>Unfollow</Button>
                        <Button size="small" onClick={this.handleFollow} style={{display: this.state.followed ? 'none' : 'block'}}>Follow</Button>
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
                <ListItem key={user.id} secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                    </IconButton>
                }>
                    <Button onClick={() => {this.handleBlock(user.accountId)}} style={{position:'absolute', right:10}} > Block </Button>
                    <a href={`${user.isAnon}` == 1 ? 'javascript:;' : '/profile/'.concat(`${user.username}`)} style={{"text-decoration": "none"}}>
                        <ListItemText id={user.id} primary={`${user.isAnon}` == 1 ? 'Anonymous' : `${user.username}`} secondary={`${user.dateOfPost}`.substring(0,10)} />
                    </a>
                </ListItem>
                <ListItem>
                        <a href={'/p/'.concat(`${user.postId}`)} style={{"text-decoration": "none"}}>
                            <ListItemText style={{"padding": 0}} id={user.postId} secondary={`${user.bio}`} />
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

export default withRouter(Topic);