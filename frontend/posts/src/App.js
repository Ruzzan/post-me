import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Navbar from './components/Navbar';
import PostList from './components/List';
import CreateForm from './components/Create';
import Login from './components/Auth/Login';
import {UserProvider} from './context/UserContext';

function App() {
  return (
    <main>
    <Switch>
    <UserProvider>
    <Navbar />
    <Route path="/" component={PostList} exact/>
    <Route path="/create" component={CreateForm}/>
    <Route path="/login" component={Login} />
    </UserProvider>
    </Switch>
    </main>
  );
}

export default App;
