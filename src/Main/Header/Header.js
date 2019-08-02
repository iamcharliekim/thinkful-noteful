import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const header = () => {
	
	return (
		<header className="noteful-header">
			<Link to="/" className="noteful-header-link"><h1>Noteful</h1></Link>
			<button>+ Add Note</button>
		</header>
	)
}

export default header 