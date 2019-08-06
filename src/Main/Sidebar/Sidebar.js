import React from 'react'
import './Sidebar.css'
import Sidefolder from './Sidefolder/Sidefolder'
import { NavLink } from 'react-router-dom'
import Context from '../../Context'
import ErrorBoundary from '../../ErrorBoundary'

const sidebar = (props) => {

	return (
		<Context.Consumer>
			{ (value)=> {
				let foldersArr = value.folders	
				let notesArr = value.notes
				let noteID
				
				if (props.location.pathname.includes('/note/')){
					noteID = props.location.pathname.substring(6)
					
					let targetNote = notesArr.find(note => {
						return note.id === noteID
					})	
											
					let targetFolderID = targetNote.folderId	
					
					foldersArr = foldersArr.filter(folder => folder.id === targetFolderID)
				}

				const folders = foldersArr.map(folder => {
					return <NavLink to={"/folder/" + folder.id} key = {folder.id} className="noteful-sidefolder"><ErrorBoundary><Sidefolder name = {folder.name} id = {folder.id} /></ErrorBoundary></NavLink>
				})

				return (
					<ul className="noteful-sidebar">
						{folders}

						{noteID ? <NavLink to="/" className="noteful-sidefolder btn">Go back</NavLink> : <NavLink to="/addfolder" className="noteful-sidefolder btn"> + Add Folder</NavLink>}

					</ul>
				)	
				}
			}
		</Context.Consumer>
	)
}

export default sidebar