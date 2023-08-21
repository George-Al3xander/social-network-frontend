import { Context } from "../../context";
import { useContext, useEffect, useState } from "react";
import CreatePostBlock from "../CreatePostBlock";
import Post from "./Post";
const PostsHome = ({setCreatePostFormStatus}) => {
    const {apiLink,token} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const getFeed = async () => {
        const res = await fetch(`${apiLink}/posts/feed`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Authorization" : `Bearer ${token}`,
          },
        })  
        const data = await res.json();
        //console.log(data)
        setPosts(data.data)
        setIsLoading(false)
    }
    useEffect(() => {
        getFeed();
    },[])
    return(
        <div className="container posts">        
            <CreatePostBlock setCreatePostFormStatus={setCreatePostFormStatus} />
            {isLoading ?
            <div className="spinner"></div>
            :
            posts.length > 0 ? posts.slice(0).reverse().map((post) => {
                return <Post setPosts={setPosts} posts={posts} post={post}/>
            }) 
            : 
            <h2>No posts yet</h2>
            }
            
        </div>
    )
}

export default PostsHome