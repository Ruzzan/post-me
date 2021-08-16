import React,{createContext,useReducer} from 'react';

const userState = {
    user:JSON.parse(localStorage.getItem("user"))||"",
    isAuthenticated:false,
}

export const UserContext = createContext(userState);

const ACTIONS = {
    LOGIN:"login", 
    LOGOUT:'logout',
    IS_AUTH:"isAuth", // check if authenticated or not
}

function reducer(state,action) {
    switch(action.type) {
        case ACTIONS.LOGIN:
            localStorage.setItem("user",JSON.stringify(action.payload))
            return {...state,isAuthenticated:true};

        case ACTIONS.LOGOUT:
            localStorage.clear();
            console.log(state)
            return {...state,isAuthenticated:false};

        case ACTIONS.IS_AUTH: // this will check in localStorage and update state
            if(localStorage.getItem("user") !== null) {
                console.log("called in action")
                return {...state,isAuthenticated:true}
            }
            return {...state,isAuthenticated:false}
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

    function isAuth() {
        dispatch({type:ACTIONS.IS_AUTH})
    }

    return (<UserContext.Provider value={{
        user:state,
        login:login,
        logout:logout,
        isAuth:isAuth,
    }}>
            {children}
            </UserContext.Provider>
        )
}