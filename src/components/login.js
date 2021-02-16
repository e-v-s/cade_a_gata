import { StyleSheet, css } from 'aphrodite';
import firebase from '../utils/firebase';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import UploadProduct from './uploadProduct';
import DeleteEditProduct from './deleteEditProduct';

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [currentUser, setCurrentUser] = useState('');
	const [file, setFile] = useState('');
	const [product, setProduct] = useState('');
	const [uploadValue, setUploadValue] = useState(0);
	const [productType, setProductType] = useState('');
	const [focus, setFocus] = useState('');
		
	let database = firebase.firestore();

	useEffect(() => {		
		firebase.auth().onAuthStateChanged(user => {
			setCurrentUser(user);
		});

		if (uploadValue === 100 ) {
			setTimeout(() => {
				setUploadValue(0);
				setFile('');
				window.location.reload();
				alert('Foto upada!');
				setFocus('');
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
		const [ref, setRef] = useState('');
		const [val, setVal] = useState(0);

		const handleSignOut = () => {
			firebase.auth().signOut();
		};

		const handleChangeUpload = (e) => {
			setFile(e.target.files[0]);
			setProduct(e.target.id);
			setFocus(e.target.id)
		}

		const handleChangeRef = (e) => {
			e.preventDefault();
			setRef(e.target.value);
		}

		const handleChangeVal = (e) => {
			e.preventDefault();
			setVal(e.target.value);
		}

		const handleUpload = (e) => {
			e.preventDefault();			

			if(file !== '') {
				const storageRef = firebase.storage().ref(`${e.target.id}/${file.name}`);
				let task = storageRef.put(file);		
							
				task.on('state_changed', (snapshot) => {
					let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					setUploadValue(percentage);
				}, (error) => {
					console.error(error.message)
				});
				database.collection(`${e.target.id}`).add({
					produto: firebase.storage().ref(`${e.target.id}`).child(`${file.name}`).toString(),
					ref: ref,
					valor: val,
				}).then(() => console.log('ok')).catch(error => console.error(error.message))
			} else {
				alert('Por favor, kirida, escolha a fota!')
			}
		}

		const handleDelete = (e) => {
			e.preventDefault();

			let firestorePath = firebase.firestore().collection(e.target.value);
			let firestoreFile = e.target.id;
			
			firestorePath.doc(firestoreFile).delete().then(() => {
				console.log('delete ok')
				firebase.storage().refFromURL(e.target.dataset.url).delete().then(() => {
					window.location.reload();
				}).catch(error => console.error(error.message));			
			}).catch( error => console.error(error.message));
		}

		return(
			<div className={css(style.dashboard)}>
				
				<button className={css(style.btn)} onClick={() => handleSignOut()}>Logout</button>
				<h2 className={css(style.title)} style={{fontSize: '30px', marginTop: '60px'}}>Aqui você faz upload dos produtos:</h2>
				<h2 className={css(style.productBtn)} onClick={() => {productType !== 'uploads' ? setProductType('uploads') : setProductType('')}}>UPLOADS</h2>
				{
					productType === 'uploads' ? 
					<div>
						<UploadProduct 
							formClass={css(style.dashboardUpload)} 
							formFocus={focus === 'coleirasUp' ? {backgroundColor: '#D9A7BE'} : null} 
							h2Class={css(style.title)} 
							h2Text='Nessa seção você faz upload SÓ DE COLEIRAS'
							inputUpId='coleirasUp'
							inputUpOnchange={(e) => handleChangeUpload(e)}
							refKey='ref1'
							valKey='val1'
							refOnchange={(e) => handleChangeRef(e)}
							valOnchange={(e) => handleChangeVal(e)}
							uploadValue={uploadValue}
							product={product}
							file={file}
							id='coleiras'
							handleUpload={(e) => handleUpload(e)}
							setFile={setFile}
							setProduct={setProduct}
							setFocus={setFocus}
						/>
						<UploadProduct 
							formClass={css(style.dashboardUpload)} 
							formFocus={focus === 'placasUp' ? {backgroundColor: '#D9A7BE'} : null} 
							h2Class={css(style.title)} 
							h2Text='Nessa aqui você faz SÓ DE placas'
							inputUpId='placasUp'
							inputUpOnchange={(e) => handleChangeUpload(e)}
							refKey='ref4'
							valKey='val4'
							refOnchange={(e) => handleChangeRef(e)}
							valOnchange={(e) => handleChangeVal(e)}
							uploadValue={uploadValue}
							product={product}
							file={file}
							id='placas'
							handleUpload={(e) => handleUpload(e)}
							setFile={setFile}
							setProduct={setProduct}
							setFocus={setFocus}
						/>
						<UploadProduct 
							formClass={css(style.dashboardUpload)} 
							formFocus={focus === 'caminhasUp' ? {backgroundColor: '#D9A7BE'} : null} 
							h2Class={css(style.title)} 
							h2Text='Nessa aqui você faz SÓ de caminhas'
							inputUpId='caminhasUp'
							inputUpOnchange={(e) => handleChangeUpload(e)}
							refKey='ref2'
							valKey='val2'
							refOnchange={(e) => handleChangeRef(e)}
							valOnchange={(e) => handleChangeVal(e)}
							uploadValue={uploadValue}
							product={product}
							file={file}
							id='caminhas'
							handleUpload={(e) => handleUpload(e)}
							setFile={setFile}
							setProduct={setProduct}
							setFocus={setFocus}
						/>
						<UploadProduct 
							formClass={css(style.dashboardUpload)} 
							formFocus={focus === 'arranhadoresUp' ? {backgroundColor: '#D9A7BE'} : null} 
							h2Class={css(style.title)} 
							h2Text='E aqui você faz só de arranhadores'
							inputUpId='arranhadoresUp'
							inputUpOnchange={(e) => handleChangeUpload(e)}
							refKey='ref3'
							valKey='val3'
							refOnchange={(e) => handleChangeRef(e)}
							valOnchange={(e) => handleChangeVal(e)}
							uploadValue={uploadValue}
							product={product}
							file={file}
							id='arranhadores'
							handleUpload={(e) => handleUpload(e)}
							setFile={setFile}
							setProduct={setProduct}
							setFocus={setFocus}
						/>
					</div>
					: null
				}					
					<div className={css(style.dashboardDelete)}>
						<h2 className={css(style.title)} style={{fontSize: '30px'}}>Aqui você olha o que tem em cada seção:</h2>
						<DeleteEditProduct
							styleSection={css(style.deleteSection)}
							styleDeleteSection={css(style.productBtn)}
							sectionId='coleiras'
							setProductType={setProductType}
							productType={productType}
							styleCardImage={css(style.deleteImage)}
							styleImg={css(style.image)}
							styleDeleteBtn={css(style.deleteBtn)}
							delete={handleDelete}
							products={props.coleiras}
						/>
						<DeleteEditProduct
							styleSection={css(style.deleteSection)}
							styleDeleteSection={css(style.productBtn)}
							sectionId='placas'
							setProductType={setProductType}
							productType={productType}
							styleCardImage={css(style.deleteImage)}
							styleImg={css(style.image)}
							styleDeleteBtn={css(style.deleteBtn)}
							delete={handleDelete}
							products={props.placas}
						/>
						<DeleteEditProduct
							styleSection={css(style.deleteSection)}
							styleDeleteSection={css(style.productBtn)}
							sectionId='caminhas'
							setProductType={setProductType}
							productType={productType}
							styleCardImage={css(style.deleteImage)}
							styleImg={css(style.image)}
							styleDeleteBtn={css(style.deleteBtn)}
							delete={handleDelete}
							products={props.caminhas}
						/>
						<DeleteEditProduct
							styleSection={css(style.deleteSection)}
							styleDeleteSection={css(style.productBtn)}
							sectionId='arranhadores'
							setProductType={setProductType}
							productType={productType}
							styleCardImage={css(style.deleteImage)}
							styleImg={css(style.image)}
							styleDeleteBtn={css(style.deleteBtn)}
							delete={handleDelete}
							products={props.arranhadores}
						/>
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
					<button className={css(style.loginBtn)} style={{backgroundColor: '#EDCFC4'}} onClick={(e) => handleSubmit(e)}>Login</button>
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
		margin: '60px 0',
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
		backgroundColor: '#839690',
		border: 'none',
		fontFamily: `'Source Sans Pro', sans-serif`,
		fontWeight: '300',
		cursor: 'pointer',
	},
	loginBtn: {
		width: '120px',
		padding: '20px',
		marginTop: '20px',
		borderRadius: '10px',
		fontSize: '20px',
		outline: 'none',
		backgroundColor: '#EDCFC4',
		border: 'none',
		fontFamily: `'Source Sans Pro', sans-serif`,
		fontWeight: '300',
		cursor: 'pointer'
	},
	title: {
		color: '#6A6260',
		fontFamily: `'Amatic SC', cursive`,
	},
	dashboard: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#DADEE1'
	},
	dashboardUpload: {
		border: '1px solid #839690',
		marginTop: '60px',
		padding: '20px',
		textAlign: 'center',
		borderRadius: '10px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
	},
	dashboardDelete: {
		margin: '30px 0'
	},
	image: {
		width: '200px',
		marginBottom: '10px'
	},
	deleteSection: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	deleteImage: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: '30px 0',
		border: '1px solid #E1B0A2',
		padding: '20px',
		borderRadius: '10px',
		backgroundColor: '#EDCFC4'
	},
	productBtn: {
		fontFamily: `'Source Sans Pro', sans-serif`,
		textTransform: 'uppercase',
		border: '1px solid #E1B0A2',
		padding: '20px',
		width: '180px',
		textAlign: 'center',
		borderRadius: '10px',
		backgroundColor: '#839690',
		cursor: 'pointer',
	},
	deleteBtn: {
		backgroundColor: '#fff',
		padding: '20px',
		border: '1px solid #E1B0A2',
		borderRadius: '10px',
		fontSize: '16px',
		fontFamily: `'Source Sans Pro', sans-serif`,
		cursor: 'pointer'
	}
})

export default Login;
