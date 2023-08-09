import { Context } from "../context"
import { useContext, useState } from "react"
import defaultAvatar from "../assets/default_avatar.jpg"



const CreatePostForm = () => {
    const {user} = useContext(Context);
    const valid = new RegExp(/\S/);
    const [validStatus, setValidStatus] = useState(false)
    return (<div className="background-create-post-form">
        <form className="create-post-form">
            <div className="cpf-header">
            <h1>Create a post</h1>
            <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
            </div>
            <div className="cpf-user-info">
            <img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="" />
            <h1>{`${user.name.first} ${user.name.last}`}</h1>
            </div>

            <fieldset>
                <textarea onChange={(e) => {
                    setValidStatus(valid.test(e.target.value))
                }} placeholder="Tell the world something!...Come on, I'm serious" rows={6} name="" id="" ></textarea>
            </fieldset>

            <div className="cpf-footer">
                {validStatus ? <button>Post</button> : <button style={{opacity: .7}} disabled>Post</button>}
            </div>
        </form>
    </div>)
}

export default CreatePostForm