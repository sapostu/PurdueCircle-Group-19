import React, { Component } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { UserContext } from '../UserAuthContext';
import { List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Paper, Typography, Divider } from '@material-ui/core';
import PostService from '../Services/PostService';

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
            username: '',
            posts: []
        };
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
                arr.push({id: post.postId, userName: this.props.router.params.username, content: post.bio});
            });

            this.setState({posts: arr});
        });
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

export default withRouter(Userline);