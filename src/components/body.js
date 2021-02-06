import { StyleSheet, css } from 'aphrodite';
import React, { useState } from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

import coleira01 from '../images/coleira_ref_01.png';
import coleira02 from '../images/coleira_ref_02.png';
import coleira03 from '../images/coleira_ref_03.webp';

function Body(props) {
	const [menuType, setMenuType] = useState('');
	const coleiras = [
		{
			original: coleira01,
			thumbnail: coleira01,
			description: 'Referência 01 - Valor: R$ 8,oo'
		},
		{
			original: coleira02,
			thumbnail: coleira02
		},
		{
			original: coleira03,
			thumbnail: coleira03
		}
	]

  return(
		<div className={css(style.sections)}>
			<p className={css(style.text)}>Olá, somos uma lojinha pensada para trazer pra perto de você produtinhos para seu pet, aqui você pode encontrar tudo o que temos no momento<br></br>=^.^=</p>
			<div className={css(style.section)} onClick={() => {menuType !== 'coleiras' ? setMenuType('coleiras') : setMenuType('')}}>Coleiras</div>
			{
				menuType === 'coleiras' ? 
				<ImageGallery items={coleiras} showPlayButton={false} /> : null
			}
			<div className={css(style.section)} onClick={() => {menuType !== 'caminhas' ? setMenuType('caminhas') : setMenuType('')}}>Caminhas</div>
			{
				menuType === 'caminhas' ? <p>caminhas</p> : null
			}
			<div className={css(style.section)} onClick={() => {menuType !== 'arranhadores' ? setMenuType('arranhadores') : setMenuType('')}}>Arranhadores</div>
			{
				menuType === 'arranhadores' ? <p>arranhadores</p> : null
			}
		</div>
	)
}

const style = StyleSheet.create({
	sections: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: '60px',
		paddingBottom: '60px',
		backgroundColor: '#FFF4F2'
	},
	section: {
		border: '1px solid #DADEE1',
		width: '280px',
		fontFamily: `'Source Sans Pro', sans-serif`,
		fontSize: '40px',
		textAlign: 'center',
		padding: '30px 0',
		marginBottom: '10px',
		borderRadius: '10px',
		backgroundColor: '#DADEE1'
	},
	text: {
		width: '70%',
		fontSize: '22px',
		textAlign: 'center',
		marginBottom: '60px',
		color: '#6A6260'
	},
	slide: {
		marginBottom: '80px',
		'@media only screen and (min-width: 820px)':{
			width: '50%',
		}
	}
})

export default Body;