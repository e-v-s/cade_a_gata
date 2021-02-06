import { StyleSheet, css } from 'aphrodite';
import firebaseui from 'firebaseui';
import firebase from '../utils/firebase';
import React, { useEffect, useState } from 'react';

function Login() {
	// Initialize the FirebaseUI Widget using Firebase.
	// let ui = new firebaseui.auth.AuthUI(firebase.auth());

	let FirebaseUserState = firebase.User; 

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		setLoading(true);

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('logged')
			})
			.catch( error => {
				console.error(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const Dashboard = () => {
		const handleSignOut = () => {
			firebase.auth().signOut();
		};

		return(
			<div>
				<button onClick={() => handleSignOut()}>Logout</button>
			</div>
		)
	}

	useEffect(() => {
		return firebase.auth().onAuthStateChanged(user => {
			setCurrentUser(user);
		})

	})

  return(
		<div>			
			{
				currentUser === null ?  
				<form className={css(style.loginSection)}>
					<input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='email' id='email'></input>
					<input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='senha'></input>
					<button onClick={(e) => handleSubmit(e)}>Login</button>
			</form> : <Dashboard />
			}
		</div>
	)
}

const style = StyleSheet.create({
	loginSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	}
})

export default Login;
