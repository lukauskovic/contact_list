import React from 'react'

const Header = () => {

    const logo = require('../../assets/images/header.svg')

    return(
        <div className='Header'>
            <img className='Header__Logo' alt='' src={logo}/>
            <div className='Header__Rectangle'/>
        </div>
    )
}

export { Header }