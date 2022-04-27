import axios from "axios";
import React, { Component } from "react";
import { useParams, Navigate } from "react-router-dom";

import BlockService from "../Services/BlockService";
import AccountService from "../Services/AccountService";

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

class BlockList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            exists: true,
            blocked: false,
            users: [],
            account: null
        }

        this.handleUnBlock = this.handleUnBlock.bind(this);
        /* Other funcs needed*/
    }

    handleUnBlock(userName) {
        // UnBlock
        AccountService.getAccountByUsername(userName).then((response) => {
        
            var toSend = new Object();
            toSend.account_id = localStorage.getItem('accountId');
            toSend.blocked = response.data.account_id;
            console.log(toSend.account_id + ' ' + toSend.blocked);

            BlockService.unBlockAccount(toSend);
        });
    }

    componentDidMount() {
        axios.get('http://localhost:8080/blocked/getBlockingById/' + localStorage.getItem('accountId')).then((response) => {
            this.setState({ users: Array.from(response.data)} );
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

        return (
            <div style={{ "padding-top": "80px", "width": "70%", "margin": "auto"}}>
                    <div style = {{ "width": "30%", "margin": "auto"}}>
                        <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px", "text-align": "center" }} id="login_cont">
                            <h1>
                                Blocked Users
                            </h1>
                        </Paper>
                        <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                            {this.state.users && this.state.users.map(user => {
                                return (
                                    <>
                                        <Paper  elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px" }} id="login_cont">
                                            <ListItem key={user.id} secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}>
                                                <a href={'/profile/'.concat(`${user}`)}>
                                                <ListItemText id={user.id} primary={`${user.isAnon}` == 1 ? 'Anonymous' : `${user}`} />
                                                </a>
                                                <Button onClick={e => this.handleUnBlock(user)} style = {{position:'absolute', right:10 }}>Unblock</Button>

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

export default withRouter(BlockList);