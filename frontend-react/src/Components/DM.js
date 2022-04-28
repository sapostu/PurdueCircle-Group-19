import React, { Component } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { TextField, Button, Snackbar, SnackbarContent, Paper, Typography } from '@material-ui/core';
import AccountService from '../Services/AccountService';
import MessageService from '../Services/MessageService';
import BlockService from '../Services/BlockService';
import FollowService from '../Services/FollowService';

class DM extends Component {

    constructor(props) {
        super(props);
        this.state = {
            theirID: this.props.router.params.theirID,
            theirUsername: "",
            msgElements: [],
            msgInput: "",
            alertBool: false,
            isBlocked: false,
            isPrivate: false
        };
        this.handleSend = this.handleSend.bind(this);
    }

    componentDidMount() {
        BlockService.checkBlock({ account_id: this.state.theirID, blocked: localStorage.getItem('accountId'), blocked_username: "" }).then((response) => {
            if (response.data) {
                this.setState({ isBlocked: true });
            }
            AccountService.getAccountById(this.state.theirID).then((response) => {
                if (response.data.req_following === 1) {
                    FollowService.isFollowing({ account_id: this.state.theirID, followed: localStorage.getItem('accountId'), followed_username: null }).then((response) => {
                        if (!response.data) {
                            this.setState({ isPrivate: true });
                        } else {
                            console.log(response.data);
                            AccountService.getAccountById(this.state.theirID).then(acc_res => {
                                if (acc_res.data) {
                                    // get their username using their ID
                                    this.setState({theirUsername: acc_res.data.username});
                    
                                    MessageService.getMessagesByUsernames(localStorage.getItem('username'), this.state.theirUsername).then(msg_res => {
                                        if (msg_res.data) {
                                            console.log(msg_res.data);
                                            // get all messages and put their html in msgElements
                                            for (const msg of msg_res.data) {
                                                this.setState({
                                                    msgElements: [...this.state.msgElements, (
                                                        <div key={msg.msg_id} style={{marginTop: "5px"}}>
                                                            <p style={{margin: 0, padding: 0}}><b>{msg.sender_username}</b></p>
                                                            <p style={{margin: 0, padding: 0}}>{msg.msg}</p>
                                                        </div>
                                                    )]
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }

            });

        });


    }

    handleSend = () => {
        if ( !this.state.msgInput ) {
            this.setState({alertBool: true});
            return;
        }
        const msg = {
            sender: localStorage.getItem('username'),
            receiver: this.state.theirUsername,
            msg: this.state.msgInput
        };
        // add message
        MessageService.addByUser(msg).then(msg_res => {
            if (msg_res.data) {
                // if successful, add to UI
                this.setState({
                    msgElements: [...this.state.msgElements, (
                        <div key={msg_res.data.msg_id} style={{marginTop: "5px"}}>
                            <p style={{margin: 0, padding: 0}}><b>{msg.sender}</b></p>
                            <p style={{margin: 0, padding: 0}}>{msg.msg}</p>
                        </div>
                    )],
                    msgInput: ""
                });
                const scrollDiv = document.getElementById('scrollDiv');
                scrollDiv.scrollTop = scrollDiv.scrollHeight; // scroll chat to bottom to see new message
                document.getElementById('messageInput').value = "";
            }
        });
    }

    render() {
        if (this.state.isBlocked) {
            return (
                <div>
                    <Paper elevation={8} style={{
                        backgroundColor: "#f5f5f5",
                        margin: "auto",
                        padding: "20px",
                        "text-align": "center"
                    }} id="login_cont">
                        <Typography>
                            User has blocked you
                        </Typography>
                    </Paper>

                </div>
            )
        }
        if (this.state.isPrivate) {
            return (
                <div>
                    <Paper elevation={8} style={{
                        backgroundColor: "#f5f5f5",
                        margin: "auto",
                        padding: "20px",
                        "text-align": "center"
                    }} id="login_cont">
                        <Typography>
                            User has private DMs
                        </Typography>
                    </Paper>

                </div>
            )
        }
        // redirect if not logged in
        if ( !localStorage.getItem('isAuthenticated') || !localStorage.getItem('username') ) {
            return <Navigate to={'/login'}/>
        }
        return (
            <>
                {/* blocked error */}
                <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.alertBool}
                onClose={e => this.setState({alertBool: false})}
                autoHideDuration={5000}>
                <SnackbarContent style={{backgroundColor: "#D32F2F"}}
                message="You are blocked by this user."/>
                </Snackbar>

                {/* not-following error */}
                <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.alertBool}
                onClose={e => this.setState({alertBool: false})}
                autoHideDuration={5000}>
                <SnackbarContent style={{backgroundColor: "#D32F2F"}}
                message="User has set DMs to follow only."/>
                </Snackbar>

                {/* blank-message error */}
                <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.alertBool}
                onClose={e => this.setState({alertBool: false})}
                autoHideDuration={5000}>
                <SnackbarContent style={{backgroundColor: "#D32F2F"}}
                message="Can't send blank message."/>
                </Snackbar>

                {/* title */}
                <h3>Private Chat with {this.state.theirUsername}</h3>
                {/* messages section */}
                <div id='scrollDiv' style={{height: "50vh", overflowY: "scroll", border: "2px solid black"}}>
                    {this.state.msgElements}
                </div>
                {/* action elements */}
                <div>
                    <TextField id='messageInput' onChange={e => this.setState({msgInput: e.target.value})} variant="filled" size="small" color="primary" label="Message"/>
                    <Button onClick={e => this.handleSend()} variant="contained" color="primary" size="large">SEND</Button>
                </div>
            </>
        );
    }
}

// for using url params
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        const params = useParams();
        return <Component {...props} router={{ params }} />;
    }
    return ComponentWithRouterProp;
}
export default withRouter(DM);