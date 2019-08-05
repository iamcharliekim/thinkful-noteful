import React from 'react'
import './Main.css'
import Header from './Header/Header'
import Body from './Body/Body'
import ErrorBoundary from '../ErrorBoundary'

class Main extends React.Component {

	
	render() {
		return (
			<main className="noteful-main">
				<ErrorBoundary>
					<Header />
				</ErrorBoundary>

				<ErrorBoundary>
					<Body/> 
				</ErrorBoundary>
			</main>
		
		)
	}
}

export default Main