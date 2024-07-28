import React, { useContext } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/Context'
import { logout } from '../../context/Actions'

const Topbar = () => {
    const {user,dispatch} = useContext(GlobalContext)
    const PF = 'http://localhost:5000/images/'
    return (
        <div className='top'>
            <div className="topLeft">
            <i className="topIcon fa-brands fa-square-facebook"></i>
            <i className="topIcon fa-brands fa-square-x-twitter"></i>
            <i className="topIcon fa-brands fa-square-pinterest"></i>
            <i className="topIcon fa-brands fa-square-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className='link' to='/' >Home</Link>
                    </li>
                    <li className="topListItem">
                        <Link className='link' to='/' >About</Link>
                    </li>
                    <li className="topListItem">
                        <Link className='link' to='/' >Contact</Link>
                    </li>
                    <li className="topListItem">
                        <Link className='link' to='/write' >Write</Link>
                    </li>
                    <li className="topListItem" onClick={() => dispatch(logout())}>
                        {user && "Logout"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link className='link' to='/setting'>
                        <img className='topImg' src={user.profilePic} alt="" />
                    </Link>
                ) : (
                    <ul  className='topList'>
                        <li className='topListItem'>
                            <Link className='link' to='/login' >Login</Link>
                        </li>
                        <li className='topListItem'>
                            <Link className='link' to='/register' >Register</Link>
                        </li>
                    </ul>
                )}
                
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}

export default Topbar
