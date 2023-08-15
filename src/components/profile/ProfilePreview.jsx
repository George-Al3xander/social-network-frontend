import defaultAvatar  from "../../assets/default_avatar.jpg"
import { Link } from "react-router-dom"


const ProfilePreview = ({profile}) => {
        console.log(profile)
    return(<div className="profile-preview">
        <Link to={`/profile/${profile.id}`}><img className="avatar" src={profile.avatar ? profile.avatar : defaultAvatar } alt="avatar" /></Link>
        <Link to={`/profile/${profile.id}`}>
            <h2>{profile.name.first + " " + profile.name.last}</h2>
        </Link>
    </div>)
}

export default ProfilePreview