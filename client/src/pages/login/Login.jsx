import React, { useContext, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/Context'
import { loginFailure, loginStart, loginSuccess } from '../../context/Actions'
import axios from 'axios'

const Login = () => {
    const userRef = useRef()
    const passRef = useRef()
    const {dispatch,isFetching} = useContext(GlobalContext)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginStart())
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}api/auth/login`, {username: userRef.current.value,password: passRef.current.value})
            dispatch(loginSuccess(res.data))
        } catch (err) {
            dispatch(loginFailure())
        }
    }
    return (
        <div className='login'>
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input ref={userRef} className='loginInput' type="text" placeholder='Enter Your Username...' />
                <label>password</label>
                <input ref={passRef} className='loginInput' type="password" placeholder='Enter Your Password...' />
                <button type='submit' className="loginButton" disabled={isFetching}>Login</button>
            </form>
            <button className="loginRegisterButton">
                <Link className='link' to="/register">Register</Link>
            </button>
        </div>
    )
}

export default Login
