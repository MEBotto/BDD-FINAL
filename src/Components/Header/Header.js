import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div>
            <div className='container-fluid header-style'>
                <div className='row col-12'>
                    <div className='col-4'>
                        <img src='./Images/LogoUTN.jpg' alt='Logo UTN' className='logo-style'/>
                    </div>
                    <div className='col-8 header-title-style'>
                        FRSN UTN 
                    </div>
                </div>  
            </div>
            <div className='container-fluid'>
                <div className='row purple-divider'>
                </div>             
            </div>
        </div>            
    )
}

export default Header