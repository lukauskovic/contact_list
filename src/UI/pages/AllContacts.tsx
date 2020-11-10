import { ContactsContext } from 'context/ContactsContext'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AddContact } from 'UI/components/AddContact'
import { ContactCard } from 'UI/components/ContactCard'
import { ContactsSwitch } from 'UI/components/ContactsSwitch'
import { DeleteModal } from 'UI/components/DeleteModal'
import { SearchBar } from 'UI/components/SearchBar'
import { ContactInterface } from 'utils/Interfaces'

const AllContacts = () => {

    const [viewType, setViewType] = useState('allContacts')
    const [searchValue, setSearchValue] = useState('')
    const [deleteModal, setDeleteModal] = useState(-1)

    const contacts = useContext(ContactsContext)

    const searchCondition = (fullName : string) => searchValue !== '' ? fullName.toLowerCase().includes(searchValue.toLowerCase()) : true

    const deleteContact = (index : number) => {
        contacts.deleteContact(index)
        setDeleteModal(-1)
    }


    return(
        <div className='AllContacts'>

                {deleteModal > -1 && 
                    <DeleteModal 
                        cancel={()=>setDeleteModal(-1)}
                        delete={()=>deleteContact(deleteModal)}/>
                }

                <ContactsSwitch viewType={viewType} setViewType={(viewType : string)=>setViewType(viewType)}/>
                <SearchBar searchValue={searchValue} searchContacts={setSearchValue}/>

                <div className='AllContacts__List'>
                    {viewType === 'allContacts' && 
                                <Link to='create_contact'>
                                    <AddContact/>
                                </Link>}
                    {
                        contacts.data.map((contact : ContactInterface, index : number) =>
                            searchCondition(contact.fullName) &&
                                (viewType === 'myFavorites' ?
                                    contact.favorite && 
                                        <Link to={`/details/${index}`} key={index}>
                                            <ContactCard 
                                                index={index}
                                                toggleFavorite={()=>contacts.toggleFavorite(index)} 
                                                contact={contact}
                                                delete={()=>setDeleteModal(index)}/>
                                        </Link> :
                                        <Link to={`/details/${index}`} key={index}>
                                            <ContactCard
                                                index={index} 
                                                toggleFavorite={()=>contacts.toggleFavorite(index)} 
                                                contact={contact}
                                                delete={()=>setDeleteModal(index)}/>
                                        </Link>))
                    }
                </div>
        </div>
    )
}

export { AllContacts }