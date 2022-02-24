import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PostService from '../Services/PostService';

import { Typography, Button, Card, CardContent, CardActions, CardHeader, Grid, TextField, Snackbar, SnackbarContent } from '@material-ui/core';
class CreatePost extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // TODO : populate username and bio variables with the user's actual username and bio
            postID: '',
            redir: false

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleSubmit() {
        if (this.state.bio.length > 281) {
            this.setState({errorBio: true});
            return;
        }
        let post = {postId: this.state.postID}
        console.log('\n\n post =>' + JSON.stringify(post));
    
        PostService.deletePost(post).then( (res) => {
            console.log(res)
            //this.setState({redir: true});
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
            return <Navigate to={'/post'}/>;
        }
        return (
            <>
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
                                <TextField id="filled-static" label="Enter Post ID" defaultValue={this.state.postID} name='postID' onChange={this.handleChange}></TextField> 
                            </Typography>
                        </CardContent>
                        <CardActions style={{"padding-left": "0.5vw"}}>
                            <Button size="small" onClick={this.handleSubmit}>Submit</Button>
                            <Button size="small"><Link to="/profile_temp" style={{ color: "inherit", "text-decoration": "none" }}>Cancel</Link></Button> {/* TODO : edit the link to profile to link to the actual profile */}
                            <Button size="small"><Link to="/delete" style={{ color: "inherit", "text-decoration": "none" }}>Delete</Link></Button>
                        </CardActions>
                    </Card>
                </div>
    
            </div>
            
            </>
        );
    }
}

export default CreatePost;
