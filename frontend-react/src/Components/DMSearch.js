import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PostService from '../Services/PostService';
import MessageService from '../Services/MessageService';
import AccountService from '../Services/AccountService';

import { List, ListItem, ListItemIcon, ListItemText, Checkbox, IconButton, Paper, Typography, Divider, Button, TextField, Snackbar, SnackbarContent } from '@material-ui/core';

class DMSearch extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // TODO : populate username and bio variables with the user's actual username and bio
            topic: '',
            redir: false,
            errorTopic: false,
            user: "",
            id: -1,
            users: []

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.setTopicError = this.setTopicError.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    setTopicError() {
        this.setState({ errorTopic: false });
    }

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
          })
    }

    handleSearch() {
        console.log(this.state.topic);
        AccountService.getAccountByUsername(this.state.topic).then((response) => {
            console.log(response.data);
            if (response.data == "") {
                this.setState({ errorTopic: true });
            } else {
                this.setState({ id: response.data.account_id, redir: true });
            }
        });
    }

    handleSubmit(user) {
        this.setState({ user: user });
        console.log(user);
        AccountService.getAccountByUsername(user).then((response) => {
            console.log(response.data);
            this.setState({ id: response.data.account_id });
            this.setState({ redir: true });
        });
    }

    componentDidMount() {
        MessageService.getAllChats(localStorage.getItem("accountId")).then((response) => {
            console.log(response.data);
            if (response.data.includes(localStorage.getItem("username"))) {
                let arr = response.data;
                arr.splice(response.data.indexOf(localStorage.getItem("username"), 1));
                this.setState({ users: arr });
            } else {
                this.setState({ users: response.data });
            }
        });
    }

    render() {
        if (this.state.redir) {
            return <Navigate to={'/dm/'.concat(this.state.id)}/>;
        }
        return (
            <>
            {/* user dne error */}
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.errorTopic}
                onClose={e => this.setState({errorTopic: false})}
                autoHideDuration={5000}>
                <SnackbarContent style={{backgroundColor: "#D32F2F"}}
                message="Error: User does not exist"/>
                </Snackbar>
                <div style={{ "padding-top": "80px", "width": "70%", "margin": "auto"}}>
                
                <div style = {{ "width": "30%", "margin": "auto"}}>
                    <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px", "text-align": "center" }} id="login_cont">
                        <h1>
                            View DMs
                        </h1>
                        <h2>
                        <TextField id="filled-static" label="Enter Username" defaultValue={this.state.topic} name='topic' onChange={this.handleChange}></TextField> 
                        </h2>
                        <h2>
                            <Button onClick={this.handleSearch}>Send a message to any User</Button>
                        </h2>

                    </Paper>
                    <List  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                        {this.state.users && this.state.users.map(user => {
                            return (
                                <>
                                    <Paper elevation={8} style={{ backgroundColor: "#f5f5f5", margin: "auto", padding: "20px" }} id="login_cont">
                                        <ListItem key={user.id} secondaryAction={<IconButton edge="end" aria-label="comments"></IconButton>}>
                                            <a href={'/profile/'.concat(`${user}`)}>
                                            <ListItemText id={user.id} primary={`${user}`} />
                                            </a>
                                            <Button onClick={() => this.handleSubmit(user)} style = {{position:'absolute', right:10 }}>View</Button>

                                        </ListItem>

                                    </Paper>
                                    <Divider variant="inset" component="li" />
                                </>
                        );
                        })}
                    </List>
                </div>
        </div>
            </>
            
        );
    }
}

export default DMSearch;
