import React,{createContext,useReducer} from 'react';

const userState = {
    user:JSON.parse(localStorage.getItem("user"))||"",
    isAuthenticated:false,
}

export const UserContext = createContext(userState);

const ACTIONS = {
    LOGIN:"login", 
    LOGOUT:'logout',
    AUTHENTICATE_USER:"isAuth", // check if authenticated or not
}

function reducer(state,action) {
    switch(action.type) {
        case ACTIONS.LOGIN:
            localStorage.setItem("user",JSON.stringify(action.payload))
            return {
                user:JSON.parse(localStorage.getItem("user")),
                isAuthenticated:true
            };

        case ACTIONS.LOGOUT:
            localStorage.clear();
            return {
                user:JSON.parse(localStorage.getItem("user")),
                isAuthenticated:false
            };

        case ACTIONS.AUTHENTICATE_USER: // this will check in localStorage and update state
            if(localStorage.getItem("user") !== null) {
                return {
                    user:JSON.parse(localStorage.getItem("user")),
                    isAuthenticated:true
                }
            }
          //  return {...state,isAuthenticated:false}
        default:
            return state;
    }
}

export const UserProvider = ({children}) => {

    const [state,dispatch] = useReducer(reducer,userState)

    function login(token,pk,username) {
        dispatch({
            type:ACTIONS.LOGIN,
            payload:{token:token,pk:pk,username:username},
        })
    }

    function logout() {
        dispatch({type:ACTIONS.LOGOUT})
    }

    function authenticateUser() {
        dispatch({type:ACTIONS.AUTHENTICATE_USER})
    }

    return (<UserContext.Provider value={{
        user:state,
        login:login,
        logout:logout,
        authenticateUser:authenticateUser,
    }}>
            {children}
            </UserContext.Provider>
        )
}