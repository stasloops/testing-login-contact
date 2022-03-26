import React, { useEffect } from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/header/Header';
import Contact from './components/contact/Contact';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import ContactProfile from './components/contactProfile/ContactProfile';
import AddContact from './components/addContact/AddContact';
import { useTypedSelector } from './hooks/hooks/useTypedSelector';
import Profile from './components/Profile/Profile';

function App() {
  const {contact} = useTypedSelector(state => state.contact)

  useEffect(() => {
    console.log(contact);
  }, [contact])
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact component={Contact}/>
        {
          contact.map((item) => (
            <Route key={item.id} path={`/profile/${item.id}`}>
              <ContactProfile contact={item} />
            </Route>
          ))
        }
        <Route path='/add' component={AddContact}/>
        <Route path='/profile' component={Profile}/>
        <Route path='/login' component={Login}/>
        <Route path='/registration' component={Registration}/>
      </Switch>
      <Redirect to='/'/>
    </div>
  );
}

export default App;
