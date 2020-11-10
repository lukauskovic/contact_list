import React from 'react'

const DeleteModal = (props : {cancel : () => void, delete : () => void}) => {

    return(
        <div className='DeleteModal'>
            <div className='DeleteModal__Content'>
                <div className='DeleteModal__Content--Header'>Delete</div>
                <div className='DeleteModal__Content--Main'>

                    <p>Are you sure you want to delete this contact?</p>

                    <div className='DeleteModal__Content--Main_Buttons'>
                        <button onClick={()=>props.cancel()}>Cancel</button>
                        <button onClick={()=>props.delete()}>Delete</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export { DeleteModal }