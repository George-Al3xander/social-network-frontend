import defaultAvatar from "../../assets/default_avatar.jpg"
import moment from "moment"
import { useContext, useEffect, useState } from "react"
import { Context } from "../../context"
import Comments from "../comments/Comments"
import { Link } from "react-router-dom"
const Post = ({post, setPosts, posts}) => {    
    const [commentsStatus, setCommentsStatus] = useState(false)
    const [comments, setComments] = useState([]);
    const [menuStatus, setMenuStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const [likes, setLikes] = useState({});
    const {apiLink, user,  showEditPostForm, token} = useContext(Context)
    const getComments = async () => {
        setIsLoading(true);
        const res = await fetch(`${apiLink}/posts/${post._id}/comments`, {
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
        if(res.status == 200) {
            setComments(data.comments)
        } else {
            console.log("Error")
        }
        setIsLoading(false);

    }
    
    const getLikes = async () => {
        const res = await fetch(`${apiLink}/posts/${post._id}/likes`, {
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
        if(res.status == 200) {
            //console.log(data.data)
            setLikes(data.data)
        } else {
            console.log("Error")
        }
    }

    const createLike = async () => {
        const res = await fetch(`${apiLink}/posts/${post._id}/likes`, {
            method: "POST",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Authorization" : `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })  
          const data = await res.json();       
          if(res.status == 200) {
              console.log(data)
              //setLikes({...likes, userStatus: true});
              await getLikes();           
          } else {
              console.log("Error")
          }
    }

    const deleteLike = async () => {
        const res = await fetch(`${apiLink}/posts/${post._id}/likes`, {
            method: "DELETE",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Authorization" : `Bearer ${token}`,
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
          })  
          const data = await res.json();       
          if(res.status == 200) {
              console.log(data)
              //setLikes({...likes, userStatus: false});   
              await getLikes();
          } else {
              console.log("Error")
          }
    }

    const deletePost = async () => {
        const res = await fetch(`${apiLink}/posts/${post._id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            })  
            const data = await res.json();       
            if(res.status == 200) {
                setPosts(prev => [...prev.filter((postPrev) => {
                    return postPrev._id != post._id
                })])
                setMenuStatus(false);
            } else {
                console.log(data)
            }
    }
    

    useEffect(() => {
        getComments();
        getLikes();
    },[])
    return(<div key={post._id} className="block post">
        <div className="block-header">        
            <div className="block-header-info">
                <Link to={`/profile/${post.user.id}`}><img className="avatar" src={post.user.avatar ? post.user.avatar : defaultAvatar } alt="avatar" /></Link>
                <div>
                    <Link to={`/profile/${post.user.id}`}>
                        <h1>{`${post.user.name.first} ${post.user.name.last}`}</h1>
                    </Link>
                    <h2>{moment(post.createdAt).format("ll")}</h2>
                </div>
            </div> 
            {post.user.id == user._id ? 
            <svg className="setting-svg" onClick={() => {
                setMenuStatus(prev => !prev)
            }} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M207.858-432Q188-432 174-446.142q-14-14.141-14-34Q160-500 174.142-514q14.141-14 34-14Q228-528 242-513.858q14 14.141 14 34Q256-460 241.858-446q-14.141 14-34 14Zm272 0Q460-432 446-446.142q-14-14.141-14-34Q432-500 446.142-514q14.141-14 34-14Q500-528 514-513.858q14 14.141 14 34Q528-460 513.858-446q-14.141 14-34 14Zm272 0Q732-432 718-446.142q-14-14.141-14-34Q704-500 718.142-514q14.141-14 34-14Q772-528 786-513.858q14 14.141 14 34Q800-460 785.858-446q-14.141 14-34 14Z"/></svg> 
            : null}         

            {menuStatus ? 
                <ul className="hidden-menu post-menu">
                    <li onClick={() => {
                        showEditPostForm(post._id,post.text)
                        setMenuStatus(false)
                    }}>Edit post</li>
                    <li
                        onClick={deletePost}
                    >Delete post</li>
                </ul> 
                
                : null} 
        </div>    
        <div className="block-body">
            <p>{post.text}</p>
        </div>   
        <div className="block-footer">
            <div className="block-footer-info">
                {Object.keys(likes).length > 0 ?  
                <h3>{`${likes.likes.length} Like${likes.likes.length == 1 ? "" : "s"}`}</h3> : null}
                
                {comments.length > 0 ?  <h3 className="active-comment" onClick={() => {
                    setCommentsStatus((prev) => !prev)                    
                }}>{`${comments.length} Comment${comments.length == 1 ? "" : "s"}`}</h3> :  <h3>{`${comments.length} Comment${comments.length == 1 ? "" : "s"}`}</h3> }
               
            </div>
            <div>
                {likes.userStatus ? 

                <button onClick={deleteLike}>Unlike</button> 
                : 

                <button onClick={createLike}>Like</button>
                }

                <button onClick={() => {
                    setCommentsStatus((prev) => !prev)
                }}>Comment</button>
            </div>
                {commentsStatus ? 
                isLoading ?
                <div className="spinner"></div>
                :
                <Comments post={post}  getComments={getComments} comments={comments} /> 
                : 
                null
            }            
        </div> 
    </div>)
}

export default Post