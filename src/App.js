import React from 'react';
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom';
import Users from './user/pages/Users';
import NewPlaces from './places/pages/NewPlace';
import UserPlaces from './places/pages/UsersPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

function App() {
  return(
    <Router>
     <MainNavigation/> 
     <main>
    {/* //   self closing tag as we dont want to show anthing inside it and dont want to render inside it here, above all i.e from switch also no matter what this header should come on every page thats why */}
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path='/places/new' exact>
          <NewPlaces/>
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces/>
        </Route>
        <Redirect to="/"/>
      </Switch>
      </main>
    </Router>
  );
};

export default App;
