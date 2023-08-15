import defaultAvatar  from "../../assets/default_avatar.jpg"
import { NavLink } from "react-router-dom"
import moment from "moment"

const ProfileHeader = ({user}) => {


    return(<div className="profile-header">        
        <div className="profile-info">
            <img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="avatar" />
            <span>
                <h1>{user.name.first + " " + user.name.last}</h1>
                <h2>Memeber since {moment(user.createdAt).format("ll")}</h2>
            </span>
            
        </div>

        <nav>
            <ul>
                <NavLink to={`/profile/${user._id}`} end><li>Home</li></NavLink>
                <NavLink to={`/profile/${user._id}/friends`}><li>Friends</li></NavLink>
            </ul>
        </nav>
    </div>)
}

export default ProfileHeader