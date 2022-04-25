import React, { Component } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Button, List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Paper, Typography, Divider } from '@material-ui/core';
import PostService from '../Services/PostService';
import TagService from '../Services/TagService';
import ReactionService from '../Services/ReactionService';

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

class Userline extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.router.params.username,
            posts: [],
            reactions: [],
            showReactions: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({ showReactions: !this.state.showReactions });
    }

    componentDidMount() {
        //console.log(this.props);
        //console.log(this.props.router.params.username);
        //axios.get('http://localhost:8080/account/getByUsername/'.concat(this.props.router.params.username)).then((response) => {
        //    console.log(response);
        
        //});
        console.log(this.props);
        console.log(this.props.router.params.username);
        PostService.getPostsByName(this.props.router.params.username).then((response) => {
            console.log(response);
            var arr = [];

            response.data.forEach(post => {
                if (post.isAnon == 0) {
                    arr.push({id: post.postId, userName: this.props.router.params.username, content: post.bio, date: post.dateOfPost.substring(0, 10)});
                }
            });
            arr.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));
            this.setState({posts: arr});
        });
        ReactionService.getReactionsByAccountId(localStorage.getItem('accountId')).then((response) => {
            console.log(response);
            var arr = [];

            response.data.forEach(reaction => {
                arr.push({postId: reaction.postId, reactionId: reaction.reactionId, name: reaction.name});
            });
            this.setState({ reactions: arr });
            console.log(this.state.reactions);
        });
    }
    
    render() {
        if (this.state.showReactions) {
            return (
                <div style={{ "padding-top": "80px", "width": "70%", "margin": "auto"}}>
                    <div style = {{ "width": "30%", "margin": "auto"}}>
                        <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px", "text-align": "center"}} id="login_cont">
                            <h1>
                                {this.state.username}
                            </h1>
                            <h2>
                                <Button onClick={this.handleChange}>Show Posts</Button>
                            </h2>
                        </Paper>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {this.state.reactions && this.state.reactions.map(post => {
                                const labelId = `checkbox-list-label-${post.id}`;
                                return (
                                    <>
                                        <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px" }} id="login_cont">
                                            <ListItem key={post.id} secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}>
                                                <a href={'/p/'.concat(`${post.postId}`)} style={{"text-decoration": "none"}}>
                                                    <ListItemText id={post.id} primary={`${this.state.username} reacted with \"${post.name}\"`}/>
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
        return (
            <div style={{ "padding-top": "80px", "width": "70%", "margin": "auto"}}>
                <div style = {{ "width": "30%", "margin": "auto"}}>
                    <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px", "text-align": "center"}} id="login_cont">
                        <h1>
                            {this.state.username}
                        </h1>
                        <h2>
                            <Button onClick={this.handleChange}>Show Reactions</Button>
                        </h2>
                    </Paper>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {this.state.posts && this.state.posts.map(post => {
                            const labelId = `checkbox-list-label-${post.id}`;
                            return (
                                <>
                                    <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px" }} id="login_cont">
                                        <ListItem key={post.id} secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}>
                                            <a href={'/profile/'.concat(`${post.userName}`)} style={{"text-decoration": "none"}}>
                                                <ListItemText id={post.id} primary={`${post.userName}`} secondary={`${post.date}`}/>
                                            </a>
                                        </ListItem>
                                        <ListItem>
                                            <a href={'/p/'.concat(`${post.id}`)} style={{"text-decoration": "none"}}>
                                                <ListItemText id={post.id} secondary={`${post.content}`} />
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

export default withRouter(Userline);