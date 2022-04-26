import React, { Component } from 'react';
import { Paper, ListItem, IconButton, ListItemText, Divider } from '@material-ui/core';
import SavedService from '../Services/SavedService';
import AccountService from '../Services/AccountService';

class Saved extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            title: "My Saved Posts"
        };
    }

    componentDidMount() {
        this.setState({title: "My Saved Posts (LOADING...)"})
        // get posts
        SavedService.getByUser(localStorage.getItem('username')).then(save_res => {
            if (save_res.data) {
                // retrive saved posts
                for ( const { postId, username, isAnon, date, content, tag } of save_res.data ) {
                    this.setState({posts: [...this.state.posts,
                        {
                            id: postId,
                            userName: isAnon ? 'Anonymous' : username,
                            content: content,
                            date: date,
                            tag: tag
                        }
                    ]})
                }
                this.setState({title: "My Saved Posts"})
            }
        });
    }

    render() {
        return (
            <>
                <h1 style={{textAlign: 'center'}}>{this.state.title}</h1>
                {this.state.posts.map(post => (
                    
                    <div key={post.id} style={{width: '30vw', margin: 'auto'}}>
                        <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px" }}>
                            <ListItem>
                                <a href={post.userName === 'Anonymous' ? 'javascript:;' : `/profile/${post.userName}`} style={{textDecoration: "none"}}>
                                    <ListItemText id={post.id} primary={post.userName} secondary={post.date} />
                                </a>
                            </ListItem>
                            <ListItem>
                                <a href={`/p/${post.id}`} style={{textDecoration: "none"}}>
                                    <ListItemText style={{"padding": 0}} id={post.id} secondary={post.content} />
                                </a>
                            </ListItem>
                            <ListItem>
                                <a href={`/topic/${post.tag}`} style={{textDecoration: "none"}}>
                                    <ListItemText style={{"padding": 0}} id={post.id} primary={post.tag} />
                                </a>
                            </ListItem>
                        </Paper>
                        <Divider variant="inset" />
                    </div>

                ))}
            </>
        );
    }
}

export default Saved;