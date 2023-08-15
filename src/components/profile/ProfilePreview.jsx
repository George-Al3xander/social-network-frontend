import defaultAvatar  from "../../assets/default_avatar.jpg"



const ProfilePreview = ({profile}) => {
    return(<div className="profile-preview">
        <img className="avatar" src={profile.avatar ? profile.avatar : defaultAvatar } alt="avatar" />
        <h2>{profile.name.first + " " + profile.name.last}</h2>
    </div>)
}

export default ProfilePreview