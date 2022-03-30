import React, { Component } from 'react';
import {TextField, Paper, Button, Snackbar, SnackbarContent} from '@material-ui/core';
import { Navigate } from 'react-router-dom';

import PostService from '../Services/PostService';
import AccountService from '../Services/AccountService';
import CommentService from '../Services/CommentService';
import TagService from '../Services/TagService';
import ReactionService from '../Services/ReactionService';

import { UserContext } from '../UserContext';

// usage: <Post post_id="1" />
class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_id: props.post_id,
            // post details
            type: "",
            username: "", // set to Anonymous if isAnonymous
            date: "",
            tag: "",
            text: "",
            image: "",
            isAnonymous: false,
            // comments
            comments: [],
            commentElements: [],
            commentInput: "",
            // reactions
            reactions: [],
            reactionElements: [],
            // comment error alert
            alertBool: false,
            alertMsg: "",
            // navigation
            toProfile: false
        };
        this.handleComment = this.handleComment.bind(this);
        this.handleReaction = this.handleReaction.bind(this);
        this.handleClickUsername = this.handleClickUsername.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    // for getting user's authentication status/details
    static contextType = UserContext;

    componentDidMount() {
        const { auth_username, isAuthenticated } = this.context;
        // retrieve all data (post, comments, reactions)
        PostService.getPostById(this.state.post_id).then(post_res => {
            if (post_res.data) {
                // get account's username
                AccountService.getAccountById(post_res.data.accountId).then(acc_res => {
                    acc_res.data && this.setState({username: !post_res.data.isAnon ? acc_res.data.username : "Anonymous"});
                });
                // get tag name
                TagService.getTagById(post_res.data.tag_id).then(tag_res => {
                    tag_res.data && this.setState({tag: tag_res.data.tagName});
                });
                // retrieve rest of post content/details
                this.setState({
                    type: post_res.data.type,
                    date: post_res.data.dateOfPost.substr(0, 10),
                    text: post_res.data.bio,
                    isAnonymous: post_res.data.isAnon,
                });
                // retrieve comments
                CommentService.getCommentsByPostId(this.state.post_id).then(com_res => {
                    if (com_res.data) {
                        for (const com of com_res.data) {
                            AccountService.getAccountById(com.accountId).then(acc_res => {
                                if (acc_res.data) {
                                    // append to comment list
                                    this.setState({comments: [...this.state.comments, {
                                        comment_id: com.commentId, // for mapping a react key
                                        username: acc_res.data.username,
                                        date: com.date,
                                        text: com.text
                                    }]});
                                    // map comments to elements of comments
                                    // order by date descending
                                    const comArr = this.state.comments;
                                    this.setState({commentElements: comArr.sort((a,b) => -1*a.date.localeCompare(b.date)).map(comment => (
                                        <p key={comment.comment_id}><b>{comment.username + ' (' + comment.date.substr(0,10) +'): '}</b>{comment.text}</p>
                                    ))});
                                }
                            });
                        }
                    }
                });
                
                // retrieve reactions
                ReactionService.getReactionCountsByPostId(this.state.post_id).then(react_res => {
                    if (react_res.data) {
                        for (const reaction_id in react_res.data) {
                            // get reaction name from reaction_id
                            ReactionService.getReactionById(reaction_id).then(react_res2 => {
                                if (react_res2.data) {
                                    // add reaction
                                    this.setState({reactions: [...this.state.reactions, {
                                        reaction_id: reaction_id, // for mapping a react key
                                        name: react_res2.data.reactionName,
                                        count: react_res.data[reaction_id]
                                    }]});
                                    // map reactions to elements of reactions
                                    // order by name ascending
                                    const reactArr = this.state.reactions;
                                    this.setState({reactionElements: reactArr.sort((a,b) => a.name.localeCompare(b.name)).map(r => (
                                        <button disabled={!isAuthenticated || !auth_username} onClick={e => this.handleReaction(r.reaction_id)} key={r.reaction_id}>{r.name + ": " + r.count}</button>
                                    ))});
                                }
                            });
                        }
                    }
                });
            }
        });
    }

    handleReaction = reaction_id => {
        const { auth_username, isAuthenticated } = this.context;
        if (!isAuthenticated || !auth_username) { return; } // just in case user is able to click reaction buttons
        // get account id using username
        AccountService.getAccountByUsername(auth_username).then(acc_res => {
            if (acc_res.data) {
                const user_reaction = {
                    postId: this.state.post_id,
                    accountId: acc_res.data.account_id,
                    reactionId: reaction_id
                }
                ReactionService.addReaction(user_reaction).then(tmp => {
                    // update reaction data
                this.setState({reactions: [], reactionElements: []});
                ReactionService.getReactionCountsByPostId(this.state.post_id).then(react_res => {
                    if (react_res.data) {
                        for (const reaction_id in react_res.data) {
                            // get reaction name from reaction_id
                            ReactionService.getReactionById(reaction_id).then(react_res2 => {
                                if (react_res2.data) {
                                    // add reaction
                                    this.setState({reactions: [...this.state.reactions, {
                                        reaction_id: reaction_id, // for mapping a react key
                                        name: react_res2.data.reactionName,
                                        count: react_res.data[reaction_id]
                                    }]});
                                    // map reactions to elements of reactions
                                    // order by name ascending
                                    const reactArr = this.state.reactions;
                                    this.setState({reactionElements: reactArr.sort((a,b) => a.name.localeCompare(b.name)).map(r => (
                                        <button onClick={e => this.handleReaction(r.reaction_id)} key={r.reaction_id}>{r.name + ": " + r.count}</button>
                                    ))});
                                }
                            });
                        }
                    }
                });
                })
                
            }
        });
    }

    handleComment = () => {
        const { auth_username, isAuthenticated } = this.context;
        if (!isAuthenticated && !auth_username) { return; } // just in case user is able to interact with comment elements
        if (!this.state.commentInput) {
            this.setState({alertMsg: "Can't post an empty comment."});
            this.setState({alertBool: true});
            return;
        }
        // get account id using username
        AccountService.getAccountByUsername(auth_username).then(acc_res => {
            if (acc_res.data) {
                const comment = {
                    accountId: acc_res.data.account_id,
                    postId: this.state.post_id,
                    text: this.state.commentInput,
                    date: (new Date()).toISOString()
                };
                CommentService.addComment(comment).then(res => {
                    if (res.data) {
                        this.setState({comments: [...this.state.comments, {
                            comment_id: res.data.commentId,
                            username: auth_username,
                            date: res.data.date.substr(0, 10),
                            text: res.data.text
                        }]});
                        // update comment data
                        this.setState({comments: [], commentElements: []});
                        CommentService.getCommentsByPostId(this.state.post_id).then(com_res => {
                            if (com_res.data) {
                                for (const com of com_res.data) {
                                    AccountService.getAccountById(com.accountId).then(acc_res => {
                                        if (acc_res.data) {
                                            // append to comment list
                                            this.setState({comments: [...this.state.comments, {
                                                comment_id: com.commentId, // for mapping a react key
                                                username: acc_res.data.username,
                                                date: com.date,
                                                text: com.text
                                            }]});
                                            // map comments to elements of comments
                                            // order by date descending
                                            const comArr = this.state.comments;
                                            this.setState({commentElements: comArr.sort((a,b) => -1*a.date.localeCompare(b.date)).map(comment => (
                                                <p key={comment.comment_id}><b>{comment.username + ' (' + comment.date.substr(0,10) +'): '}</b>{comment.text}</p>
                                            ))});
                                        }
                                    });
                                }
                            }
                        });
                    }
                });
            }
        });
    }

    // navigate to poster's page if not anonymous
    handleClickUsername = () => {
        if (this.state.username && this.state.username !== "Anonymous" && !this.state.isAnon)
            this.setState({toProfile: true});
    }

    handleDelete = () => {
        const { auth_username, isAuthenticated } = this.context;
        if (!isAuthenticated || !auth_username) { return; }
        if (!window.confirm("ARE YOU SURE?\nThis will permanently delete all of this post's...\n- details\n- associated comments\n- associated reactions"))
            { return; }
        const thisPostId = this.state.post_id;
        // delete all reactions
        ReactionService.deleteByPostId(thisPostId);
        // deleate all comments
        CommentService.deleteByPostId(thisPostId);
        // delete post
        PostService.deletePost({postId: thisPostId});
        // navigate to their profile after deleting
        this.setState({toProfile: true});
    }

    

    render() {
        if (this.state.toProfile === true) {
            return <Navigate to={'/profile/' + this.state.username}/>
        }
        const { auth_username, isAuthenticated } = this.context;
        return (
            <>
            <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            open={this.state.alertBool}
            onClose={e => this.setState({alertBool: false})}
            autoHideDuration={5000}>
            <SnackbarContent style={{backgroundColor: "#D32F2F"}}
            message={this.state.alertMsg}/>
            </Snackbar>

            <Paper style={{margin: '10px'}} elevation={4}>
                <div>
                    <h1 onClick={e => this.handleClickUsername()} style={{display: 'inline'}}>{this.state.username}</h1>
                    <p style={{display: 'inline', margin: '0 10px'}}>{this.state.date}</p>
                    <p style={{display: 'inline'}}><mark>{this.state.tag && this.state.tag.toUpperCase()}</mark></p>
                    <Button onClick={e => this.handleDelete()} style={{marginLeft: '20px', backgroundColor: 'red', color: 'white',
                            display: this.state.username === auth_username ? 'inline' : 'none'
                            }}>Delete Post</Button>
                </div>
                <p>{this.state.text}</p>
                <div>{this.state.reactionElements}</div>
            </Paper>
            <div style={{display: isAuthenticated ? 'block' : 'none', margin: '10px'}}>
                <TextField onChange={e => this.setState({commentInput: e.target.value})} size="small" label="Your comment..." variant="filled"/>
                <Button onClick={this.handleComment} style={{margin: "5px"}} variant="contained" color="primary">Post Comment</Button>
            </div>
            <Paper style={{margin: '10px'}} elevation={4}>
                <ul style={{padding: 0}}>{this.state.commentElements}</ul>
            </Paper>
            </>
        );
    }
}

export default Post;