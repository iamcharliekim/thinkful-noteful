import React from 'react'
import Context from '../../Context'
import './AddNote.css'
import FolderSelect from './FolderSelect/FolderSelect'
import ErrorBoundary from '../../ErrorBoundary'
import config from '../../config'

class AddNote extends React.Component {
	state = {
		name: '',
		folder: '',
		body: '',
		errorMsg: null,
	}

	static contextType = Context

	componentDidMount(){
		if (this.context.folders.length >= 1 ){
			this.setState({ folder: this.context.folders[0].name})
		}  else {
			this.setState({ errorMsg: 'You must create a folder before you can create a note!'})
		}
		
	}

	nameHandler = (e) => {
		this.setState({name: e.target.value})
	}
	
	folderHandler = (e) => {
		this.setState({folder: e.target.value})
	}
	
	bodyHandler = (e) => {
		this.setState({body: e.target.value})
	}
	
	onSubmitHandler = (e, folders, callback) => {
		e.preventDefault();

		let targetFolder = folders.find(folder => folder.name === this.state.folder)		
		let folder_id = targetFolder.id
					
		let body = {
			name: this.state.name,
			folder_id: folder_id,
			content: this.state.body,
 		}
		
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			},
			body: JSON.stringify(body)
		}
		
		const URL = `${config.API_ENDPOINT}api/notes`	
		
		fetch(URL, options)
			.then(response => {
				if (response.ok){
					return response.json()
				} else {
					throw new Error ('something went wrong!')
				}
		})
			.then(responseJson => {
				body.id = responseJson.id
				body.modified = responseJson.modified
			
				callback(body)
			
				this.props.history.replace('/')		
		})
			.catch(error => {
				this.setState({errorMsg: error.message})	
		})
		
		
	}
	
	validateName = () => {
		const name = this.state.name.trim()
		
		if (name.length === 0){
			return 'Please enter a valid name for your note'
		}
	}
	
	render() {
		return (
			<Context.Consumer>
			{ (context)=> {


					if (this.state.errorMsg){
						return <h1>{this.state.errorMsg}</h1>
					} 
					
					return (
						<form className="AddNote" onSubmit={(e)=> this.onSubmitHandler(e, context.folders, context.addNote)}>
							<label>Name: 
								<input type="text" id="name" onChange={this.nameHandler} value={this.state.name} />
							</label>
							
							<label>Folder:
								<ErrorBoundary><FolderSelect folderHandler={this.folderHandler}/></ErrorBoundary>
							</label>
							
							<label>Body:
								<textarea name="" id="body" cols="30" rows="10" onChange={this.bodyHandler} value={this.state.body}></textarea>
							</label>
							
							
							<button 
								type="submit"
								disabled = {this.validateName()}>Submit</button>
							
						</form>
					)
				}
			}
			
			</Context.Consumer>
		)
	}
}

export default AddNote