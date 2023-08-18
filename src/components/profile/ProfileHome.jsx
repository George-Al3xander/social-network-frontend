import CreatePostBlock from "../CreatePostBlock"
import {  useParams } from "react-router-dom"
import { Context } from "../../context"
import { useContext, useEffect, useState } from "react"
import Post from "../posts/Post"
const ProfileHome = ({setCreatePostFormStatus}) => {
    const {id} = useParams()
    const {user, apiLink, token} = useContext(Context)
    const [posts, setPosts] = useState([])
    const getPosts = async () => {
        const res = await fetch(`${apiLink}/posts?userId=${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
        })

        const data = await res.json();
        console.log(data)
        setPosts(data.posts)
    }
    useEffect(() => {
        getPosts();
    }, [])
    return(<div className="container profile-container">

        <div className="post-warning"><h1>Posts</h1></div>
        {id == user._id ? <CreatePostBlock setCreatePostFormStatus={setCreatePostFormStatus} /> : null}
        {posts.length > 0 ? posts.slice(0).reverse().map((post) => {
                return <Post setPosts={setPosts} posts={posts} post={post}/>
        }) : null}
    </div>)
}

export default ProfileHome