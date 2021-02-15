import { StyleSheet, css } from 'aphrodite';

import MePicture from '../images/aboutmepic.png';

function Footer(props) {
	return(
		<div className={css(style.footer)}>
			<div className={css(style.about)}>
				<img className={css(style.img)} src={MePicture} alt='' />
				<div>
					<p>Olá, meu nome é Lorena e esse é o catálogo da minha lojinha. O objetivo é trazer pra perto de você uns produtinhos pro seu gatinho.</p>
					<p>Para sugestões ou perguntas, pode me escrever aqui: lojacadeagata@gmail.com</p>
				</div>
			</div>
			<p className={css(style.dev)}>Esse site foi desenvolvido por Evs</p>
		</div>
	)
}

const style = StyleSheet.create({
	footer: {
		backgroundColor: '#BF9180',
		marginBottom: '-20px',
	},
	img: {
		width: '100px',
		borderRadius: '50%',
		border: '5px solid #839690',
		'@media only screen and (min-width: 820px)':{
			marginRight: '60px'
		}
	},
	about: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '30px 20px',
		textAlign: 'center',
		color: '#333333',
		'@media only screen and (min-width: 820px)': {
			flexDirection: 'row',
			justifyContent: 'space-evenly',
			textAlign: 'left',
			width: '60%',
			margin: '0 auto'
		}
	},
	dev: {
		textAlign: 'center',
		fontSize: '14px',
		color: '#EDCFC4'
	}
})

export default Footer;
