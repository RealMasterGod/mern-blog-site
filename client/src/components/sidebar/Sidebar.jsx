import React, { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../context/Context'

const Sidebar = () => {
    const [cats,setCats] = useState([])
    const {user} = useContext(GlobalContext)
    useEffect(() => {
        const fetchCats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BASE_URL}api/categories`)
                setCats(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchCats()
    },[])
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">{user ? "about me" : "Login to view your details here"}</span>
                <img src={user ? user.profilePic : "https://images.pexels.com/photos/3019613/pexels-photo-3019613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="" />
                <p>{user ? user.desc ? user.desc : "You haven't written about yourself. Let people know a little about yourself." : "Login to describe yourself to others..."}</p>
            </div>
            <div className="sidebarItem">
                <span className='sidebarTitle'>categories</span>
                <ul className="sidebarList">
                    {cats?.map((cat) => {
                        return <Link  key={cat._id} className='link' to={`/?cat=${cat.name}`}><li className="sidebarListItem">{cat.name}</li></Link>
                    })}
                </ul>
            </div>
            <div className="sidebarItem">
                <span className='sidebarTitle'>follow us</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-square-x-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-square-instagram"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
