import React from 'react'

const ContactsSwitch = (props : {viewType : string, setViewType : (viewType: string) => void}) => {

    const {viewType, setViewType} = props

    return(
        <div className='ContactsSwitch'>

            <div className='ContactsSwitch__Controls'>
                <p onClick={()=>setViewType('allContacts')}
                    className={viewType === 'allContacts' ? 'ContactsSwitch__Controls--Active' : ''}>
                    All contacts</p>

                <div className='ContactsSwitch__Controls--Divider'/>

                <p onClick={()=>setViewType('myFavorites')}
                    className={viewType === 'myFavorites' ? 'ContactsSwitch__Controls--Active' : ''}>
                    My favorites</p>
            </div>

            <div className='ContactsSwitch__Rectangle'/>
        </div>
    )
}

export { ContactsSwitch }