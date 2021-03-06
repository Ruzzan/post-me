import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Navbar from './components/Navbar';
import PostList from './components/List';
import PostDetail from './components/Detail';
import CreateForm from './components/Create';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile';
import {UserProvider} from './context/UserContext';
import EditPost from './components/Edit';

function App() {
  return (
    <main>
    <Switch>
    <UserProvider>
    <Navbar />
    <Route path="/" component={PostList} exact/>
    <Route path="/post/:postId" component={PostDetail}/>
    <Route path="/create" component={CreateForm}/>
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/signup" component={Signup} />
    <Route path="/edit/:postId" component={EditPost} />
    <Route path="/user" component={Profile} />
    </UserProvider>
    </Switch>
    </main>
  );
}

export default App;
