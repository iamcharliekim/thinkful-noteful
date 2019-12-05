import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Mainbar from '../Mainbar/Mainbar'
import './Body.css'
import { Route, Switch } from 'react-router-dom'
import Note from '../../Note/Note'
import AddFolder from '../Sidebar/AddFolder/AddFolder'
import AddNote from '../AddNote/AddNote'

const body = () => {
	return (
		<div className="noteful-body">
			<div className="noteful-inner-body">
					
				<Route path="/"  component={Sidebar}/>	

				<Route path="/"  exact component={Mainbar}/>

				<Switch>
					<Route path="/folder/:folder_id" component={Mainbar}/>			

					<Route path="/note/:noteID" component={Note}/>			

					<Route path="/addfolder"  component={AddFolder}/>

					<Route path="/addnote" exact component={AddNote}/>
				</Switch>		
			</div>
		</div>
		
	)
}

export default body