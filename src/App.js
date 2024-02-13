import React, { useCallback, useState } from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlace';
import UserPlaces from './places/pages/UsersPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/context/auth-context';

function App() {

  const [isLoggedIn,setIsLoggenIn]=useState(false);
  const[userId,setUserId]=useState(false);

  const login=useCallback(uid=>{
    setIsLoggenIn(true);
    setUserId(uid);
  },[]);

  const logout=useCallback(()=>{
    setIsLoggenIn(false);
    setUserId(null);
  },[]);

  let routes;

  if(isLoggedIn){//if loggend in user different routes
    routes=(
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces/>
        </Route>
        <Route path='/places/new' exact>
          <NewPlaces/>
        </Route>
        <Route path='/places/:placeId' exact>
          <UpdatePlace/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    );
  }else{// for not logged in users routes
    routes=(
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces/>
        </Route>
        <Route path='/auth' exact>
          <Auth/>
        </Route>
        <Redirect to="/auth"/>
      </Switch>
    );
  }

  return(
    <AuthContext.Provider value={{isLoggedIn:isLoggedIn, userId:userId, login:login, logout:logout}}>
      <Router>
     <MainNavigation/> 
     <main>
    {/* //   self closing tag as we dont want to show anthing inside it and dont want to render inside it here, above all i.e from switch also no matter what this header should come on every page thats why */}
        {/* renders there in the routes variables*/}
        {routes}
        <Redirect to="/"/>
      </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
