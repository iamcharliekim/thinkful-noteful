import React from 'react'
import './NoteDiv.css'
import Context from '../../../Context'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import config from '../../../config'


class noteDiv extends React.Component{
	state = {
		errorMsg: null
	}
	
	static contextType = Context

	deleteNoteRequest = (e, noteID, callback) => {
		e.preventDefault();
		

		const deleteURL = `${config.API_ENDPOINT}api/notes/${noteID}`
		
		const options = {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`

			}
		}
		
		fetch(deleteURL, options)
			.then(response => {
				if (response.ok){
					return response
				} else {
					throw new Error('Something went wrong! Could not delete!')
				}
		})
			.then(responseJson => {
				callback(noteID)
			
		})
			.catch(error => {
				this.setState({errorMsg: error.message})
				
		})
	}

	render() {
		let title = this.props.title
		let modified = this.props.modified
		let folder_id = this.props.folder_id
		
		if (this.state.errorMsg){
			return <h1>{this.state.errorMsg}</h1>
		}
		
		return (
			<div className="noteful-notediv" id = {folder_id}>
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
	folder_id: PropTypes.number.isRequired,
	
}

export default withRouter(noteDiv)