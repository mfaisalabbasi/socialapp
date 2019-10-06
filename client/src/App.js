import React, { useEffect } from "react";
import "./App.css";
import { Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddEducation from "./components/profile-form/AddEducation";
import AddExperience from "./components/profile-form/AddExperience";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import PrivateRoute from "./components/routing/PrivateRoute";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layouts/Alert";
import history from "./history";
import { loadUser } from "./actions/auth";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch(() => loadUser());
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router history={history}>
      <div className='App'>
        <Navbar />
        <Route exact path='/' component={Landing} />
        <section className='container'>
          <Alert />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/profiles' component={Profiles} />
          <Route exact path='/profile/:id' component={Profile} />
          <Switch>
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/create-profile'
              component={CreateProfile}
            />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/edit-profile' component={EditProfile} />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/add-experience'
              component={AddExperience}
            />
          </Switch>
          <Switch>
            <PrivateRoute
              exact
              path='/add-education'
              component={AddEducation}
            />{" "}
          </Switch>
          <Switch>
            <PrivateRoute exact path='/posts' component={Posts} />
          </Switch>
          <Switch>
            <PrivateRoute exact path='/posts/:id' component={Post} />
          </Switch>
        </section>
      </div>
    </Router>
  );
};
export default App;
