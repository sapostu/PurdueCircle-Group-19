import React from "react";

// globally tracks whether a user is logged in and their account id
// to use, import 'UserContext' through which you can access its values and setters
export const UserContext = React.createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    accountId: "",
    setAccountId: () => {}
});