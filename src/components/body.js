import { StyleSheet, css } from 'aphrodite';
import React, { useState } from 'react';
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from 'react-image-gallery';

function Body(props) {
	const [menuType, setMenuType] = useState('');

	const coleiras = props.coleiras.map(i => {
		return {
			original: i.url,
			thumbnail: i.url,
			description: `Referência: ${i.reference} - Valor: R$ ${i.value},oo`
		}
	});

	const caminhas = props.caminhas.map(i => {
		return {
			original: i.url,
			thumbnail: i.url,
			description: `Referência: ${i.reference} - Valor: R$ ${i.value},oo`
		}
	});

	const arranhadores = props.arranhadores.map(i => {
		return {
			original: i.url,
			thumbnail: i.url,
			description: `Referência: ${i.reference} - Valor: R$ ${i.value},oo`
		}
	});

	const placas = props.placas.map(i => {
		return {
			original: i.url,
			thumbnail: i.url,
			description: `Referência: ${i.reference} - Valor: Com gravação R$ ${Number(i.value)+5},oo - Sem gravação R$ ${i.value},oo`
		}
	});

  return(
		<div className={css(style.sections)}>
			<p className={css(style.text)}>Olá, somos uma lojinha pensada para levar pra perto de você produtinhos para seu pet, aqui você pode encontrar tudo o que temos no momento<br></br>=^.^=</p>
			{
				props.widthListener >= 820 ?
				<div style={{width: '100%'}}>
					<div className={css(style.menuDesktop)}>
						<div className={css(style.section)} onClick={() => {menuType !== 'coleiras' ? setMenuType('coleiras') : setMenuType('')}}>Coleiras</div>
						<div className={css(style.section)} onClick={() => {menuType !== 'placas' ? setMenuType('placas') : setMenuType('')}}>Plaquinhas</div>
						<div className={css(style.section)} onClick={() => {menuType !== 'caminhas' ? setMenuType('caminhas') : setMenuType('')}}>Caminhas</div>
						<div className={css(style.section)} onClick={() => {menuType !== 'arranhadores' ? setMenuType('arranhadores') : setMenuType('')}}>Arranhadores</div>
					</div>
					{
						menuType === 'coleiras' ? 
						coleiras.length !== 0 ? <div style={{width: '620px', margin: '0 auto'}}>
							<ImageGallery items={coleiras} showPlayButton={false} />
						</div> : <p style={{textAlign: 'center'}}>Ainda não temos nenhum produtinho aqui :( </p> : null
					}
					{
						menuType === 'placas' ? 
						placas.length !== 0 ? <div style={{width: '620px', margin: '0 auto'}}>
							<ImageGallery items={placas} showPlayButton={false} />
						</div> : <p style={{textAlign: 'center'}}>Ainda não temos nenhum produtinho aqui :( </p> : null
					}
					{
						menuType === 'caminhas' ? 
						caminhas.length !== 0 ? <div style={{width: '620px', margin: '0 auto'}}>
							<ImageGallery items={caminhas} showPlayButton={false} />
						</div> : <p style={{textAlign: 'center'}}>Ainda não temos nenhum produtinho aqui :( </p> : null
					}
					{
						menuType === 'arranhadores' ? 
						arranhadores.length !== 0 ? <div style={{width: '620px', margin: '0 auto'}}>
							<ImageGallery items={arranhadores} showPlayButton={false} />
						</div> : <p style={{textAlign: 'center'}}>Ainda não temos nenhum produtinho aqui :( </p> : null
					}
				</div>
				:
				<div className={css(style.menuMobile)}>
					<div className={css(style.menu)}>
						<div className={css(style.section)} onClick={() => {menuType !== 'coleiras' ? setMenuType('coleiras') : setMenuType('')}}>Coleiras</div>
						{
							menuType === 'coleiras' ? 
							coleiras.length !== 0 ? <div style={{width: '320px', margin: '0 auto'}}>
								<ImageGallery items={coleiras} showPlayButton={false} />
							</div> : <p style={{textAlign: 'center'}}>Ainda não temos nenhum produtinho aqui :( </p> : null
						}
					</div>
					<div className={css(style.menu)}>
						<div className={css(style.section)} onClick={() => {menuType !== 'placas' ? setMenuType('placas') : setMenuType('')}}>Plaquinhas</div>
						{
							menuType === 'placas' ? 
							placas.length !== 0 ? <div style={{width: '320px', margin: '0 auto'}}>
								<ImageGallery items={placas} showPlayButton={false} />
							</div> : <p style={{textAlign: 'center'}}>Ainda não temos nenhum produtinho aqui :( </p> : null
						}
					</div>	
					<div className={css(style.menu)}>
						<div className={css(style.section)} onClick={() => {menuType !== 'caminhas' ? setMenuType('caminhas') : setMenuType('')}}>Caminhas</div>
						{
							menuType === 'caminhas' ? 
							caminhas.length !== 0 ? <div style={{width: '320px', margin: '0 auto'}}>
								<ImageGallery items={caminhas} showPlayButton={false} />
							</div> : <p style={{textAlign: 'center'}}>Ainda não temos nenhum produtinho aqui :( </p> : null
						}
					</div>
					<div className={css(style.menu)}>
						<div className={css(style.section)} onClick={() => {menuType !== 'arranhadores' ? setMenuType('arranhadores') : setMenuType('')}}>Arranhadores</div>
						{
							menuType === 'arranhadores' ? 
							arranhadores.length !== 0 ? <div style={{width: '320px', margin: '0 auto'}}>
								<ImageGallery items={arranhadores} showPlayButton={false} />
							</div> : <p style={{textAlign: 'center'}}>Ainda não temos nenhum produtinho aqui :( </p> : null
						}
					</div>
				</div>			
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
		backgroundColor: '#FFF4F2',
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
		backgroundColor: '#DADEE1',
		cursor: 'pointer',
		'@media only screen and (min-width: 820px)': {
		}
	},
	text: {
		width: '70%',
		fontSize: '22px',
		textAlign: 'center',
		marginBottom: '60px',
		color: '#6A6260',
		'@media only screen and (min-width: 820px)': {
			width: '60%'
		}
	},
	menuDesktop: {		
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: '100%'
	},
	menu: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	slide: {
		marginBottom: '80px',
		'@media only screen and (min-width: 820px)':{
			width: '50%',
		}
	},
	img: {
		display: 'none'
	}
})

export default Body;
