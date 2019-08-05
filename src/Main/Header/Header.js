import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import ErrorBoundary from '../../ErrorBoundary'

const header = () => {
	
	return (
		<header className="noteful-header">
			<Link to="/" className="noteful-header-link"><h1>Noteful</h1></Link>
			<Link to="/addnote"><button>+ Add Note</button></Link>
		</header>
	)
}

export default header 