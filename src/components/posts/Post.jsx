import defaultAvatar from "../../assets/default_avatar.jpg"
import moment from "moment"
import Comment from "../comments/Comment"
import { useContext, useState } from "react"
import { Context } from "../../context"
const Post = ({post}) => {
    const {user, apiLink} = useContext(Context);
    const [commentsStatus, setCommentsStatus] = useState(false)
    const valid = new RegExp(/\S/);
    const [validStatus, setValidStatus] = useState(false);
    const [commentText, setCommentsText] = useState("")
    const createComment = async (e) => {
        e.preventDefault();
        const res = await fetch(`${apiLink}/comments`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({
                postId: post._id,
                text: commentText,
            })
        })
        const data =  await res.json();
        
        console.log(data)
        if(res.status == 200) {
            setCommentsText("")
            setValidStatus(false);
        }
    }
    return(<div className="block">
        <div className="block-header">        
            <img className="avatar" src={post.user.avatar ? post.user.avatar : defaultAvatar } alt="avatar" />
            <div>
                <h1>{`${post.user.name.first} ${post.user.name.last}`}</h1>
                <h2>{moment(post.createdAt).format("ll")}</h2>
            </div>           
        </div>    
        <div className="block-body">
            <p>{post.text}</p>
        </div>   
        <div className="block-footer">
            <div className="block-footer-info">
                <h3>{`${post.likes.length} Like${post.likes.length == 1 ? "" : "s"}`}</h3>
                {post.comments.length > 0 ?  <h3 className="active-comment" onClick={() => {
                    setCommentsStatus((prev) => !prev)                    
                }}>{`${post.comments.length} Comment${post.comments.length == 1 ? "" : "s"}`}</h3> :  <h3>{`${post.comments.length} Comment${post.comments.length == 1 ? "" : "s"}`}</h3> }
               
            </div>
            <div>
                <button>Like</button>
                <button onClick={() => {
                    setCommentsStatus((prev) => !prev)
                }}>Comment</button>
            </div>
            {commentsStatus ? 
            <ul className="comments">
                <form onSubmit={createComment} className="comment-form">
                    <div><img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="avatar" /></div>
                    <fieldset>
                        <textarea onChange={(e) => {
                        if(valid.test(e.target.value)) {
                            setCommentsText(e.target.value)
                        }
                        setValidStatus(valid.test(e.target.value))
                                        }} placeholder="Tell the world something!...Come on, I'm serious" rows={2} name="text" id="" >{commentText}</textarea>
                        {validStatus ? <button>Post</button> : null}
                    </fieldset>
                </form>                
                {post.comments.length > 0 ? <>
                    <h1>All comments</h1>
                    {post.comments.slice(0).reverse().map((comment) => {
                        return <Comment comment={comment} />
                    })}
                </> : null}
            </ul>
            :
            null
            }

            
        </div>        
    </div>)
}

export default Post