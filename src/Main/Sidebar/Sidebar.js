import React from 'react'
import './Sidebar.css'
import Sidefolder from './Sidefolder/Sidefolder'
import { NavLink } from 'react-router-dom'
import Context from '../../Context'

const sidebar = (props) => {

	return (
		<Context.Consumer>
			{ (value)=> {
				let foldersArr = value.folders	
				let notesArr = value.notes
				let noteID
				console.log('value:', value)
				console.log('notesArr:', notesArr)
				
				if (props.location.pathname.includes('/note/')){
					noteID = props.location.pathname.substring(6)
					console.log('noteID:', noteID)
					
					let targetNote = notesArr.find(note => {
						return note.id === noteID
					})	
					
					console.log('targetNote:', targetNote)
						
					let targetFolderID = targetNote.folderId	
					
					foldersArr = foldersArr.filter(folder => folder.id === targetFolderID)
				}

				const folders = foldersArr.map(folder => {
					return <NavLink to={"/folder/" + folder.id} key = {folder.id} className="noteful-sidebar"><Sidefolder name = {folder.name} id = {folder.id} /></NavLink>
				})

				return (
					<ul className="noteful-sidebar">
						{folders}

						{noteID ? <NavLink to="/">Go back</NavLink> : <button> + Add Folder</button>}

					</ul>
				)	
				}
			}
		</Context.Consumer>
	)
}

export default sidebar