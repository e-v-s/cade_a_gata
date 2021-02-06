import Header from './components/header';
import Body from './components/body';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useParams
} from "react-router-dom";
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <Header />
      {
        window.location.href === 'https://cade-a-gata.vercel.app/' ? <Body /> : 
        <Router>
          <Link to='/login' />
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
          </Switch>
        </Router>
      }      
    </div>
  );
}

export default App;


// {
//   window.location.href === 'https://cade-a-gata.vercel.app/' ? <Body /> : 
//   <Router>
//     <Link to='/login' />
//     <Switch>
//       <Route path='/login'>
//         <Login />
//       </Route>
//     </Switch>
//   </Router>
// }      