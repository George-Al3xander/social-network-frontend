import { Link } from "react-router-dom"
import { Context } from "../context"
import { useContext } from "react"
import defaultAvatar from "../assets/default_avatar.jpg"

const NavBar = ({setCreatePostFormStatus}) => {
    const {user} = useContext(Context);
    return (
        <nav>
<div className="logo"><Link to={"/"}>TrendyTribe</Link></div>
        <ul>
            <Link to="/">
                <li><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z"/></svg>Home</li>
            </Link>
            <Link to="/friends">
                <li><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M38-160v-94q0-35 18-63.5t50-42.5q73-32 131.5-46T358-420q62 0 120 14t131 46q32 14 50.5 42.5T678-254v94H38Zm700 0v-94q0-63-32-103.5T622-423q69 8 130 23.5t99 35.5q33 19 52 47t19 63v94H738ZM358-481q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42Zm360-150q0 66-42 108t-108 42q-11 0-24.5-1.5T519-488q24-25 36.5-61.5T568-631q0-45-12.5-79.5T519-774q11-3 24.5-5t24.5-2q66 0 108 42t42 108Z"/></svg>Friends</li>
            </Link>
            
            <li onClick={() => {
                setCreatePostFormStatus(true)
            }}><svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M453-280h60v-166h167v-60H513v-174h-60v174H280v60h173v166Zm27.266 200q-82.734 0-155.5-31.5t-127.266-86q-54.5-54.5-86-127.341Q80-397.681 80-480.5q0-82.819 31.5-155.659Q143-709 197.5-763t127.341-85.5Q397.681-880 480.5-880q82.819 0 155.659 31.5Q709-817 763-763t85.5 127Q880-563 880-480.266q0 82.734-31.5 155.5T763-197.684q-54 54.316-127 86Q563-80 480.266-80Z"/></svg>Post</li>
            <li><img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="avatar" /> Me</li>
            
        </ul>
        </nav>
    )
} 

export default NavBar