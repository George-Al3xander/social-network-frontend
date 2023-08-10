import { Context } from "../../context";
import { useContext, useEffect, useState } from "react";
import CreatePostBlock from "../CreatePostBlock";
import Post from "./Post";
const PostsHome = ({setCreatePostFormStatus}) => {
    const {apiLink} = useContext(Context);
    const [posts, setPosts] = useState([]);
    const getFeed = async () => {
        const res = await fetch(`${apiLink}/posts/feed`, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
        })  
        const data = await res.json();
        //console.log(data)
        setPosts(data.data)
    }
    useEffect(() => {
        getFeed();
    },[])
    return(
        <div className="container posts">
            <CreatePostBlock setCreatePostFormStatus={setCreatePostFormStatus} />
            {posts.length > 0 ? posts.slice(0).reverse().map((post) => {
                return <Post post={post}/>
            }) : null}
        </div>
    )
}

export default PostsHome