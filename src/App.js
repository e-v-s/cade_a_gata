import Header from './components/header';
import firebase from './utils/firebase';
import 'firebase/storage';
import 'firebase/firestore';
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
  const [coleirasTeste, setColeirasTeste] = useState([]);
  // let db = firebase.firestore().ref('coleiras');
  // let dbCaminhas = firebase.storage().ref('caminhas').listAll();
  // let dbArranhadores = firebase.storage().ref('arranhadores').listAll();

  let listaTeste = [];

  useEffect(() => {
    firebase.firestore().collection('coleiras').get().then(snapshot => snapshot.forEach(i => {
      firebase.storage().refFromURL(`${i.data().produto}`).getDownloadURL().then( url => {
        return listaTeste.push({
          id: i.id,
          url: url,
          value: i.data().valor,
          reference: i.data().ref,        
        })
      })
    })).then(() => {return setColeirasTeste(listaTeste)});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="App">
      <Header />
      {
        window.location.href === 'https://cade-a-gata.vercel.app/' ? 
        <Body />
        : 
        <Router>
          <Link to='/login' />
          <Switch>
            <Route path='/login'>
            {
              coleirasTeste !== 0 ? <Login coleirasTeste={coleirasTeste} /> : <Login coleirasTeste={coleirasTeste} />
            }      
            </Route>
          </Switch>
        </Router>
      }                  
    </div>
  );
}

export default App;

// {
//   window.location.href === 'https://cade-a-gata.vercel.app/' ? 
//   <Body />
//   : 
//   <Router>
//     <Link to='/login' />
//     <Switch>
//       <Route path='/login'>
//       {
//         coleirasTeste !== 0 ? <Login coleirasTeste={coleirasTeste} /> : <Login coleirasTeste={coleirasTeste} />
//       }      
//       </Route>
//     </Switch>
//   </Router>
// }      
