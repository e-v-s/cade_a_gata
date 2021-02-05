import { StyleSheet, css } from 'aphrodite';
import Logo from '../images/logo.png';

function Header(props) {
	return(
		<div className={css(style.header)}>
			<img src={Logo} alt="carinha de um gatinho como logo" className={css(style.img)} />
			<h1 className={css(style.logoTitle)}>CADÊ A GATA?</h1>
		</div>
	)
}

const style = StyleSheet.create({
	header:{
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#EDCFC4',
	},
	img: {
		width: '200px',
	},
	logoTitle: {
		fontFamily: `'Amatic SC', cursive`,
		marginTop: '0',
		marginBottom: '50px'
	}
})

export default Header;
