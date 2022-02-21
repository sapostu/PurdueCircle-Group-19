import { useState, useEffect, useContext } from 'react';
import { styled } from '@material-ui/styles';
import { Typography, Box, Paper, Button, Card, CardContent, CardActions, CardMedia, CardHeader } from '@material-ui/core';

export default function Profile() {

    //TODO : Profile pictures would all ideally be the same size, maybe it should be done before adding them to the database, because it could save space, but it would fix the spacing issues

    // used to set the username and Bio
    const [username, setUsername] = useState('ExampleUsername')
    const [bio, setBio] = useState('Bio that is 260 charactersBio that is 20 charactersBio that is 260 charactersBio that is 260 charactersBio that is 260 charactersBiothat is 260 charactersBio that is 260 charactersBio that is 260 charactersBio that is 260 charactersBio that is 260 charactersadding21characters123')

    return(
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
                    <div style={{'height': '200px', 'width': '200px', "padding-left": '20px', "padding-top": '5px'}}><img src='https://www.w3schools.com/html/img_chania.jpg' style={{'height': '100%', 'width': '100%', 'object-fit': 'contain'}}></img></div> {/* TODO : use a real profile picture*/}
                    <CardContent style={{ height: "9vh", 'object-fit': 'contain'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {username}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {bio}
                        </Typography>
                    </CardContent>
                    <CardActions style={{"padding-left": "0.5vw"}}>
                        <Button size="small">Follow</Button> {/* TODO : Add following functionality */}
                        <Button size="small">Edit</Button> {/* TODO : Add edit functionality and hide the button for users that are not on their own pages */}
                    </CardActions>
                </Card>
            </div>

        </div>
        
        </>
        );
}
<CardMedia
                    component="img"
                    height="200px"
                    image="https://www.w3schools.com/html/img_chania.jpg"
                    alt="green iguana"
                    />
