import React from 'react'
import { ContactInterface } from 'utils/Interfaces'

const ContactCard = (props : {index : number, contact : ContactInterface, toggleFavorite : () => void, delete : () => void}) => {

    const favoriteCheckedIcon = require('assets/images/favoriteCheckedIcon.svg')
    const favoriteUncheckedIcon = require('assets/images/favoriteUncheckedIcon.svg')
    const editIcon = require('assets/images/editIcon.svg')
    const deleteIcon = require('assets/images/deleteIcon.svg')
    const profileAvatar = 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'

    const {index, contact, toggleFavorite} = props

    return(
        <div className='ContactCard'>
            <div className='ContactCard__Settings'>
                <img 
                    alt='' 
                    src={contact.favorite ? favoriteCheckedIcon : favoriteUncheckedIcon}
                    onClick={e => {
                        e.preventDefault()
                        toggleFavorite()}}/>
                <div className='ContactCard__Settings--Right'>
                    <img alt='' src={editIcon} 
                        onClick={(e)=>{
                            e.preventDefault()
                            window.location.href = `/edit_contact/${index}`}}/>
                    <img alt='' src={deleteIcon}
                        onClick={(e)=>{
                            e.preventDefault()
                            props.delete()
                        }}/>
                </div>
            </div>
            <img className='ContactCard__Image' alt='' src={contact.imageUrl ? contact.imageUrl : profileAvatar}/>
            <p className='ContactCard__Name'>{contact.fullName}</p>
        </div>
    )
}

export { ContactCard }