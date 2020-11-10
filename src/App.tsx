import React from 'react'
import 'assets/styles/app.scss'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { AllContacts } from 'UI/pages/AllContacts'
import ContactsProvider from "./context/ContactsContext"
import { ContactDetails } from 'UI/pages/ContactDetails'
import { Header } from 'UI/components/Header'
import { EditContact } from 'UI/pages/EditContact'


const App = () => {

	return(
		<div className='App'>
			<Header/>
			<ContactsProvider>
				<Router>
					<Route path='/' exact={true}>
						<AllContacts/>
					</Route>
					<Route path='/details/:index' exact={true}>
						<ContactDetails/>
					</Route>
					<Route path='/create_contact'>
						<EditContact/>
					</Route>
					<Route path='/edit_contact/:index'>
						<EditContact/>
					</Route>
				</Router>
			</ContactsProvider>
		</div>

	)
}

export { App }