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
} from "react-router-dom";
import Login from './components/login';
import Footer from './components/footer';

function App() {
  const [coleiras, setColeiras] = useState([]);
  const [caminhas, setCaminhas] = useState([]);
  const [arranhadores, setArranhadores] = useState([]);
  let [width, setWidth] = useState(window.innerWidth);
  
  let lista = [];
  let listaCaminhas = [];
  let listaArranhadores = [];
  
  useEffect(() => {
    firebase.firestore().collection('coleiras').get().then(snapshot => snapshot.forEach(i => {
      firebase.storage().refFromURL(`${i.data().produto}`).getDownloadURL().then( url => {
        return lista.push({
          id: i.id,
          url: url,
          value: i.data().valor,
          reference: i.data().ref,        
        })
      })
    })).then(() => {return setColeiras(lista)});

    firebase.firestore().collection('caminhas').get().then(snapshot => snapshot.forEach(i => {
      firebase.storage().refFromURL(`${i.data().produto}`).getDownloadURL().then( url => {
        return listaCaminhas.push({
          id: i.id,
          url: url,
          value: i.data().valor,
          reference: i.data().ref,        
        })
      })
    })).then(() => {return setCaminhas(listaCaminhas)});

    firebase.firestore().collection('arranhadores').get().then(snapshot => snapshot.forEach(i => {
      firebase.storage().refFromURL(`${i.data().produto}`).getDownloadURL().then( url => {
        return listaArranhadores.push({
          id: i.id,
          url: url,
          value: i.data().valor,
          reference: i.data().ref,        
        })
      })
    })).then(() => {return setArranhadores(listaArranhadores)});

    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="App">
      <Header />
      <Body coleiras={coleiras} caminhas={caminhas} arranhadores={arranhadores} widthListener={width} />          
      <Footer />      
    </div>
  );
}

export default App;

// {
//   window.location.href === 'https://cade-a-gata.vercel.app/' ? 
//   <Body coleiras={coleiras} caminhas={caminhas} arranhadores={arranhadores} widthListener={width} />
//   : 
//   <Router>
//     <Link to='/login' />
//     <Switch>
//       <Route path='/login'>
//       {
//         coleiras !== 0 ? <Login coleiras={coleiras} caminhas={caminhas} arranhadores={arranhadores} /> : <Login coleiras={coleiras} caminhas={caminhas} arranhadores={arranhadores} />
//       }      
//       </Route>
//     </Switch>
//   </Router>
// }      
