import { Context } from "../context"
import { useContext, useState } from "react"
import defaultAvatar from "../assets/default_avatar.jpg"



const EditPostForm = ({setEditPostFormStatus}) => {
    const {user, apiLink, editPostFormValue} = useContext(Context);
    const valid = new RegExp(/\S/);
    const [validStatus, setValidStatus] = useState(true)

    
    return (<div onClick={(e) => {
        if(e.target.className === "background-create-post-form") {
            setEditPostFormStatus(false)
        }
    }} className="background-create-post-form">
        <form action={`${apiLink}/posts/${editPostFormValue.postId}`} method="POST"  className="create-post-form">
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