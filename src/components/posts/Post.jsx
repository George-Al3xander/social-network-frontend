import defaultAvatar from "../../assets/default_avatar.jpg"
import moment from "moment"
import Comment from "../comments/Comment"
import { useContext, useState } from "react"
import { Context } from "../../context"
const Post = ({post}) => {
    const {user} = useContext(Context);
    const [commentsStatus, setCommentsStatus] = useState(false)
    const valid = new RegExp(/\S/);
    const [validStatus, setValidStatus] = useState(false)
    
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
                <form>
                    <img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="avatar" />
                    <fieldset>
                        <textarea  onChange={(e) => {
                        setValidStatus(valid.test(e.target.value))
                                        }} placeholder="Tell the world something!...Come on, I'm serious" rows={6} name="text" id="" ></textarea>
                                        {validStatus ? <button>Post</button> : null}
                    </fieldset>
                </form>
                <h1>All comments</h1>
                {post.comments.length > 0 ? post.comments.map((comment) => {
                    return <Comment comment={comment} />
                }) : null}
            </ul>
            :
            null
            }

            
        </div>        
    </div>)
}

export default Post