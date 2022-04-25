import React, {  Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, Navigate } from "react-router-dom";
import InterestsService from '../Services/InterestsService';
import FollowService from '../Services/FollowService';

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
            ],
            interests: [],
            showTopics: false
        }

        this.handleFollow = this.handleFollow.bind(this);
        this.handleUnfollow = this.handleUnfollow.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleFollow() {
        FollowService.followTopic(this.state.account);
        this.setState({ followed: true });
    }

    handleUnfollow(e) {
        //console.log(e)
        if (this.state.showTopics) {
            //console.log(e);
            FollowService.unfollowTopic({ account_id: localStorage.getItem('accountId'), tag_id: e });
            //console.log(this.state.interests.findIndex(o => o.tag_id == e));
            this.state.interests.splice(this.state.interests.findIndex(o => o.tag_id == e), 1);
            this.setState({ interests: this.state.interests });
            //console.log(this.state.interests)
            //this.setState({ interests: this.state.interests.splice(this.state.interests.findIndex(o => o.tag_id == e), 1)});
            return;
        }
        axios.get('http://localhost:8080/account/getByUsername/'+e).then((response) => {
            //console.log(response.data.account_id);
            FollowService.unfollowAccount({ account_id: localStorage.getItem('accountId'), followed: response.data.account_id });
        });
        //this.setState({ followed: false });
    }

    handleChange() {
        this.setState({ showTopics: !this.state.showTopics })
    }

    componentDidMount() {
        let tag = { tagName: this.props.router.params.topic }
        //console.log(this.props);
        //console.log(this.props.router.params.username);
        //console.log(tag)
        //console.log('http://localhost:8080/following/getFollowingById/'+localStorage.getItem('accountId'))
        axios.get('http://localhost:8080/following/getFollowingById/'+localStorage.getItem('accountId')).then((response) => {
            this.setState({ users: Array.from(response.data)} );
            //console.log(response.data);
        });
        InterestsService.namesByAccount(localStorage.getItem('accountId')).then((response) => {
            this.setState({ interests: Array.from(response.data)} );
            //console.log(response.data);
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
                            Error: User does not exist
                        </Typography>
                    </Paper>

                </div>
            )
        }

        if (this.state.showTopics) {
            return (
                <div style={{ "padding-top": "80px", "width": "70%", "margin": "auto"}}>
                    <div style = {{ "width": "30%", "margin": "auto"}}>
                        <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px", "text-align": "center" }} id="login_cont">
                            <h1>
                                {this.state.topic}
                                Followed Topics
                            </h1>
                            <h2>
                                <Button onClick={this.handleChange}>Show Users</Button>
                            </h2>
                        </Paper>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    
                            {this.state.interests && this.state.interests.map(interest => {
                                const labelId = `checkbox-list-label-${interest.id}`;
                                return (
                                    <>
                                        <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px" }} id="login_cont">
                                            <ListItem key={interest.id} secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}>
                                                <a href={'/topic/'.concat(`${interest.name}`)}>
                                                    <ListItemText id={interest.id} primary={`${interest.name}`} />
                                                </a>
                                                <Button size="small" onClick={e => this.handleUnfollow(`${interest.tag_id}`)}>Unfollow</Button>
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

        return (
            <div style={{ "padding-top": "80px", "width": "70%", "margin": "auto"}}>
                <div style = {{ "width": "30%", "margin": "auto"}}>
                    <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px", "text-align": "center" }} id="login_cont">
                        <h1>
                            {this.state.topic}
                            Followed Users
                        </h1>
                        <h2>
                            <Button onClick={this.handleChange}>Show Topics</Button>
                        </h2>
                    </Paper>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                
                        {this.state.users && this.state.users.map(user => {
                            const labelId = `checkbox-list-label-${user.id}`;
                            return (
                                <>
                                    <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px" }} id="login_cont">
                                        <ListItem key={user.id} secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}>
                                            <a href={'/profile/'.concat(`${user}`)}>
                                                <ListItemText id={user.id} primary={`${user.isAnon}` == 1 ? 'Anonymous' : `${user}`} />
                                            </a>
                                            <Button size="small" onClick={e => this.handleUnfollow(`${user}`)}>Unfollow</Button>
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