import React from 'react'
import './Main.css'
import Header from './Header/Header'
import Body from './Body/Body'

class Main extends React.Component {

	
	render() {
		return (
			<main className="noteful-main">
				<Header />
				<Body/> 
			</main>
		
		)
	}
}

export default Main