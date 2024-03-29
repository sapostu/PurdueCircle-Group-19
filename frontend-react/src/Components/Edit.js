import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import EditService from '../Services/EditService';
import AccountService from '../Services/AccountService';
import { Typography, Button, Card, CardContent, CardActions, CardHeader, Grid, TextField, Snackbar, SnackbarContent } from '@material-ui/core';


class Edit extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // TODO : populate username and bio variables with the user's actual username and bio
            username: '',
            bio: '',
            errorName: false,
            errorBio: false,
            redir: false,
            new_pic: null,
            isAuthenticated: localStorage.getItem('isAuthenticated'),
            authUsername: localStorage.getItem('username'),
            dmStatus: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setNameError = this.setNameError.bind(this);
        this.setBioError = this.setBioError.bind(this);
        this.setDMs = this.setDMs.bind(this);

    }

    // gets the original profile pic so users can see the change
    
    setNameError() {
        this.setState({errorName: false});
    }

    setBioError() {
        this.setState({errorBio: false});
    }

    setDMs() {
        AccountService.setReqFollowing(localStorage.getItem('accountId')).then((response) => {
            if (this.state.dmStatus === "Private") {
                this.setState({ dmStatus: "Public" });
            } else {
                this.setState({ dmStatus: "Private" });
            }
        });
    }

    handleSubmit() {

        if (this.state.bio.length > 200) {
            this.setState({errorBio: true});
            return;
        }
        let account = {username: this.state.authUsername, bio: this.state.bio, profile_pic: this.state.new_pic}
        console.log('\n\n account =>' + JSON.stringify(account));
    
        EditService.editAccount(account).then( (res) => {
            console.log("new values:" + res.data)
            this.setState({redir: true})
          if (res.data !== "") {
            //console.log(res.data.username);
            //this.setState({username: res.data.username});
            //this.setState({toProfile: true});
          } else {
            //this.setState({errorCredentials: true});
          }

       //   this.props.history.push('/profile');
        });
        // TODO : Actually submit the information stored in the bio and username variables

    }    

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
          })
    }

    componentDidMount() {
        AccountService.getAccountById(localStorage.getItem('accountId')).then((response) => {
            console.log(response.data);
            this.setState({ bio: response.data.bio });
            if (response.data.req_following === 1) {
                this.setState({ dmStatus: "Public" });
            } else {
                this.setState({ dmStatus: "Private" });
            }
        });
    }

    render() {
        if (this.state.redir) {
            return <Navigate to={'/profile/' + this.state.authUsername}/>;        
        }
        return (
            <>
            <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            open={this.state.errorName}
            onClose={this.setNameError}
            autoHideDuration={5000}>
            <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your username is between 3 and 15 characters"/>
            </Snackbar>
            <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            open={this.state.errorBio}
            onClose={this.setBioError}
            autoHideDuration={5000}>
            <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your bio is no more than 281 characters"/>
            </Snackbar>
            <div style={{
            display: "flex",
            backgroundColor: "#f5f5f5",
            position: "absolute",
            top: 'relative', left: 0,
            width: "100vw",
            height: "100vh"
            }}>
                <div style={{
                display: "flex",
                backgroundColor: "#f5f5f5",
                position: "absolute",
                top: "0", left: "50%",
                width: "40vw",
                height: "40vh",
                }}> 
                    <Card sx={{ maxWidth: "10%" }} style={{ transform: "translate(-50%, -0%)", width: "25vw", height: "38vh", backgroundColor: "#e0e0e0" }} square elevation={0} variant="outlined">
                        <CardHeader style={{ height: "1.5vh", backgroundColor: "#f5f5f5" }}>
    
                        </CardHeader>
                        <Grid container>
                            <Grid item xs={4}>
                            <div style={{'height': '200px', 'width': '200px', "padding-left": '20px', "padding-top": '5px'}}>
                                <img src= {this.state.new_pic || 'https://www.w3schools.com/html/img_chania.jpg'} style={{'height': '100%', 'width': '100%', 'object-fit': 'contain'}} alt="Profile"/>
                                </div>
    
                            </Grid>
                            <Grid item xs={4}>
                                <select id="pics" defaultValue="Choose a New Profile Pic"
                                    onChange={(e) => this.setState({new_pic: e.target.value || null})}>
                                    <option value="">Default</option>
                                    <option value="/resources/guy.jpg">guy.jpg</option>
                                    <option value="/resources/pop.jpg">pop.jpg</option>
                                    <option value="/resources/shrek.jpg">shrek.jpg</option>
                                    <option value="/resources/obama_prism.jpg">obama_prism.jpg</option>
                                    <option value="/resources/music_make_you.jpg">music_make_you.jpg</option>
                                    <option value="/resources/mike.jpg">mike.jpg</option>
                                </select>
                            </Grid>
                        </Grid>
                        
                        <CardContent style={{ height: "12vh", 'object-fit': 'contain'}}>
                            <Typography variant="body2" color="text.secondary">
                            <TextField
                            id="filled-multiline-static"
                            label="Edit Bio"
                            multiline
                            rows={3}
                            defaultValue={this.state.bio}
                            variant="filled"
                            fullWidth
                            name='bio'
                            onChange={this.handleChange}
                            />
                            </Typography>
                        </CardContent>
                        <CardActions style={{"padding-left": "0.5vw"}}>
                            <Button size="small" onClick={this.handleSubmit}>Submit</Button>
                            <Button size="small"><Link to={"/profile/" + this.state.authUsername} style={{ color: "inherit", "text-decoration": "none" }}>Cancel</Link></Button> {/* TODO : edit the link to profile to link to the actual profile */}
                            <Button size="small"><Link to="/delete" style={{ display: this.state.isAuthenticated ? 'block' : 'none', color: "inherit", "text-decoration": "none" }}>Delete</Link></Button>
                            <Button size="small" onClick={this.setDMs}>Make DMs {this.state.dmStatus}</Button>
                        </CardActions>
                    </Card>
                </div>
    
            </div>
            
            </>
        );
    }
}

export default Edit;