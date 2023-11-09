import React from 'react'
import './Body.css'

const Body = ({children}) => {
    return (
    <div className='container-fluid body-style'>
        {children}
    </div>
    )
}

export default Body