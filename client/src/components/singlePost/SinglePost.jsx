import React, { useContext, useEffect, useState } from 'react'
import './singlePost.css'
import {useLocation} from 'react-router'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/Context'
import { useNavigate } from 'react-router-dom'

const SinglePost = () => {
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const [post,setPost] = useState({})
    const {user} = useContext(GlobalContext)
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [updateMode,setUpdateMode] = useState(false)
    const PF = 'http://localhost:5000/images/'
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/api/posts/${path}`)
                setPost(res.data)
                setTitle(res.data.title)
                setDesc(res.data.desc)
            } catch (err) {
                console.log(err)
            }
        }
        fetchPost()
    },[path])
    const handleDelete = async () => {
        try {
            await axios.delete('/api/posts/'+path, {data: {username:user.username}})
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }
    const handleUpdate = async () => {
        try {
            const res = await axios.put(`/api/posts/${post._id}`, {username: user.username, title,desc})
            setUpdateMode(false)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && 
                    <img className='postImg' src={post.photo} alt="" />
                }
                {
                    updateMode ? (<input onChange={(e) => setTitle(e.target.value)} autoFocus type="text" value={title} className='singlePostTitleInput' />) : (
                        <h1 className="singlePostTitle">
                        {title}
                        {post.username === user?.username &&
                        <div className="singlePostEdit">
                            <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                            <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                        </div>
                    }
                </h1>
                    )
                }
                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Author: 
                        <Link className='link' to={`/?user=${post.username}`}><b>{post.username}</b></Link>
                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {
                    updateMode ? <textarea onChange={(e) => setDesc(e.target.value)} value={desc} className='singlePostDescInput' /> : <p className='singlePostDesc'>{desc}</p>
                }
                {updateMode && <button className='singlePostButton' onClick={handleUpdate}>Update</button>}
            </div>
        </div>
    )
}

export default SinglePost
