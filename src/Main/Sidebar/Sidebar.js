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
				
				console.log(value)
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
					console.log(folder)
					
					return (
						
							<ErrorBoundary>
								<li id={folder.id} className="noteful-sidefolder" key = {folder.id}>
									<NavLink to={"/folder/" + folder.id} className="sidefolder-navlink">
										{folder.name}
									</NavLink>
								</li>
							</ErrorBoundary>
						)
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