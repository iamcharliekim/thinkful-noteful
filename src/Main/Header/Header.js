import React from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'

const header = () => {
	
	return (
		<header className="noteful-header">
			<div className="noteful-inner-header">
				<Link to="/" className="noteful-header-link"><h1>Noteful</h1></Link>
				<NavLink to="/addnote" className="add-note">+ Add Note</NavLink>
			</div>
		</header>
	)
}

export default header 