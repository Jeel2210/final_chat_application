import {Fragment} from "react";
import './App.css';
import {Switch,Route} from "react-router-dom";

import SignIn from './Components/Signin';
import SignUp from "./Components/Signup";
import Navbar from "./Pages/Navbar";
import News from "./Pages/News";
import Welcome from "./Pages/Welcome";
import About from "./Pages/About";
import List from "./Cart/list";
function App() {
  return (
    <Fragment>
      <Navbar/>
      <Switch>
      <Route path="/" exact>
          <Welcome/>
      </Route>
        <Route path="/signin">
          <SignIn/>
        </Route>
        <Route path="/signup">
          <SignUp/>
        </Route>
        <Route path="/news">
          <News/>
        </Route>
        <Route path="/about">
          <About/>
        </Route>
        <Route path="/list">
          <List/>
        </Route>
      </Switch>
    </Fragment>
  );
}
export default App;
