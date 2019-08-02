import React from 'react'
import NoteDiv from './NoteDiv/NoteDiv'
import { Link } from 'react-router-dom'
import './Mainbar.css'
import Context from '../../Context'

const mainbar = (props) => {
	return  (
		<Context.Consumer>
			{
				(value)=> {
					let folderID, notesArr, notes
					
					if (props.match.params.folderID){
						folderID = props.match.params.folderID
						notesArr = value.notes.filter(note => note.folderId === folderID)
					} else {
						notesArr = value.notes
					}
					
					notes = notesArr.map(note => {
						return <Link to={"/note/" + note.id} key= {note.id} className="noteful-link"><NoteDiv title = {note.name} modified = {note.modified} folderID={note.folderId} id={note.id} /></Link>
					})
	
					return (
						<main className="noteful-mainbar">
							{notes}
						</main>
					)
				}
			}
		</Context.Consumer>
	)
}

export default mainbar