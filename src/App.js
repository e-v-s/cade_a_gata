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
  const [coleiras, setColeiras] = useState([]);
  const [coleirasTeste, setColeirasTeste] = useState([]);
  let dbColeiras = firebase.storage().ref('coleiras').listAll();
  // let db = firebase.firestore().ref('coleiras');
  // let dbCaminhas = firebase.storage().ref('caminhas').listAll();
  // let dbArranhadores = firebase.storage().ref('arranhadores').listAll();
  let lista = [];

  let listaTeste = [];

  useEffect(() => {
    dbColeiras.then(res => res.items.forEach( folderRef => {
			firebase.storage().ref(folderRef.fullPath).getDownloadURL().then(res => {lista.push(res)}).then(() => {return setColeiras([...lista])})
    }));

    firebase.firestore().collection('coleiras').get().then(snapshot => snapshot.forEach(i => {
      listaTeste.push({
        id: i.id,
        url: firebase.storage().refFromURL(`${i.data().produto}`).getDownloadURL().then( i => {return `${i}`}),
        value: i.data().valor,
        reference: i.data().ref,        
      })
    })).then(() => {return setColeirasTeste(listaTeste)});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="App">
      <Header />
      <Login coleiras={coleiras} coleirasTeste={coleirasTeste} />   
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
