import { ContactsContext } from 'context/ContactsContext'
import React, { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'

const ContactDetails = () => {

	const backIcon = require('assets/images/backIcon.svg')
	const editIcon = require('assets/images/editIcon.svg')
	const favoriteCheckedIcon = require('assets/images/favoriteCheckedIcon.svg')
	const favoriteUncheckedIcon = require('assets/images/favoriteUncheckedIcon.svg')
	const emailIcon = require('assets/images/emailIcon.svg')
	const phoneIcon = require('assets/images/phoneIcon.svg')
	const profileAvatar = 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png'


	const { index } = useParams()
	const contacts = useContext(ContactsContext)
	const contact = contacts.data[Number(index)]

	return(
		<div className='ContactDetails'>
			<img className='ContactDetails__Image' alt='' src={contact.imageUrl ? contact.imageUrl : profileAvatar}/>
			<div className='ContactDetails__Data'>

				<div className='ContactDetails__Data--Header'>
					<Link to={'/'}>
						<img src={backIcon} alt=''/>
					</Link>
					<p>{contact.fullName}</p>
					<div>
						<img
							src={contact.favorite ? favoriteCheckedIcon : favoriteUncheckedIcon} alt=''
							onClick={()=>contacts.toggleFavorite(index)}/>
						<Link to={`/edit_contact/${index}`}>
							<img src={editIcon} alt=''/>
						</Link>
					</div>
				</div>

				<div className='ContactDetails__MobileTitleBar'>
					<img alt='' src={contact.imageUrl ? contact.imageUrl : profileAvatar}/>
					<p>{contact.fullName}</p>
				</div>

				<div className='ContactDetails__Data--Info'>
					<div className='ContactDetails__Data--Info_Row'>
						<div className='ContactDetails__Data--Info_Col1'>
							<img src={emailIcon} alt=''/>
							<p>email</p>
						</div>
						<p className='ContactDetails__Data--Info_Col2'>{contact.email}</p>
					</div>
					<div className='ContactDetails__Data--Info_Row'>
						<div className='ContactDetails__Data--Info_Col1'>
							<img src={phoneIcon} alt=''/>
							<p>numbers</p>
						</div>
						<div className='ContactDetails__Data--Info_Numbers'>
							{
								contact.numbers.map((number : {[key: string]: string}, index : number) =>
								<div key={index}>
									<p>{Object.keys(number)[0]}</p>
									<p>{number[Object.keys(number)[0]]}</p>
								</div>)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export { ContactDetails }