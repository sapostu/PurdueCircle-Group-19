import React, {createContext, Component} from 'react';

export const UserContext = createContext();

class UserProvider extends Component {
    state = {
        auth_username: "",
        isAuthenticated: false
    }

    logIn = (_username) => {
        // console.log("Entered context function...\n");
        // console.log("BEFORE USERNAME: "+ this.state.auth_username)
        // console.log("func username= "+ _username + "\n");

        
        this.setState({auth_username: _username, isAuthenticated: true});
        localStorage.setItem('username', _username);
        localStorage.setItem('isAuthenticated', true);



        // console.log("after username= "+ this.state.auth_username + "\n");
    }

    logOut = () => {
        this.setState({auth_username: "", isAuthenticated: false})
        sessionStorage.setItem('username', "");
        sessionStorage.setItem('isAuthenticated', false)
    }

    getUsername = () => {
        return this.state.auth_username;
    }

    isAuth = () => {
        return this.state.isAuthenticated;
    }

    render() {
        // const {username, isAuthenticated} = this.state;
        // const {logIn, logOut, getUsername, isAuth} = this;

        return(
            <UserContext.Provider value={{...this.state, logIn: this.logIn, logOut: this.logOut}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }

}


export default UserProvider;