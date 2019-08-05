import React from 'react'
import './AddFolder.css'
import Context from '../../../Context'

class AddFolder extends React.Component {
	state = {
		folderName: ''
	}

	newFolderChange = (e) => {
		console.log(e.target.value)
		this.setState({folderName: e.target.value})
	}
	
	onSubmitHandler = (e, callback) => {
		e.preventDefault();
		
		const foldersURL = `http://localhost:9090/folders`
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.folderName
			})
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
				callback(options.body)
				this.props.history.replace('/')
			
		})
			.catch(error => {
				console.log(error)
		})

	}	
	
	validateFolderName = () => {
		let folderName = this.state.folderName.trim()
		console.log(folderName.length===0)
		
		if (folderName.length === 0){
			return 'Please enter a valid folder name'
		}
	}
	
	
	render() {
		return (
		<Context.Consumer>
			{(value)=>{					
					return (
							<form onSubmit={(e)=> this.onSubmitHandler(e, value.addFolder)} className="addFolder">
								<label htmlFor="folder-name">Folder Name:
									<input type="text" id="folder-name" onChange={this.newFolderChange} value={this.state.folderName}/>
								</label>
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