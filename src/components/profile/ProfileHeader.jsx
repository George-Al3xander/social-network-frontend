import defaultAvatar  from "../../assets/default_avatar.jpg"



const ProfileHeader = ({user}) => {


    return(<div>
        <img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="avatar" />
        <h1>{user.name.first}</h1>
    </div>)
}

export default ProfileHeader