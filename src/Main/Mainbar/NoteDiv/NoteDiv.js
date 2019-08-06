import React from 'react'
import './NoteDiv.css'
import Context from '../../../Context'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'


class noteDiv extends React.Component{
	state = {
		errorMsg: null
	}
	
	static contextType = Context

	deleteNoteRequest = (e, noteID, callback) => {
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
					throw new Error('Something went wrong! Could not delete!')
				}
		})
			.then(responseJson => {
				callback(noteID)
			
				this.props.history.replace('/')
		})
			.catch(error => {
				this.setState({errorMsg: error.message})
				
		})
	}

	render() {
		let title = this.props.title
		let modified = this.props.modified
		let folderID = this.props.folderID
		
		if (this.state.errorMsg){
			return <h1>{this.state.errorMsg}</h1>
		}
		
		return (
			<div className="noteful-notediv" id = {folderID}>
				<h1>{title}</h1>
				<h5>{modified}</h5>
				<button onClick={(e)=> {
						this.deleteNoteRequest(e, this.props.id, this.context.deleteNotes)

					}}>- Delete</button>
			</div>
			)
	}
}
			
noteDiv.propTypes = {
	title: PropTypes.string.isRequired,
	modified: PropTypes.string.isRequired,
	folderID: PropTypes.string.isRequired,
	
}

export default withRouter(noteDiv)