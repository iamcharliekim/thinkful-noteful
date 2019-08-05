import React from 'react'

const Context = React.createContext({
  folders: [],
	notes: [],
	deleteNotes: () => {},
	addFolder: () => {},
	addNote: () => {}
})

export default Context