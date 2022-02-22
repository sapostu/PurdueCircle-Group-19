import {  Component } from 'react';
import { Link } from 'react-router-dom';


import { Typography, Button, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';

class Profile extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            // TODO : populate username and bio variables with the user's actual username and bio
            username: 'ExampleUsername',
            bio: 'Bio that is 260 charactersBio that is 20 charactersBio that is 260 charactersBio that is 260 charactersBio that is 260 charactersBiothat is 260 charactersBio that is 260 charactersBio that is 260 charactersBio that is 260 charactersBio that is 260 charactersadding21characters123',

        }

        this.handleEdit = this.handleEdit.bind(this);

    }

    handleEdit() {
        if (this.state.username.length > 15 || this.state.username.length < 3) {
            this.setState({errorName: true});
            return;
        }

        if (this.state.bio.length > 281) {
            this.setState({errorBio: true});
            return;
        }

        // TODO : Actually submit the information stored in the bio and username variables
    }

    render() {
        return (
            <>
            <div style={{
            display: "flex",
            backgroundColor: "#f5f5f5",
            position: "absolute",
            top: 0, left: 0,
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
                    <Card sx={{ maxWidth: "10%" }} style={{ transform: "translate(-50%, -0%)", width: "25vw", height: "35vh", backgroundColor: "#e0e0e0" }} square elevation={0} variant="outlined">
                        <CardHeader style={{ height: "1.5vh", backgroundColor: "#f5f5f5" }}>
    
                        </CardHeader>
                        <div style={{'height': '200px', 'width': '200px', "padding-left": '20px', "padding-top": '5px'}}>
                            <img src='https://www.w3schools.com/html/img_chania.jpg' style={{'height': '100%', 'width': '100%', 'object-fit': 'contain'}} alt="Profile"/>
                        </div> {/* TODO : use a real profile picture*/}
                        <CardContent style={{ height: "9vh", 'object-fit': 'contain'}}>
                            <Typography gutterBottom variant="h5" component="div">
                                {this.state.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {this.state.bio}
                            </Typography>
                        </CardContent>
                        <CardActions style={{"padding-left": "0.5vw"}}>
                            <Button size="small">Follow</Button> {/* TODO : Add following functionality */}
                            <Button size="small"><Link to="/edit" style={{ color: "inherit", "text-decoration": "none" }}>Edit</Link></Button> {/* TODO : Add edit functionality and hide the button for users that are not on their own pages */}
                        </CardActions>
                    </Card>
                </div>
    
            </div>
            
            </>
        );
    }
}


export default Profile;
