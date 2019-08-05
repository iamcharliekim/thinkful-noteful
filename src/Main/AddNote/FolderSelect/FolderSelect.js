import React from 'react'
import Context from '../../../Context'
import './FolderSelect.css'
import PropTypes from 'prop-types'

const folderSelect = (props) => {
	return (
		<Context.Consumer>
			{ (context)=> {	
				let foldersArr = context.folders		
				let folderOptions = foldersArr.map(folder => {
					return <option value={folder.name} key={folder.id}>{folder.name}</option>
				})
				
				return (
						<select className="folderSelect" onChange={props.folderHandler}>
							{folderOptions}
						</select>
				)
			}}
		</Context.Consumer>
	)
}

folderSelect.propTypes = {
	folderHandler: PropTypes.func.isRequired
}

export default folderSelect