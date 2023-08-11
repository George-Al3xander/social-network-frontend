import { Context } from "../../context"
import { useContext, useState } from "react"
import defaultAvatar from "../../assets/default_avatar.jpg"


const CreateCommentForm = ({post, getComments}) => {
    const [commentText, setCommentsText] = useState("")
    const {user, apiLink} = useContext(Context);
    const valid = new RegExp(/\S/);
    const [validStatus, setValidStatus] = useState(false);
    const createComment = async (e) => {
        e.preventDefault();
        const res = await fetch(`${apiLink}/posts/${post._id}/comments`, {
            method: "POST",
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
        
        console.log(data)
        if(res.status == 200) {
            getComments();
            setValidStatus(false);
            e.target.reset();
        }
    }
    return(
        <form onSubmit={createComment} className="comment-form">
        <div><img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="avatar" /></div>
        <fieldset>
            <textarea onChange={(e) => {
            if(valid.test(e.target.value)) {
                setCommentsText(e.target.value)
            }
            setValidStatus(valid.test(e.target.value))
                            }} placeholder="Add a comment" rows={2} name="text" id="" ></textarea>
            {validStatus ? <button>Post</button> : null}
        </fieldset>
    </form>
    )
}

export default CreateCommentForm