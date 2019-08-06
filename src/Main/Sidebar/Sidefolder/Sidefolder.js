import React from 'react'
import './Sidefolder.css'
import PropTypes from 'prop-types'


const sidefolder = (props) => {
	let name = props.name
	let id = props.id
	
	return (
		<li id={id}>
			{name}
		</li>
	
	)
}

sidefolder.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired
}

export default sidefolder