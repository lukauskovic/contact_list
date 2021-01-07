import React from 'react'

const AddContact = () => {

	const addIcon = require('../../assets/images/addIcon.svg')

	return(
		<div className='AddContact'>
			<img alt='' src={addIcon}/>
			<p>Add new</p>
		</div>
	)
}

export { AddContact }