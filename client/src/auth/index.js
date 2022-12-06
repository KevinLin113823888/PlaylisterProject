import React, { createContext, useEffect, useState,useContext } from "react";
import { useHistory } from 'react-router-dom'
import api, { getLoggedIn } from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ACCOUNT_ERROR: "ACCOUNT_ERROR",
    ACCESS_ERROR: "ACCESS_ERROR"
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        accounterr: false,
        message: "",
        accesserr: false
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    accounterr: false,
                    message: "",
                    accesserr: false
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    accounterr: false,
                    message: "",
                    accesserr: false
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    accounterr: false,
                    message: "",
                    accesserr: false
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    accounterr: false,
                    message: "",
                    accesserr: false
                })
            }
            case AuthActionType.ACCOUNT_ERROR: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    accounterr: payload.err,
                    message: payload.msg,
                    accesserr: false
                })
            }
            case AuthActionType.ACCESS_ERROR: {
                return setAuth({
                    user: auth.user,
                    loggedIn: true,
                    accounterr: false,
                    message: "",
                    accesserr: payload
                })
            }
            default:
                return auth;
        }
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.GET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user
                }
            });
        }
    }
    auth.checkLoggedIn = async function () {
      
        try{
            const response = await api.getLoggedIn();
            if(response.status === 200){
            }
         }catch(e){
            if(e.response){
                console.log(e);
                auth.getLoggedIn();
            }
         }
    }

    auth.registerUser = async function(userName,firstName, lastName, email, password, passwordVerify) {
         
    try{
        const response = await api.registerUser(userName,firstName, lastName, email, password, passwordVerify);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.REGISTER_USER,
                payload: {
                    user: response.data.user
                }
            })
            history.push("/login");
        }
        //auth.loginUser(email,password);
    } catch(err2){
        if (err2.response) {
            console.log(err2.response.status);
            console.log(err2.message);
            console.log(err2.response.headers); // 👉️ {... response headers here}
            console.log(err2.response.data.errorMessage);
            authReducer({
                type: AuthActionType.ACCOUNT_ERROR,
                payload: {
                    err: true,
                    msg : err2.response.data.errorMessage
                }
            })
          }
    }finally{
          
        /*authReducer({
            type: AuthActionType.ACCOUNT_ERROR,
            payload: true
        })*/
    }
        
    }

    auth.loginUser = async function(email, password) {
        console.log("HI");
        try{
        const response = await api.loginUser(email, password);
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.LOGIN_USER,
                payload: {
                    user: response.data.user
                }
            })
            /*sessionStorage.setItem("autosave", JSON.stringify( {user: response.data.user,
                loggedIn: true,
                accounterr: false,
                message: ""}
            ));
            console.log("BRO");
            console.log(sessionStorage.getItem("autosave"));*/
            history.push("/playlist/");
        }
        } catch(err){
            if (err.response) {
                
                authReducer({
                    type: AuthActionType.ACCOUNT_ERROR,
                    payload: {
                        err: true,
                        msg : err.response.data.errorMessage
                    }
                })
              }
        } finally{
          
            /*authReducer({
                type: AuthActionType.ACCOUNT_ERROR,
                payload: true
            })*/
        }
        
      /*  console.log("HEY");
        if(response.status === 401){
            console.log("HEY");
            authReducer({
                type: AuthActionType.ACCOUNT_ERROR,
                payload: null
            })
        }*/
    }
    auth.setAccountErr = function(){
        authReducer( {
            type: AuthActionType.ACCOUNT_ERROR,
            payload: {
                err: true,
                msg: ""
            }
        })
    }
    auth.hideAccountErr = function(){
        authReducer( {
            type: AuthActionType.ACCOUNT_ERROR,
            payload: {
                err: false,
                msg: ""
            }
        })
    }
    auth.hideAccessErr=function(){
        authReducer( {
            type: AuthActionType.ACCESS_ERROR,
            payload: false
        })
    }
    auth.setAccessErr=function(){
        authReducer( {
            type: AuthActionType.ACCESS_ERROR,
            payload: true
        })
    }
    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            /*sessionStorage.setItem("autosave", JSON.stringify( {user: null,
                loggedIn: false,
                accounterr: false,
                message: ""}
            ));*/
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };