import defaultAvatar from "../../assets/default_avatar.jpg"
import moment from "moment"
import { Context } from "../../context"
import { useContext, useState } from "react"
import { Link } from "react-router-dom"
const Comment = ({comment, getComments}) => {   
    const [editStatus, setEditStatus] = useState(false) 
    const valid = new RegExp(/\S/);
    const [validStatus, setValidStatus] = useState(true);
    const [commentText, setCommentsText] = useState(comment.text)
    const {user, apiLink} = useContext(Context);


    const editComment = async (e) => {
        e.preventDefault();
        const res = await fetch(`${apiLink}/posts/${comment.postId}/comments/${comment._id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({               
                text: commentText.trim(),
            })
        })
        const data =  await res.json();
               
        if(res.status == 200) {           
            setEditStatus(false);
            getComments()                       
        } 
    }
    // visual delete
    // setPosts(prev => [...prev.filter((postPrev) => {
    //     return postPrev._id != post._id
    // })])

    const deleteComment = async () => {
        const res = await fetch(`${apiLink}/posts/${comment.postId}/comments/${comment._id}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        })
        const data =  await res.json();
               
        if(res.status == 200) {           
            setComments(prev => [...prev.filter((commentPrev) => {
                 return commentPrev._id != comment._id
            })])
            console.log(data)            
        } 
    }

    return(<li key={comment._id} className="comment">
        <Link to={`/profile/${user._id}`}><img className="avatar" src={comment.user.avatar ? comment.user.avatar : defaultAvatar } alt="avatar" /></Link>
        <div className="comment-body">
            <div><Link to={`/profile/${user._id}`}>
                <h2>{`${comment.user.name.first} ${comment.user.name.last}`}</h2>
            </Link> <h3>{moment(comment.createdAt).format("ll")}</h3></div>
            {editStatus ? 
            <form onSubmit={editComment} className="comment-form comment-edit-form">           
            <fieldset>
                <textarea onChange={(e) => {              
                if(valid.test(e.target.value)) {
                        setCommentsText(e.target.value)
                }  
                setValidStatus(valid.test(e.target.value))
                }} placeholder="Add a comment" rows={2} name="text" id="" >{comment.text}</textarea>
            </fieldset>
                {(validStatus && commentText !== comment.text) ? 
                <button>Save</button> : null}
        </form>
            
            : 
            
            <p>{comment.text}</p>}
            
        {comment.user.id == user._id ? 
         <div className="comment-buttons">
            <button onClick={() => setEditStatus(prev => !prev)}>Edit</button>
            <button onClick={deleteComment}>Delete</button>
        </div> 
        : 
        null }
        </div>        
    </li>)
}

export default Comment