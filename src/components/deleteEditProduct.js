function DeleteEditProduct(props) {
	return(
		<div className={props.styleSection}>
			<h2 className={props.styleDeleteSection} onClick={() => {props.productType !== props.sectionId ? props.setProductType(props.sectionId) : props.setProductType('')}}>{props.sectionId}</h2>
			{
				props.productType === props.sectionId ? props.products.map(i => {
					return(
						<div className={props.styleCardImage}>
							<img className={props.styleImg} src={i.url} alt='' />
							<p>Referência: {i.reference}</p>
							<p>Valor: {i.value},oo</p>
							<button className={props.styleDeleteBtn} id={i.id} data-url={i.url} value={props.sectionId} onClick={(e) => props.delete(e)}>Apagar produtinho</button>
						</div>
					)}) : null
			}
		</div>
	)
}

export default DeleteEditProduct;
