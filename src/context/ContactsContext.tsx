import React, { Component } from 'react'
import { ContactInterface } from 'utils/Interfaces'

const mockData : ContactInterface[] = require('mockData.json')
const localData = localStorage.getItem("contacts")

interface ContactContextProps {
    data : ContactInterface[]
    toggleFavorite : (index : number) => void
    updateContacts: (contact : ContactInterface, index? : number) => void
    deleteContact: (index : number) => void
}

const initialData = {
    data : localData ? JSON.parse(localData) : mockData,
    toggleFavorite: (index : number) => {},
    updateContacts: (contact : ContactInterface, index? : number) => {},
    deleteContact: (index : number) => {}
} 

export const ContactsContext = React.createContext<ContactContextProps>(initialData)

class ContactsProvider extends Component {

    toggleFavorite = (index : number) => {
        let updatedData = [...this.state.data]
        updatedData[index].favorite = !updatedData[index].favorite
        this.setState(updatedData)
        localStorage.setItem("contacts", JSON.stringify(updatedData))
    }

    updateContacts = (contact : ContactInterface, index? : number) => {
        let updatedData
        if(index){
            updatedData = [...this.state.data]
            updatedData[index] = contact
        } else {
            updatedData = [...this.state.data, contact]
        }
        this.setState(updatedData)
        localStorage.setItem("contacts", JSON.stringify(updatedData))
    }

    deleteContact = (index : number) => {
        let updatedData = this.state.data
        this.state.data.splice(index, 1)
        this.setState(updatedData)
        localStorage.setItem("contacts", JSON.stringify(updatedData))
    }

    state : ContactContextProps = {
        data : initialData.data,
        toggleFavorite : this.toggleFavorite,
        updateContacts : this.updateContacts,
        deleteContact: this.deleteContact
    }
    
    render() {
		return (
			<ContactsContext.Provider value={this.state}>
				{this.props.children}
			</ContactsContext.Provider>
		)
	}
} 

export default ContactsProvider