import React, { useContext, useState } from 'react'
import './setting.css'
import Sidebar from '../../components/sidebar'
import { GlobalContext } from '../../context/Context'
import axios from 'axios'
import { logout, updateFailure, updateStart, updateSuccess } from '../../context/Actions'
import { useNavigate } from 'react-router-dom'
import { upload } from '../../uploadImage'

const Setting = () => {
    const {user,dispatch} = useContext(GlobalContext)
    const navigate = useNavigate()
    const PF = 'http://localhost:5000/images/'
    const [newPostData,setNewPostData] = useState({
        username: "",
        email: "",
        password: "",
        desc: "",
        file: null,
    })
    const [success,setSuccess] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(updateStart())
        setSuccess(false)
        const {file,...other} = newPostData
        const updatedUser = {
            userId: user._id,
            ... other.username ? {username: other.username} : {},
            ... other.desc ? {desc: other.desc} : {},
            ... other.email ? {email: other.email} : {},
            ... other.password ? {password: other.password} : {},
        }
        if(file) {
            // const data = new FormData()
            // const filename = Date.now() + newPostData.file.name
            // data.append("name",filename)
            // data.append("file",newPostData.file)
            // updatedUser.profilePic = filename
            try {
                updatedUser.profilePic = await upload(file)
            } catch (err) {
                console.log(err)
            }
        }
        try {
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/`+user._id, updatedUser)
            setSuccess(true)
            dispatch(updateSuccess(res.data))
        } catch (err) {
            dispatch(updateFailure())
        }
    }
    const handleChange = (e) => {
        setNewPostData({...newPostData,[e.target.name]:e.target.value})
    }
    const handleDelete = async () => {
        try {
            await axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}api/users/`+user._id, {data: {userId:user._id}})
            dispatch(logout())
            navigate('/login')
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='setting'>
            <div className="settingWrapper">
                <div className="settingTitle">
                    <span className="settingUpdateTitle">update your account</span>
                    <span onClick={handleDelete} className="settingDeleteTitle">delete account</span>
                </div>
                <form className="settingForm" onSubmit={handleSubmit}>
                    <label>profile picture</label>
                    <div className="settingPP">
                        <img src={newPostData.file ? URL.createObjectURL(newPostData.file) :user.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <i className=" settingPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input onChange={(e) => setNewPostData({...newPostData,file: e.target.files[0]})} type="file" id='fileInput' style={{display: 'none'}} />
                    </div>
                    <label>username</label>
                    <input type="text" name='username' placeholder={user.username} onChange={handleChange}/>
                    <label>description</label>
                    <textarea type="text" rows={3} name='desc' placeholder={user.desc || "You haven't added any description"} onChange={handleChange}/>
                    <label>email</label>
                    <input type="email" name='email' placeholder={user.email} onChange={handleChange}/>
                    <label>password</label>
                    <input type="password" name='password' onChange={handleChange} />
                    <button type='submit' className="settingSubmit">Update</button>
                    {success && <span style={{color: 'green',textAlign:'center',marginTop: '20px'}}>Profile has been updated...</span>}
                </form>
            </div>
            <Sidebar />
        </div>
    )
}

export default Setting
