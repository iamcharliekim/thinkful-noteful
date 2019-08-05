import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Mainbar from '../Mainbar/Mainbar'
import './Body.css'
import { Route } from 'react-router-dom'
import Note from '../../Note/Note'
import AddFolder from '../Sidebar/AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'

const body = () => {
	return (
		<div className="noteful-body">
					
			<Route path="/"  component={Sidebar}/>	
			
			<Route path="/"  exact component={Mainbar}/>
					
			<Route path="/folder/:folderID" component={Mainbar}/>			

			<Route path="/note/:noteID" component={Note}/>			

			<Route path="/addfolder"  component={AddFolder}/>

			<Route path="/addnote" exact component={AddNote}/>
				
			
		</div>
		
	)
}

export default body