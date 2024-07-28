import React, { useEffect, useState } from 'react'
import Header from '../../components/header'
import Posts from '../../components/posts'
import Sidebar from '../../components/sidebar'
import './home.css'
import axios from 'axios'
import { useLocation } from 'react-router-dom'

const Home = () => {
    const [posts,setPosts] = useState([])
    const {search} = useLocation()
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('/api/posts'+ search)
                setPosts(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchPosts()
    },[search])
    return (
        <>
        <Header />
        <div className='home'>
            <Posts posts={posts}/>
            <Sidebar />
        </div>
        </>
    )
}

export default Home
