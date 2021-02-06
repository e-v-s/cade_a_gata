import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebase';
import 'firebase/auth';
import 'firebase/storage';
import React, { useEffect, useState } from 'react';

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [currentUser, setCurrentUser] = useState('');
	const [file, setFile] = useState('');
	const [product, setProduct] = useState('');
	const [uploadValue, setUploadValue] = useState(0);
	const [productType, setProductType] = useState('');

	useEffect(() => {		
		firebase.auth().onAuthStateChanged(user => {
			setCurrentUser(user);
		});

		if (uploadValue === 100 ) {
			setTimeout(() => {
				setUploadValue(0);
				setFile('');
			}, 2000); 
		};
	});

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

		const handleChangeUpload = (e) => {
			e.preventDefault();
			setFile(e.target.files[0]);
			setProduct(e.target.id);
		}


		const handleUpload = (e) => {
			e.preventDefault();

			const storageRef = firebase.storage().ref(`${e.target.id}/${file.name}`);
			let task = storageRef.put(file);		
						
			task.on('state_changed', (snapshot) => {
				let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
				setUploadValue(percentage)
			}, (error) => {
				console.error(error.message)
			});
		}

		return(
			<div>
				<button className={css(style.btn)} onClick={() => handleSignOut()}>Logout</button>
					<form>
						<h2>Nessa sessão você faz upload SÓ DE COLEIRAS</h2>
						<input id="coleirasUp" type="file" onChange={(e) => handleChangeUpload(e)} accept="image/png, image/jpeg" />
						{
							uploadValue !== 0 && product === 'coleirasUp' ? <progress max='100' value={uploadValue}>{uploadValue} %</progress> : null
						}						
						{
							file !== '' && product === 'coleirasUp' ? <div><button id="coleiras" onClick={(e) => handleUpload(e)}>Upload</button><button onClick={() => {setFile(''); setProduct('')}}>Cancelar upload</button></div> : <button id="coleiras" onClick={(e) => handleUpload(e)}>Upload</button>
						}						
					</form>
					<form>
						<h2>Nessa aqui SÓ DE caminhas</h2>
						<input id="caminhasUp" type="file" onChange={handleChangeUpload}></input>
						{
							uploadValue !== 0 && product === 'caminhasUp' ? <progress max='100' value={uploadValue}>{uploadValue} %</progress> : null
						}						
						{
							file !== '' && product === 'caminhasUp' ? <div><button id="caminhas" onClick={(e) => handleUpload(e)}>Upload</button><button onClick={() => {setFile(''); setProduct('')}}>Cancelar upload</button></div> : <button id="caminhas" onClick={(e) => handleUpload(e)}>Upload</button>
						}
					</form>
					<form>
						<h2>E nessa só de arranhadores</h2>
						<input id="arranhadoresUp" type="file" onChange={handleChangeUpload}></input>
						{
							uploadValue !== 0 && product === 'arranhadoresUp' ? <progress max='100' value={uploadValue}>{uploadValue} %</progress> : null
						}						
						{
							file !== '' && product === 'arranhadoresUp' ? <div><button id="arranhadores" onClick={(e) => handleUpload(e)}>Upload</button><button onClick={() => {setFile(''); setProduct('')}}>Cancelar upload</button></div> : <button id="arranhadores" onClick={(e) => handleUpload(e)}>Upload</button>
						}
					</form>
					<div>
						Aqui você olha o que tem em cada sessão:
						<div>
							<h2 onClick={() => {productType !== 'coleiras' ? setProductType('coleiras') : setProductType('')}}>Coleiras</h2>
							{
								productType === 'coleiras' ? props.coleiras.map(i => <img src={i} alt='' />) : null
							}
						</div>
						<div>
							<h2 onClick={() => {productType !== 'caminhas' ? setProductType('caminhas') : setProductType('')}}>Caminhas</h2>
							{
								productType === 'caminhas' ? <p>caminhas</p> : null
							}
						</div>
						<div>
							<h2>Arranhadores</h2>
						</div>
					</div>
			</div>
		)
	}	

  return(
		<div>			
			{
				currentUser === null ?  
				<form className={css(style.loginSection)} autoComplete="off">
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
