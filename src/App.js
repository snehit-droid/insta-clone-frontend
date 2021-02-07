import React, { useEffect, createContext, useReducer, useContext } from 'react';
import Navbar from './components/Navbar';
import "./App.css";
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './components/screens/Home';
import Signin from './components/screens/Signin';
import Profile from './components/screens/Profile';
import Signup from './components/screens/Signup';
import CreatePost from './components/screens/Createpost';
import {reducer, initialState} from './reducers/userReducer';
import UserProfile from './components/screens/UserProfile';
import SubscribedUserPosts from './components/screens/SubscribeUserPosts';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type: "USER", payload: user})
    } else {
      history.push('/signin')
    }
  }, [])

  return(
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/signin" exact>
        <Signin />
      </Route>
      <Route path="/signup" exact>
        <Signup />
      </Route>
      <Route path="/profile" exact>
        <Profile />
      </Route>
      <Route path="/create" exact>
        <CreatePost />
      </Route>
      <Route path="/profile/:userid" exact>
        <UserProfile />
      </Route>
      <Route path="/myfollowingpost" exact>
        <SubscribedUserPosts />
      </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
