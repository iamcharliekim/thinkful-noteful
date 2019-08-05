import React from 'react';
import './App.css';
import { Route} from 'react-router-dom'
import Main from './Main/Main'
import Context from './Context'


class App extends React.Component{
	state = {
		folders: [],
		notes: [],
		error: false,
		errorMsg: '',
	}

	componentDidMount() {		
		this.getFolders();
		this.getNotes();
	}

	getFolders = () => {
		// throw error on purpose by spelling 'folders' wrong
		const foldersURL = `http://localhost:9090/foslders`
		
		fetch(foldersURL)
			.then(response => {
				if (response.ok){
					return response.json()
				} else {
					throw new Error('Something went wrong')
				}
		})
			.then(responseJson => {
				this.setState({ folders: responseJson})
		})
			.catch(error => {
				console.log(error)
			
				// if there is an error, set the error state to true with the errorMsg to handle in render()
				this.setState({error: true, errorMsg: error})
		})		
	}
	
	getNotes = () => {
		const notesURL = `http://localhost:9090/notes`	
		
		fetch(notesURL)
			.then(response => {
				if (response.ok){
					return response.json()
				} else {
					throw new Error('Something went wrong')
				}
		})
			.then(responseJson => {
				this.setState({ notes: responseJson})
		})
			.catch(error => {
				console.log(error)
			
				//this.setState({ error: true, errorMsg: error})
		})		
	}

	deleteNotes = (noteID) => {
		const newNotesArr = this.state.notes.filter(note => note.id !== noteID)
		this.setState({ notes: newNotesArr })
	}
	
	addFolder = (folder) => {
		const foldersCopy = [...this.state.folders]
		foldersCopy.push(JSON.parse(folder))

		this.setState({folders: foldersCopy})
	}
	
	addNote = (note) => {
		const notesCopy = [...this.state.notes]
		notesCopy.push(note)
		
		this.setState({notes: notesCopy})	
	}


	
	render() {
		const contextValue = {
			folders: this.state.folders,
			notes: this.state.notes,
			deleteNotes: this.deleteNotes,
			addFolder: this.addFolder,
			addNote: this.addNote
		}
		
		// conditionally render based on error
		let route;
		
		if (this.state.error){
			route = <h1>{this.state.errorMsg}</h1>
		} else {
			route = <Route path="/"  component={Main}/>
		}
		

		return (
			<Context.Provider value={contextValue}>
				<div className="App">
					{route}
				</div>
			</Context.Provider>
				);	
	}
}

export default App;
