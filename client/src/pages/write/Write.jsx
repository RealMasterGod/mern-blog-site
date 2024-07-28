import React, { useContext, useState } from 'react'
import { GlobalContext } from '../../context/Context'
import './write.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { upload } from '../../uploadImage'

const Write = () => {
    const [newPostData,setNewPostData] = useState({
        title: "",
        desc: "",
        categories: "",
        file: null,
    })
    const navigate = useNavigate()
    const {user} = useContext(GlobalContext)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const {file,categories,...other} = newPostData
        const newPost = {...other,username: user.username}
        if(categories) {
            const cat = categories.split(" ")
            newPost.categories = cat
        }
        if(file) {
            // const data = new FormData()
            // const filename = Date.now() + newPostData.file.name
            // data.append("name",filename)
            // data.append("file",newPostData.file)
            // newPost.photo = filename
            try {
                // await axios.post('/api/upload', data)
                newPost.photo = await upload(file)
            } catch (err) {
                console.log(err)
            }
        }
        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}api/posts`, newPost)
            navigate(`/post/${res.data._id}`)
        } catch (err) {
            console.log(err)
        }
    }
    const handleChange = (e) => {
        setNewPostData({...newPostData,[e.target.name]:e.target.value})
    }
    return (
        <div className='write'>
            {newPostData.file && <img className='writeImg' src={URL.createObjectURL(newPostData.file)} alt="" />}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <div className='out-div'>
                    <label className='img-label' htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" onChange={(e) => setNewPostData({...newPostData,file: e.target.files[0]})} id='fileInput' style={{display: 'none'}} />
                    <input type="text" required name='title' onChange={handleChange} placeholder='Title' className='writeInput inputTitle' autoFocus={true} />
                    </div>
                    <input type="text" name='categories' onChange={handleChange} placeholder='Categories eg. Art Music Technology...' className='writeInput cat' autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea name='desc' required onChange={handleChange} placeholder='Tell your story' type='text' className='writeInput writeText' ></textarea>
                </div>
                <button type='submit' className='writeSubmit'>Publish</button>
            </form>
        </div>
    )
}

export default Write
