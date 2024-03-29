import React, { Component } from 'react';
import {Box, Typography, Checkbox, Button, Snackbar, SnackbarContent,
    Dialog, DialogTitle, DialogContent, TextField, DialogActions, Divider, Link, Paper } from '@material-ui/core';
import { Navigate } from 'react-router-dom';
import AccountService from '../Services/AccountService';
import LoginService from '../Services/LoginService';
import { UserContext } from '../UserContext';


var CryptoJS = require("crypto-js/core");
CryptoJS.AES = require("crypto-js/aes");
const secret = "d9aopdisfoaid923u-2u;okdfosidhgsigudw;s9u2308rlskf;sdh;aoisdhg;aowghp02384gykjdhskgsjba.dkjgd;aaDSFAS";

/**
 * GUI for selecting which credentials to change
 */
class CredRequestScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // for error alert
            alertBool: false,
            alertMsg: "",
            // input fields
            email: false,
            username: false,
            password: false,
            fname: false,
            lname: false,
            dob: false,
            oldPassword: "",
            oldUsername: "",
            // for pop-up that asks for username and password
            popupBool: false,
            // navigating to different pages
            toProfile: false,
            toLogin: false,
            // rendering the UI for changing credentials
            toCredChange: false,
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            auth_username: localStorage.getItem('username'),
            successMessage: "",
            successBool: false
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePopupSubmit = this.handlePopupSubmit.bind(this);
    }

    // for tracking user authentication status
    // use this.context to access
    static contextType = UserContext;

    /**
     * Handles cancel button
     */
    handleCancel = e => {
        e.preventDefault();
        this.setState({toProfile: true}); // return to user's profile page
    }

    /**
     * Handles submit button
     */
    handleSubmit = e => {
        e.preventDefault();
        // ensure user selects at least one thing to change
        if ( !(this.state.email || this.state.username || this.state.password || this.state.fname || 
            this.state.lname || this.state.dob) ) {
            this.setState({alertMsg: "Please select at least one thing to change."});
            this.setState({alertBool: true});
            return;
        }
        const { auth_username, isAuthenticated } = this.context;
        if (this.state.isAuthenticated && this.state.auth_username) {
            // ask user to enter their old password if they select to change their username or password
            if (this.state.username || this.state.password) {
              this.setState({popupBool: true});
              return;
            }

            this.setState({toCredChange: true}); // render <CredChangeScreen/> if user passes checks
        }
        else {
            this.setState({toLogin: true}); // navigate to login page if user isn't authenticated
        }
    }

    /**
     * Handles submit button of the popup that asks for user's old password
     */
    handlePopupSubmit = e => {
        e.preventDefault();
        // ensure user fills in their old password
        if (!this.state.oldPassword || !this.state.oldUsername) {
            this.setState({alertMsg: "Please fill in the 'old password' field"});
            this.setState({alertBool: true});
            return;
        }

        let account = {username: this.state.oldUsername, crypt_password: this.state.oldPassword};
        LoginService.loginAccount(account).then( (res) => {
            console.log(res)
            if (res.data !== "") {
                let aes_crypt = res.data.crypt_password;
                let uncrypt = CryptoJS.AES.decrypt(aes_crypt, secret).toString(CryptoJS.enc.Utf8);
                if (uncrypt === this.state.oldPassword) {
                    this.setState({toCredChange: true});
                }
                else {
                    this.setState({alertMsg: "Incorrect credentials."});
                    this.setState({alertBool: true});
                    return;
                }
            } else {
                this.setState({alertMsg: "Incorrect credentials."});
                this.setState({alertBool: true});
                return;
            }
        });

    }


    render() {
        /* for navigating to different pages and rendering <CredChangeScreen/> */
        if (this.state.toProfile) {
            return <Navigate to={"/profile/"+localStorage.getItem('username')}/>;
        }
        if (this.state.toLogin) {
            return <Navigate to="/login"/>;
        }
        if (this.state.toCredChange) {
            return <CredChangeScreen bools={{
                emailBool: this.state.email,
                usernameBool: this.state.username,
                passwordBool: this.state.password,
                fnameBool: this.state.fname,
                lnameBool: this.state.lname,
                dobBool: this.state.dob
            }}/>
        }

        /* base <CredRequestScreen/> */
        return (
            <div style={{position:"absolute", top:"relative"}}>
                {/* error alert/notification */}
                <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.alertBool}
                onClose={e => this.setState({alertBool: false})}
                autoHideDuration={5000}>
                <SnackbarContent style={{backgroundColor: "#D32F2F"}}
                message={this.state.alertMsg}/>
                </Snackbar>

                {/* old-password confirmation pop-up */}
                <Dialog open={this.state.popupBool} onClose={e => this.setState({popupBool: false})}>
                <DialogTitle style={{margin: "auto"}}>Please enter your account username and password:</DialogTitle>
                <DialogContent style={{margin: "auto"}}>
                    <TextField variant="outlined" label="Account Username" size="small"
                    onChange={e => this.setState({oldUsername: e.target.value})} type="text"
                    />
                    <TextField variant="outlined" label="Account Password" size="small"
                    onChange={e => this.setState({oldPassword: e.target.value})} type="password"
                    />
                </DialogContent>
                <DialogActions style={{margin: "auto"}}>
                    <Button color="primary" variant="contained"
                    onClick={this.handlePopupSubmit}
                    >Confirm</Button>
                    <Button color="primary" variant="outlined"
                    onClick={e => this.setState({popupBool: false})}
                    >Cancel</Button>
                </DialogActions>
                </Dialog>

                {/* physical componenets of form */}
                <Box m={1}><Typography variant="h5">Select what you would like to change</Typography></Box>
                <div>
                <Checkbox onChange={e => this.setState({email: !this.state.email})}/>
                <Typography style={{display: "inline-block"}}>Email</Typography>
                </div>
                <div>
                <Checkbox onChange={e => this.setState({username: !this.state.username})}/>
                <Typography style={{display: "inline-block"}}>Username</Typography>
                </div>
                <div>
                <Checkbox onChange={e => this.setState({password: !this.state.password})}/>
                <Typography style={{display: "inline-block"}}>Password</Typography>
                </div>
                {/*<div>
                <Checkbox onChange={e => this.setState({fname: !this.state.fname})}/>
                <Typography style={{display: "inline-block"}}>First Name</Typography>
                </div>
                <div>
                <Checkbox onChange={e => this.setState({lname: !this.state.lname})}/>
                <Typography style={{display: "inline-block"}}>Last Name</Typography>
                </div>
                <div>
                <Checkbox onChange={e => this.setState({dob: !this.state.dob})}/>
                <Typography style={{display: "inline-block"}}>Date of Birth</Typography>
                </div>*/}
                <Box m={1} mt={1}>
                    <Box mr={1} style={{display: "inline-block"}}>
                    <Button color="primary" size="large" variant="contained"
                    onClick={this.handleSubmit}
                    >Submit</Button>
                    </Box>
                    <Button color="secondary" size="large" variant="outlined"
                    onClick={this.handleCancel}
                    >Cancel</Button>
                </Box>
            </div>
        );
    }
}

export default CredRequestScreen;


/**
 * GUI for changing the credentials selected within <CredRequestScreen/>
 */
class CredChangeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // for error alert
            alertBool: false,
            alertMsg: "",
            // input fields
            email: "",
            username: "",
            fname: "",
            lname: "",
            dob: "",
            password: "",
            secPassword: "",
            // bools passed from <CredRequestScreen/> for which credentials user selected
            bools: props.bools,
            // for backing up and rendering <CredRequestScreen/>
            toCredRequest: false,
            auth_username: localStorage.getItem('username'),
            isAuthenticated: localStorage.getItem('isAuthenticated')
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    // for tracking user authentication status
    // use this.context to access
    static contextType = UserContext;

    /**
     * Handles submit button
     */
    handleSubmit = e => {
        const { auth_username, isAuthenticated } = this.context;
        if (!this.state.isAuthenticated || !this.state.auth_username) { console.log("doesn't make it" + this.state.auth_username); return; }

        e.preventDefault();
        // ensure all requested fields are filled in
        const {emailBool, usernameBool, passwordBool, fnameBool, lnameBool, dobBool} = this.state.bools;
        if ( !( (emailBool?this.state.email:true) && (usernameBool?this.state.username:true) && 
                (passwordBool?this.state.password:true) && (passwordBool?this.state.secPassword:true) && 
                (fnameBool?this.state.fname:true) && (lnameBool?this.state.lname:true) && 
                (dobBool?this.state.dob:true))) {
            this.setState({alertMsg: "Please fill in all fields."});
            this.setState({alertBool: true});
            return;
        }

        /* basic input validation */
        // email
        if (emailBool && !(/^.+@.+\..+$/.test(this.state.email)) ) {
            this.setState({alertMsg: "Invalid email format."});
            this.setState({alertBool: true});
            return;
        }
        // username
        if (usernameBool && (this.state.username.length < 3 || this.state.username.length > 15)) {
            this.setState({alertMsg: "Username must be between 3 and 15 characters long."});
            this.setState({alertBool: true});
            return;
        }
        // password
        if (passwordBool && (this.state.password.length < 10 || this.state.password > 20)) {

            this.setState({alertMsg: "Password must be between 10 and 20 characters long."});
            this.setState({alertBool: true});
            return;
        }
        if (passwordBool && this.state.password.match(new RegExp("[0-9]+")) == null) {
            this.setState({alertMsg: "Password should contain nmber."});
            this.setState({alertBool: true});
            return;
        }
        // passwords match
        if (passwordBool && (this.state.password != this.state.secPassword)) {
            this.setState({alertMsg: "Password fields must match."});
            this.setState({alertBool: true});
            return;
        }
        // date of birth
        if (dobBool) {
            if ( !(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(this.state.dob)) ) {
                this.setState({alertMsg: "Invalid date of birth."});
                this.setState({alertBool: true});
                return;
            }
            try {
                if (isNaN(Date.parse(this.state.dob))) {
                    this.setState({alertMsg: "Invalid date of birth."});
                    this.setState({alertBool: true});
                    return;
                }
            } catch (e) {
                if (e instanceof RangeError) {
                    this.setState({alertMsg: "Invalid date of birth."});
                    this.setState({alertBool: true});
                    return;
                }
            }
        }


        if (emailBool) {
            // TODO: check if new email is already in use
            // TODO: if available, send email with verification link
        }

        // PUT requests
        // get account id from username
        //console.log(this.state.auth_username + "asdf this si");
        AccountService.getAccountByUsername(this.state.auth_username).then(res_first => {
            if (res_first.data) {
                const accountId = res_first.data.account_id;
                if (emailBool) {
                    let accountEmail = {account_id: accountId, email: this.state.email};
                    AccountService.updateAccountEmail(accountEmail).then(res => {
                        if (res.data !== "") {
                            // success
                            this.setState({ successMessage: "Email successfully changed!"});
                            this.setState({ successBool: true, username: localStorage.getItem('username') });
                        } else {
                            // failure
                            this.setState({ alertMsg: "That email is taken, please try again."});
                            this.setState({ alertBool: true });
                        }
                    });
                }
                if (usernameBool) {
                    let accountUsername = {account_id: accountId, username: this.state.username};
                    AccountService.updateAccountUsername(accountUsername).then(res => {
                        if (res.data !== "") {
                            // success
                            this.setState({ successMessage: "Username successfully changed!"});
                            this.setState({ successBool: true });
                            console.log("success");
                            localStorage.setItem('username', this.state.username);
                        } else {
                            // failure
                            console.log("failure");
                            this.setState({ alertMsg: "That username is taken, please try again."});
                            this.setState({ alertBool: true });
                        }
                    });
                }
                if (passwordBool) {

                    this.state.password = CryptoJS.AES.encrypt(this.state.password, secret).toString();
                    console.log("DECRUPt =" + CryptoJS.AES.decrypt(this.state.password, secret).toString(CryptoJS.enc.Utf8));
                    let accountPassword = {account_id: accountId, crypt_password: this.state.password};

                    AccountService.updateAccountPassword(accountPassword).then(res => {
                        if (res.data !== "") {
                            // success
                            this.setState({ successMessage: "Password successfully changed!"});
                            this.setState({ successBool: true, username: localStorage.getItem('username') });
                        } else {
                            // failure
                            this.setState({ alertMsg: "Failed to change password, please try again."});
                            this.setState({ alertBool: true });
                        }
                    });
                }
            }
        });

    }

    /**
     * Handles 'back' button
     */
    handleBack = e => {
        e.preventDefault();
        this.setState({toCredRequest: true});
    }



    render() {
        // for backing up and rendering <CredRequestScreen/>
        if (this.state.toCredRequest) {
            return <CredRequestScreen />;
        }
        if (this.state.successBool) {
            return (
                <div>
                {/* success alert/notification */}
                <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.successBool}
                onClose={e => this.setState({successBool: false})}
                autoHideDuration={5000}>
                <SnackbarContent style={{backgroundColor: "#3ea61e"}}
                message={this.state.successMessage}/>
                </Snackbar>
                    <Paper elevation={8} style={{
                        backgroundColor: "#f5f5f5",
                        margin: "auto",
                        padding: "20px",
                        "text-align": "center"
                    }} id="login_cont">
                        <Typography>
                            <h1>
                                Successfully changed credentials!
                            </h1>
                            <h2>
                                <a href={"/profile/" + this.state.username}><Button>Return to Profile</Button></a>
                            </h2>
                        </Typography>
                    </Paper>

                </div>
            )
        }
        return (

            <div>
                {/* error alert/notification */}
                <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                open={this.state.alertBool}
                onClose={e => this.setState({alertBool: false})}
                autoHideDuration={5000}>
                <SnackbarContent style={{backgroundColor: "#D32F2F"}}
                message={this.state.alertMsg}/>
                </Snackbar>

                {/* physical componenets of form */}
                <Box ml={2} mt={2}>
                <Typography variant="h5">Credentials Change</Typography>
                </Box>
                <Divider/><Divider/><Divider/><Divider/><Divider/>
                <Box ml={2} mt={2}>
                    <Box mr={1} mb={1} style={{display: this.state.bools.emailBool ? 'inline-block' : 'none'}}>
                    <TextField variant="outlined" label="Email" size="small"
                    defaultValue={this.state.email}
                    onChange={e => this.setState({email: e.target.value})}
                    />
                    </Box>
                    <Box mr={1} mb={1} style={{display: this.state.bools.usernameBool ? 'inline-block' : 'none'}}>
                    <TextField variant="outlined" label="Username" size="small"
                    defaultValue={this.state.username}
                    onChange={e => this.setState({username: e.target.value})}
                    />
                    </Box>
                    <Box mr={1} mb={1} style={{display: this.state.bools.fnameBool ? 'inline-block' : 'none'}}>
                    <TextField variant="outlined" label="First Name" size="small"
                    defaultValue={this.state.fname}
                    onChange={e => this.setState({fname: e.target.value})}
                    />
                    </Box>
                    <Box mr={1} mb={1} style={{display: this.state.bools.lnameBool ? 'inline-block' : 'none'}}>
                    <TextField variant="outlined" label="Last Name" size="small"
                    defaultValue={this.state.lname}
                    onChange={e => this.setState({lname: e.target.value})}
                    />
                    </Box>
                    <Box mr={1} mb={1} style={{display: this.state.bools.dobBool ? 'inline-block': 'none'}}>
                    <TextField variant="outlined" label="D.O.B (yyyy-mm-dd)" size="small"
                    defaultValue={this.state.dob}
                    onChange={e => this.setState({dob: e.target.value})}
                    />
                    </Box>
                    <Box mr={1} mb={1} style={{display: this.state.bools.passwordBool ? 'inline-block': 'none'}}>
                    <TextField size="small" variant="outlined" label="New Password" type="password"
                    onChange={e => this.setState({password: e.target.value})}
                    />
                    </Box>
                    <Box mr={1} mb={1} style={{display: this.state.bools.passwordBool ? 'inline-block': 'none'}}>
                    <TextField size="small" variant="outlined" label="Re-Enter Password" type="password"
                    onChange={e => this.setState({secPassword: e.target.value})}
                    />
                    </Box>
                    <Box mt={1}>
                        <Box mr={1} mb={1}style={{display: 'inline-block'}}>
                        <Button color="primary" variant="contained" size="large"
                        onClick={this.handleSubmit}
                        >Submit</Button>
                        </Box>
                        <Box style={{display: 'inline-block'}}>
                        <Button color="secondary" variant="outlined" size="large"
                        onClick={this.handleBack}
                        >Back</Button>
                        </Box>
                    </Box>
                </Box>
            </div>
        );
    }
}