import './App.css';
import Signup from './Signup';
import {BrowserRouter,Route, Switch,useHistory} from 'react-router-dom';
import Signin from './Signin';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Switch>
          <Route path="/home">
     <Home />
   </Route>
   
   <Route exact path="/">
     <Signup />
   </Route>
   <Route path="/signin">
     <Signin/>
   </Route>

      </Switch>
      </BrowserRouter>
 
    </div>
  );
}

export default App;
