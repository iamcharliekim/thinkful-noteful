import React from 'react'
import './Sidefolder.css'
import PropTypes from 'prop-types'
import Context from '../../../Context'
import config from '../../../config'

class Sidefolder extends React.Component {

	state = {
		name: this.props.name,
		id: this.props.id
	}

	deleteFolder = (e, folderID, callback) => {
		e.preventDefault();
		
		const deleteURL = `${config.API_ENDPOINT}api/folders/${folderID}`
		
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
				callback(folderID)

			
		})
			.catch(error => {
				this.setState({errorMsg: error.message})
				
		})
	}

	render(){
		return (
			<Context.Consumer>
			{(value)=> {
				return (
					<li className="sidefolder-li" id={this.state.id}>
					<span className="sidefolder-name">{this.state.name}</span>
					<button className="sidefolder-delete-btn" onClick={(e)=> this.deleteFolder(e, this.state.id, value.deleteFolder)}>Delete</button>
				</li>
				)
			}}
			</Context.Consumer>
		)
	}
}

Sidefolder.propTypes = {
	name: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired
}

export default Sidefolder