import React from 'react'
import './posts.css'
import Post from '../post'

const Posts = ({posts}) => {
    if(posts.length < 1) {
        return (
            <div className="posts">
                <h2>No Posts Available :/</h2>
            </div>
        )
    }
    return (
        <div className='posts'>
            {posts.map((post) => {
                return <Post key={post._id} post={post}/>
            })}
        </div>
    )
}

export default Posts
