import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebase';
import 'firebase/auth';
import React, { useEffect, useState } from 'react';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [currentUser, setCurrentUser] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(() => {
				console.log('logged')
			})
			.catch( error => {
				console.error(error)
			})
	}

	const Dashboard = () => {
		const handleSignOut = () => {
			firebase.auth().signOut();
		};

		return(
			<div>
				<button className={css(style.btn)} onClick={() => handleSignOut()}>Logout</button>
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
				<form className={css(style.loginSection)} autocomplete="off">
					<input
						className={css(style.input)} 
						type='email' 
						value={email} 
						onChange={e => setEmail(e.target.value)} 
						placeholder='email' id='email' 
					/>
					<input
						className={css(style.input)} 
						type='password' 
						value={password} 
						onChange={e => setPassword(e.target.value)} 
						placeholder='senha' 
					/>
					<button className={css(style.btn)} onClick={(e) => handleSubmit(e)}>Login</button>
			</form> : <Dashboard />
			}
		</div>
	)
}

const style = StyleSheet.create({
	loginSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '60px',
	},
	input: {
		margin: '10px 0',
		fontSize: '20px',
		padding: '5px',
		border: '1px solid #DADEE1',
		backgroundColor: '#FFF4F2',
	},
	btn: {
		width: '120px',
		padding: '20px',
		marginTop: '20px',
		borderRadius: '10px',
		fontSize: '20px',
		outline: 'none',
		backgroundColor: '#E1B0A2',
		border: 'none',
		fontFamily: `'Source Sans Pro', sans-serif`,
		fontWeight: '300'
	}
})

export default Login;
