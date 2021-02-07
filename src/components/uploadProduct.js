function UploadProduct(props) {
	return(
		<div>
			<form className={props.formClass} style={props.formFocus}>
				<h2 className={props.h2Class}>{props.h2Text}</h2>
				<input id={props.inputUpId} type='file' onChange={props.inputUpOnchange} accept="image/png, image/jpeg" />
				<input type='text' placeholder='Referência' key={props.refKey} onChange={props.refOnchange} />
				<input type='number' placeholder='Valor' key={props.valKey} onChange={props.valOnchange} />
				{
					props.uploadValue !== 0 && props.product === props.inputUpId ? <progress max='100' value={props.uploadValue}>{props.uploadValue} %</progress> : null
				}						
				{
					props.file !== '' && props.product === props.inputUpId ? <div><button id={props.id} onClick={props.handleUpload}>Upload</button><button onClick={() => {props.setFile(''); props.setProduct(''); props.setFocus('')}}>Cancelar upload</button></div> : <button id={props.id} onClick={props.handleUpload}>Upload</button>
				}						
			</form>
		</div>
	)
}

export default UploadProduct;
