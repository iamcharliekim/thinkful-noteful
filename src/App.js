import React from 'react';
import './App.css';
import { Route} from 'react-router-dom'
import Main from './Main/Main'
import Context from './Context'


class App extends React.Component{
	state = {
		folders: [],
		notes: [],
	}

	componentDidMount() {	
		const foldersURL = `http://localhost:9090/folders`
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
	}

	deleteNotes = (noteID) => {
		
		const newNotesArr = this.state.notes.filter(note => note.id !== noteID)
		
		console.log('newNotesArr:', newNotesArr)
		this.setState({
			notes: newNotesArr
		})
		
		
		
	}


	
	render() {
		const contextValue = {
			folders: this.state.folders,
			notes: this.state.notes,
			deleteNotes: this.deleteNotes
		}
		

		return (
			<Context.Provider value={contextValue}>
				<div className="App">
			  		<Route path="/"  component={Main}/>
				</div>
			</Context.Provider>
				);	
	}
}

export default App;
