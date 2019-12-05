import React from 'react'
import NoteDiv from './NoteDiv/NoteDiv'
import { Link } from 'react-router-dom'
import './Mainbar.css'
import Context from '../../Context'
import ErrorBoundary from '../../ErrorBoundary'

const mainbar = (props) => {
	return  (
		<Context.Consumer>
			{
				(value)=> {
					let folder_id, notesArr, notes

					if (props.match.params.folder_id){
						folder_id = +props.match.params.folder_id
						notesArr = value.notes.filter(note => note.folder_id === folder_id)
					} else {
						notesArr = value.notes
					}
					
					
					notes = notesArr.map(note => {
						return <Link to={"/note/" + note.id} key= {note.id} className="noteful-link">
									<ErrorBoundary>
										<NoteDiv title = {note.name} modified = {note.modified} folder_id={note.folder_id} id={note.id} />
									</ErrorBoundary>
								</Link>
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