import React from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/header/Header';
import Contact from './components/contact/Contact';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import useAuth from "./hooks/useAuth";

function App() {
  const auth = useAuth();
  console.log(auth.user);
  
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact component={Contact}/>
        <Route path='/login' component={Login}/>
        <Route path='/registration' component={Registration}/>
      </Switch>
      <Redirect to='/'/>
    </div>
  );
}

export default App;
