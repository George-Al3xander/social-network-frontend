import { Context } from "../context"
import { useContext, useState, useRef } from "react"
import defaultAvatar from "../assets/default_avatar.jpg"



const EditPostForm = ({setEditPostFormStatus}) => {
    const {user, apiLink, editPostFormValue, token} = useContext(Context);
    const valid = new RegExp(/\S/);
    const form = useRef();
    const [validStatus, setValidStatus] = useState(true)
    const editPost = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);
        const text = formData.get("text").trim();
        const res = await fetch(`${apiLink}/posts/${editPostFormValue.postId}`, {
            method: "PUT",  
            headers: {
                Accept: "application/json",
                "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({text})
        })
        if(res.status == 200) {
            form.current.reset();
            setEditPostFormStatus(false);   
            window.location.reload();        
        }
    }
    
    return (<div onClick={(e) => {
        if(e.target.className === "background-create-post-form") {
            setEditPostFormStatus(false)
        }
    }} className="background-create-post-form">
        <form ref={form} onSubmit={editPost} className="create-post-form">
            <div className="cpf-header">
            <h1>Edit</h1>
            <svg onClick={() => {
                setEditPostFormStatus(false)
            }} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
            </div>
            <div className="cpf-user-info block-header-info">
            <img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="" />
            <h1>{`${user.name.first} ${user.name.last}`}</h1>
            </div>

            <fieldset>
                <textarea  onChange={(e) => {
                    setValidStatus(valid.test(e.target.value))
                }} placeholder="Tell the world something!...Come on, I'm serious" rows={6} name="text" id="" >{editPostFormValue.text}</textarea>
            </fieldset>

            <div className="cpf-footer">
                {validStatus ? <button>Save</button> : <button className="btn-disabled" disabled>Save</button>}
            </div>
        </form>
    </div>)
}

export default EditPostForm