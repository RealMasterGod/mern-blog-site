import React, { useState } from 'react'
import './register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [error,setError] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        const formData = new FormData(e.currentTarget)
        const {username,email,password} = Object.fromEntries(formData)
        try {
            const res = await axios.post('/api/auth/register', {username,email,password})
            res.data && navigate('/login')
        } catch (err) {
            setError(true)
        }

    }
    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form onSubmit={handleSubmit} className="registerForm">
                <label>username</label>
                <input className='registerInput' id='username' name='username' type="text" placeholder='Enter Your Email...' />
                <label>email</label>
                <input className='registerInput' id='email' name='email' type="email" placeholder='Enter Your Email...' />
                <label>password</label>
                <input className='registerInput' id='password' name='password' type="password" placeholder='Enter Your Password...' />
                <button type='submit' className="registerButton">Register</button>
            </form>
            <button className="registerLoginButton">
            <Link className='link' to="/login">Login</Link>
            </button>
            {error && <span style={{color: 'coral',marginTop: '10px'}}>Something went wrong!...Maybe try a different username and valid email</span>}
        </div>
    )
}

export default Register
