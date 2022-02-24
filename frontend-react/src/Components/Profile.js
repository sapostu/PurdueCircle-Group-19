import React, {  Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";

import { Typography, Button, Card, CardContent, CardActions, CardHeader, Box, AppBar, Toolbar } from '@material-ui/core';


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

class Profile extends Component {
    constructor(props) {
        super(props);


        this.state = {
            // TODO : populate username and bio variables with the user's actual username and bio
            username: '',
            bio: '',
            exists: true
        }

      /*  axios.get('http://localhost:8080/account/getByUsername/'.concat(this.props.router.params.username)).then(function (response) {
            console.log(response);
            this.setState({ username: response.data.username });
            this.setState({ bio: response.data.bio });
        }); */

    }

    componentDidMount() {
        console.log(this.props);
        console.log(this.props.router.params.username);
        axios.get('http://localhost:8080/account/getByUsername/'.concat(this.props.router.params.username)).then((response) => {
            console.log(response);
            this.setState({ username: response.data.username });
            this.setState({ bio: response.data.bio });
        });
    }

    render() {
        console.log(this.state.bio)

        // if (this.state.username.length === 0) {
        //     return (<Typography align='center' variant='h4' style={{ padding: "20px"}}>Oops! Looks like there's nothing here...</Typography>);
        // }
        if (this.state.redir) {
            //    return <Navigate to={`/${this.context.accountId}`}/>;
                  return <Navigate to={'/success' + this.state.username}/>
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
                        
                        <Card sx={{ maxWidth: "10%" }} style={{ transform: "translate(-50%, -0%)", "width": "25vw", "height": "35vh", backgroundColor: "#e0e0e0" }} square elevation={0} variant="outlined">
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


export default withRouter(Profile);
