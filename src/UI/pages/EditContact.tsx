import { ContactsContext } from 'context/ContactsContext'
import React, {useContext, useState} from 'react'
import { Link, useParams } from 'react-router-dom'
import { DeleteModal } from 'UI/components/DeleteModal'
import { ContactInterface } from 'utils/Interfaces'

const EditContact = () => {

	const uploadIcon = require('assets/images/uploadIcon.svg')
	const backIcon = require('assets/images/backIcon.svg')
	const personIcon = require('assets/images/personIcon.svg')
	const emailIcon = require('assets/images/emailIcon.svg')
	const phoneIcon = require('assets/images/phoneIcon.svg')
	const deleteIcon = require('assets/images/deleteIcon.svg')

	const { index } = useParams()
	const contacts = useContext(ContactsContext)
	const contact = contacts.data[Number(index)]

	const [deleteModalActive, setDeleteModalActive] = useState(false)
	const [image, setImage] = useState(contact ? contact.imageUrl : '')
	const [fullName, setFullName] = useState(contact ? contact.fullName : '')
	const [fullNameError, setFullNameError] = useState(false)
	const [email, setEmail] = useState(contact ? contact.email : '')
	const [emailError, setEmailError] = useState(false)
	const [numbers, setNumbers] = useState<{[key : string] : string}[]>(contact ? contact.numbers : [{'' : ''}])
	const [numbersError, setNumbersError] = useState([false])

	const setImageField = (selectorFiles : FileList) => {
		const reader = new FileReader()
		reader.readAsDataURL(selectorFiles[0])
		reader.onloadend = function() {
			setImage(String(reader.result))
		}
	}

	const setFullNameField = (event : React.ChangeEvent<HTMLInputElement>) => {
		event.target.value.length < 5 ? setFullNameError(true) :  setFullNameError(false)
		setFullName(event.target.value)
	}

	const setEmailField = (event : React.ChangeEvent<HTMLInputElement>) => {
		event.target.value.length < 5 ? setEmailError(true) :  setEmailError(false)
		setEmail(event.target.value)
	}

	const setNumbersField = (value : string, index : number, type : number) => {
		const phoneRegex = /^[+\d]?(?:[\d-.\s()]*)$/
		const updatedNumbers = [...numbers]
		numbersInputCheck()
		if(type === 1) {
			value.match(phoneRegex) && (updatedNumbers[index][Object.keys(updatedNumbers[index])[0]] = value)
		} else {
			const objectToChange = updatedNumbers[index]
			const newObj : {[key : string] : string} = {}
			newObj[value] = objectToChange[Object.keys(objectToChange)[0]]
			updatedNumbers[index] = newObj
		}
		setNumbers(updatedNumbers)
	}

	const deleteNumber = (index : number) => {
		const updatedNumbers = [...numbers]
		updatedNumbers.splice(index, 1)
		setNumbers(updatedNumbers)
		numbersInputCheck()
	}
	const addNumber = () => {
		const updatedNumbers = [...numbers]
		updatedNumbers.push({'' : ''})
		setNumbers(updatedNumbers)
	}

	const numbersInputCheck = () => {
		const numbersError : boolean[] =
			numbers.map((number : {[key : string] : string}) =>
				Object.keys(number)[0] === '' || number[Object.keys(number)[0]] === '')
		setNumbersError(numbersError)

		return numbersError
	}

	const deleteContact = () => {
		contacts.deleteContact(index)
		window.location.href = '/'
	}

	const saveContact = () => {
		const submitCondition = fullName.length && email.length && !numbersInputCheck().includes(true)
		if(!submitCondition) {
			!fullName.length && setFullNameError(true)
			!email.length && setEmailError(true)
		} else {
			const contactToSave : ContactInterface = {
				fullName,
				favorite : contact ? contact.favorite : false,
				email,
				imageUrl : image,
				numbers
			}
			contacts.updateContacts(contactToSave, index && index)
			window.location.href=`/`
		}
	}

	return(
		<div className='EditContact'>

				{deleteModalActive &&
					<DeleteModal
						cancel={()=>setDeleteModalActive(false)}
						delete={()=>deleteContact()}/>}

				<label className='EditContact__Image'>
					{image ?
						<div
							className='EditContact__Image--Uploaded'
							onClick={(e) => {
								e.preventDefault()
								setImage('')}
							}>
							<img alt='' src={image}/>
							<div>+</div>
						</div> :
						<div className='EditContact__Image--Placeholder'>
							<img alt='' src={uploadIcon}/>
						</div>}
					<input type='file' name='image'
						accept='image/png, image/jpeg'
						onChange={(e) => e.target.files && setImageField(e.target.files)}  hidden
						disabled={image ? true : false}/>
				</label>

				<div className='EditContact__Right'>
						<div className='EditContact__Right--Header'>
							<Link to='/'>
								<img alt='' src={backIcon}/>
							</Link>
							{
								contact &&
									<div onClick={()=>setDeleteModalActive(true)}>
										<p>Delete</p>
										<img alt='' src={deleteIcon}/>
									</div>
							}
						</div>
						<label className={fullNameError ? 'EditContact__Right--Error' : ''}>
							<div className='EditContact__Right--LabelInfo'>
								<img alt='' src={personIcon}/>
								<p>full name</p>
							</div>
							<input type='text'
								value={fullName}
								onChange={setFullNameField}
								placeholder='Full Name'/>
						</label>
						<label className={emailError ? 'EditContact__Right--Error' : ''}>
							<div className='EditContact__Right--LabelInfo'>
								<img alt='' src={emailIcon}/>
								<p>email</p>
							</div>
							<input type='text'
								value={email}
								onChange={setEmailField}
								placeholder='Email'/>
						</label >
						<div>
							<div className='EditContact__Right--LabelInfo'>
								<img alt='' src={phoneIcon}/>
								<p>numbers</p>
							</div>
							{
								numbers.map((number : {[key : string] : string}, index) =>
								<div key={index}
									className={!numbersError[index] ?
										'EditContact__Right--NumberGroup' :
										'EditContact__Right--NumberGroup EditContact__Right--Error'}
									>
									<input type='text'
										placeholder='Number'
										value={number[Object.keys(number)[0]]}
										onChange={(e)=>setNumbersField(e.target.value, index, 1)}/>
									<input type='text'
										placeholder='Cell'
										value={Object.keys(number)[0]}
										className='EditContact__Right--SecondInput'
										onChange={(e)=>setNumbersField(e.target.value, index, 2)}/>
									{
										numbers.length > 1 &&
										<p className='Icon DeleteNumber'
											onClick={()=>numbers.length > 1 && deleteNumber(index)}>+</p>
									}

								</div>)
							}
							<div className='EditContact__Right--AddNumber'
								onClick={addNumber}>
								<p className='Icon AddNumber'>+</p>
								<p>Add number</p>
							</div>
						</div>
						<div className='EditContact__Right--Buttons'>
							<button onClick={()=>contact ?
								window.location.href=`/details/${index}` :
								window.location.href=`/`}>Cancel</button>
							<button onClick={saveContact}>Save</button>
						</div>
				</div>


		</div>
	)
}

export { EditContact }