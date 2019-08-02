import React from 'react'

const Context = React.createContext({
  folders: [],
	notes: [],
	deleteNotes: () => {},
})

export default Context