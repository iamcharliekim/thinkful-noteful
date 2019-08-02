import React from 'react'
import './Note.css'
import Context from '../Context'

const note = (props) => {
	let targetNote;

	return  (
		
		<Context.Consumer>
		
		{
			(value)=> {
				console.log(value)
					if (props.match.params.noteID){
						targetNote = value.notes.filter(note => note.id === props.match.params.noteID)[0]					}
				
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