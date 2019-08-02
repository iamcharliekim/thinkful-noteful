import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Mainbar from '../Mainbar/Mainbar'
import './Body.css'
import { Route } from 'react-router-dom'
import Note from '../../Note/Note'

const body = (props) => {
	return (
		<div className="noteful-body">
			
			<Route path="/"  component={Sidebar}/>	
			
			<Route path="/" exact component={Mainbar}/>		
						
			<Route path="/folder/:folderID" exact component={Mainbar}/>			

			<Route path="/note/:noteID" component={Note}/>			

			  		
			
		</div>
		
	)
}

export default body