import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PostService from '../Services/PostService';

import { Typography, Button, Card, CardContent, CardActions, CardHeader, Grid, TextField, Snackbar, SnackbarContent, Checkbox, FormControlLabel } from '@material-ui/core';
class CreatePost extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // TODO : populate username and bio variables with the user's actual username and bio
            accountID: localStorage.getItem('accountId'),
            bio: '',
            errorName: false,
            errorBio: false,
            redir: false,
            anonymous: 0,
            tagName: ""

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setBioError = this.setBioError.bind(this);
        this.handleChangeAnonymous = this.handleChangeAnonymous.bind(this);
    }


    handleChangeAnonymous() {
        console.log(this.state.anonymous);
        this.setState({anonymous: this.state.anonymous == 0 ? 1 : 0 })

    }

    setBioError() {
        this.setState({errorBio: false});
    }

    handleSubmit() {
        if (this.state.bio.length > 281) {
            this.setState({errorBio: true});
            return;
        }
        let post = {accountId: this.state.accountID, dateOfPost: "2021-11-19", type: "TEXT", bio: this.state.bio, isAnon: this.state.anonymous, tagName: this.state.tagName }
        console.log('\n\n post =>' + JSON.stringify(post));
    
        PostService.createPost(post).then( (res) => {
            console.log(res)
            this.setState({redir: true});
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

    render() {
        if (this.state.redir) {
            window.location.reload();
            //return <Navigate to={'/post'}/>;
        }
        return (
            <>
            <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            open={this.state.errorBio}
            onClose={this.setBioError}
            autoHideDuration={5000}>
            <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure your post is no more than 281 characters"/>
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
                        <CardContent style={{ height: "12vh", 'object-fit': 'contain'}}>
                            <Typography gutterBottom variant="h5" component="div">
                                <TextField id="filled-static" label="Enter Topic Name" defaultValue={this.state.tagName} name='tagName' onChange={this.handleChange}></TextField> 
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            <TextField
                            id="filled-multiline-static"
                            label="Write your post here..."
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
                            <FormControlLabel
                                control={<Checkbox
                                    checked={this.state.anonymous}
                                    onChange={this.handleChangeAnonymous}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                        />}
                                label="Anonymous"
                            />
                            <Button size="small" onClick={this.handleSubmit}>Submit</Button>
                            <Link to="/profile_temp" style={{ color: "inherit", "text-decoration": "none" }}><Button size="small">Cancel</Button></Link> {/* TODO : edit the link to profile to link to the actual profile */}
                            <Link to="/delete" style={{ color: "inherit", "text-decoration": "none" }}><Button size="small">Delete</Button></Link>
                        </CardActions>
                    </Card>
                </div>
    
            </div>
            
            </>
        );
    }
}

export default CreatePost;
