import React from 'react'
import './Note.css'
import Context from '../Context'

const note = (props) => {
	return  (
		<Context.Consumer>
		
		{
			(value)=> {
				let targetNote;

				if (props.match.params.noteID){
					targetNote = value.notes.find(note => +note.id === +props.match.params.noteID)				
				}
				
				return (
					<div className="noteful-note">
						<h1>{targetNote.name}</h1>
						<p>{targetNote.content}</p>
					</div>
				)
			}	
		}
		
		</Context.Consumer>
	)
}

export default note