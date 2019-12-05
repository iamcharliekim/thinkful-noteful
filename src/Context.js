import React from 'react'

const Context = React.createContext({
  folders: [],
	notes: [],
	deleteNotes: ()=>{},
	deleteFolder: ()=> {},
	addNotes: ()=> {},
	addFolder: ()=> {}
})

export default Context