import React from 'react'
import './NoteDiv.css'
import Context from '../../../Context'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'


const noteDiv = (props) => {
	const deleteNoteRequest = (e, noteID, callback) => {
		e.preventDefault();
		
		const deleteURL = `http://localhost:9090/notes/${noteID}`
		
		const options = {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json'
			}
		}
		
		fetch(deleteURL, options)
			.then(response => {
				if (response.ok){
					return response.json()
				} else {
					throw new Error('oops something went wrong!')
				}
		})
			.then(responseJson => {
				callback(noteID)
			
				props.history.replace('/')
					})
	}

	
	return (
		<Context.Consumer>
			{
				(value)=> {
					let title = props.title
					let modified = props.modified
					let folderID = props.folderID
					
					return (
						<div className="noteful-notediv" id = {folderID}>
							<h1>{title}</h1>
							<h5>{modified}</h5>
							<button onClick={(e)=> {
									deleteNoteRequest(e, props.id, value.deleteNotes)
									
								}}>- Delete</button>
						</div>
					
					)
				}
			}
			
		</Context.Consumer>
	)
}

noteDiv.propTypes = {
	title: PropTypes.string.isRequired,
	modified: PropTypes.string.isRequired,
	folderID: PropTypes.string.isRequired,
	
}

export default withRouter(noteDiv)