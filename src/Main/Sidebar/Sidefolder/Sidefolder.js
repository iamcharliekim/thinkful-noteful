import React from 'react'
import './Sidefolder.css'


const sidefolder = (props) => {
	let name = props.name
	let id = props.id
	
	return (
		<li className="noteful-sidefolder" id={id}>
			<h2>{name}</h2>
		</li>
	
	)
}

export default sidefolder