import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'
import Context from '../../Context'
import ErrorBoundary from '../../ErrorBoundary'
import Sidefolder from './Sidefolder/Sidefolder'

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
						return +note.id === +noteID
					})	
											
					let targetfolder_id = targetNote.folder_id	
					
					foldersArr = foldersArr.filter(folder => folder.id === targetfolder_id)
				}

				const folders = foldersArr.map(folder => {

					return (
						
							<ErrorBoundary key = {folder.id}>
								<ul id={folder.id} className="noteful-sidefolder" >
									<NavLink to={"/folder/" + folder.id} className="sidefolder-navlink">
										<Sidefolder name={folder.name} id={folder.id}></Sidefolder>
									</NavLink>
								</ul>
							</ErrorBoundary>
						)
				})

				return (
					<ul className="noteful-sidebar">
						{folders}

						{noteID || props.location.pathname.includes('/folder/')  ? <NavLink to="/" className="noteful-sidefolder btn">Go back</NavLink> : null}

						<NavLink to="/addfolder" className="noteful-sidefolder btn"> + Add Folder</NavLink>

					</ul>
				)	
				}
			}
		</Context.Consumer>
	)
}

export default sidebar