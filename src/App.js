import Header from './components/header';
import firebase from './utils/firebase';
import 'firebase/storage';
import Body from './components/body';
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  // useParams
} from "react-router-dom";
import Login from './components/login';

function App() {
  const [coleiras, setColeiras] = useState([]);
  let dbColeiras = firebase.storage().ref('coleiras').listAll();
  // let dbCaminhas = firebase.storage().ref('caminhas').listAll();
  // let dbArranhadores = firebase.storage().ref('arranhadores').listAll();
  let lista = [];

  useEffect(() => {
    dbColeiras.then(res => res.items.forEach( folderRef => {
			firebase.storage().ref(folderRef.fullPath).getDownloadURL().then(res => {lista.push(res)}).then(() => {return setColeiras([...lista])})
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <Header />
      {
        window.location.href === 'https://cade-a-gata.vercel.app/' ? <Body /> : 
        <Router>
          <Link to='/login' />
          <Switch>
            <Route path='/login'>
              <Login coleiras={coleiras} />
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
//         <Login coleiras={coleiras} />
//       </Route>
//     </Switch>
//   </Router>
// }      
