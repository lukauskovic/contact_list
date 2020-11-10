import React from 'react'

const SearchBar = (props : {searchValue : string, searchContacts : (searchValue : string) => void}) => {

    const {searchValue, searchContacts} = props

    return(
        <div className='SearchBar'>
            <input 
                type='text'
                value={searchValue}
                onChange={(e)=>searchContacts(e.target.value)}/>    
        </div>
    )
}

export { SearchBar }