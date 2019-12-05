import React from 'react'
import './AddFolder.css'
import Context from '../../../Context'
import config from '../../../config'

class AddFolder extends React.Component {
	state = {
		folderName: '',
		errorMsg: null
	}

	newFolderChange = (e) => {
		this.setState({folderName: e.target.value})
	}
	
	onSubmitHandler = (e, callback) => {
		e.preventDefault();
		
		const foldersURL = `${config.API_ENDPOINT}api/folders`
		const body = {
			name: this.state.folderName
		}
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			},
			body: JSON.stringify(body)
		}
		
		fetch(foldersURL, options)
			.then(response => {
				if (response.ok){
					return response.json()
				} else {
					throw new Error ('something went wrong!')
				}
		})
			.then(responseJson => {
				body.id = responseJson.id
				callback(body)
				
				this.props.history.replace('/')
			
		})
			.catch(error => {
				this.setState({errorMsg: error.message})
		})

	}	
	
	validateFolderName = () => {
		let folderName = this.state.folderName.trim()
		
		if (folderName.length === 0){
			return 'Please enter a valid folder name'
		}
	}
	
	
	render() {
		return (
		<Context.Consumer>
			{(value)=>{			
					if (this.state.errorMsg){
						return <h1>{this.state.errorMsg}</h1>
					}
					return (
							<form onSubmit={(e)=> this.onSubmitHandler(e, value.addFolder)} className="addFolder">
								<label htmlFor="folder-name">Folder Name:</label>
									<input type="text" id="folder-name" onChange={this.newFolderChange} value={this.state.folderName}/>
								
								<button type="submit"
										disabled={this.validateFolderName()}>Submit</button>
							</form>
					
					)
				}}
		</Context.Consumer>
		)
	}
	
}
	

export default AddFolder