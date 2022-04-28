import { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import PostService from '../Services/PostService';

import { Typography, Button, Card, CardContent, CardActions, CardHeader, Grid, TextField, Snackbar, SnackbarContent, Checkbox, FormControlLabel } from '@material-ui/core';

class SearchTopic extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // TODO : populate username and bio variables with the user's actual username and bio
            topic: '',
            redir: false,
            errorTopic: false

        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setTopicError = this.setTopicError.bind(this);
    }


    setTopicError() {
        this.setState({ errorTopic: false });
    }
    handleSubmit() {
        if (this.state.topic.length > 40) {
            this.setState({errorTopic: true});
            return;
        }
        this.setState({ redir: true })
    }    

    handleChange(e) {
        this.setState({
            [e.target.name] : e.target.value
          })
    }

    render() {
        if (this.state.redir) {
            return <Navigate to={'/topic/'.concat(this.state.topic)}/>;
        }
        return (
            <>
            <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            open={this.state.errorTopic}
            onClose={this.setTopicError}
            autoHideDuration={5000}>
            <SnackbarContent style={{backgroundColor: "#D32F2F"}} message="Please make sure the topic name is no more than 40 characters"/>
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
                    <Card sx={{ maxWidth: "10%" }} style={{ transform: "translate(-50%, -0%)", width: "25vw", height: "16vh", backgroundColor: "#e0e0e0" }} square elevation={0} variant="outlined">
                        <CardHeader style={{ height: "1.5vh", backgroundColor: "#f5f5f5" }}>
    
                        </CardHeader>
                        <CardContent style={{ height: "4vh", 'object-fit': 'contain'}}>
                            <Typography gutterBottom variant="h5" component="div">
                                <TextField id="filled-static" label="Enter Topic Name" defaultValue={this.state.topic} name='topic' onChange={this.handleChange}></TextField> 
                            </Typography>
                        </CardContent>
                        <CardActions style={{"padding-left": "0.5vw"}}>
                            <Button size="small" onClick={this.handleSubmit}>Submit</Button>
                        </CardActions>
                    </Card>
                </div>
    
            </div>
            
            </>
        );
    }
}

export default SearchTopic;
