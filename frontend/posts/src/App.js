import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Navbar from './components/Navbar';
import PostList from './components/List';
import CreateForm from './components/Create';

function App() {
  return (
    <main>
    <Navbar />
    <Switch>
    <Route path="/" component={PostList} exact/>
    <Route path="/create" component={CreateForm}/>
    </Switch>
    </main>
  );
}

export default App;
