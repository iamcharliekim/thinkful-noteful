import React from 'react';
import './App.css';
import { Route} from 'react-router-dom'
import Main from './Main/Main'
import Context from './Context'
import config from './config';


class App extends React.Component{
	state = {
		folders: [],
		notes: [],
		errorMsg: null,
	}

	componentDidMount() {	
		this.getFolders();
		this.getNotes();

	}

	getFolders = () => {
		const foldersURL = `${config.API_ENDPOINT}api/folders`
		const options = {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			}
		}


		fetch(foldersURL, options)
			.then(response => {
				if (response.ok){
					return response.json()
				} else {
					throw new Error('Something went wrong!')
				}
		})
			.then(responseJson => {
				this.setState({ folders: responseJson})
		})
			.catch(error => {
				this.setState({errorMsg: error.message})
		})		
	}
	
	getNotes = () => {
		const notesURL = `${config.API_ENDPOINT}api/notes`	
		const options = {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				'Authorization': `Bearer ${config.API_KEY}`
			}
		}
		
		fetch(notesURL, options)
			.then(response => {
				if (response.ok){
					return response.json()
				} else {
					throw new Error('Something went wrong!')
				}
		})
			.then(responseJson => {
				this.setState({ notes: responseJson})
		})
			.catch(error => {
				this.setState({ errorMsg: error.message})
		})		
	}

	deleteNotes = (noteID) => {
		const newNotesArr = [...this.state.notes]

		const noteToDeleteIndex = newNotesArr.findIndex((note)=> note.id === noteID)

		newNotesArr.splice(noteToDeleteIndex, 1)

		this.setState({ notes: newNotesArr })
	}

	deleteFolder = (folderID)=> {
		const newFoldersArr = [...this.state.folders]
		const newNotesArr = [...this.state.notes]

		// delete folder
		const folderToDeleteIndex = newFoldersArr.findIndex((folder)=> folder.id === folderID)
		newFoldersArr.splice(folderToDeleteIndex, 1)
		this.setState({ folders: newFoldersArr})

		// delete any notes inside of folder
		const updatedNotesArr = newNotesArr.filter((note)=> note.folder_id !== folderID)

		this.setState({ notes: updatedNotesArr})

	}
	
	addFolder = (folder) => {
		const foldersCopy = [...this.state.folders]
		foldersCopy.push(folder)

		this.setState({folders: foldersCopy})
	}
	
	addNote = (note) => {
		const notesCopy = [...this.state.notes]
		notesCopy.push(note)
		
		this.setState({notes: notesCopy})	
	}
	
	render() {
		const contextClone = {
			folders: this.state.folders,
			notes: this.state.notes,
			deleteNotes: this.deleteNotes,
			addFolder: this.addFolder,
			addNote: this.addNote,
			deleteFolder: this.deleteFolder
		}

		
		let route;
		
		if (this.state.errorMsg){
			route = <h1>{this.state.errorMsg}</h1>
		} else {
			route = <Route path="/"  component={Main}/>
		}
		
		return (
			<Context.Provider value={contextClone}>
				<div className="App">
					{route}
				</div>
			</Context.Provider>
				);	
	}
}

export default App;
