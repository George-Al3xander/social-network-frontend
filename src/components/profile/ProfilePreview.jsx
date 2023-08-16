import { useState, useContext, useEffect } from "react"
import defaultAvatar  from "../../assets/default_avatar.jpg"
import { Link } from "react-router-dom"
import { Context } from "../../context"
import FriendBtn from "../friends/FriendBtn"

const ProfilePreview = ({profile}) => {
    const {apiLink} = useContext(Context)
    const [friendStatus, setFriendStatus] = useState({});

    const getStatus = async () => {
        const res = await fetch(`${apiLink}/friendships/status?userId=${profile.id}`, {
            method: "GET",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
        })

        const data = await res.json();
        //console.log(data)
        setFriendStatus(data.data)
    }

    useEffect(() => {
        getStatus();
    }, [profile])

  

    return(<div className="profile-preview">
        <Link className="link-avatar" to={`/profile/${profile.id}`}><img className="avatar" src={profile.avatar ? profile.avatar : defaultAvatar } alt="avatar" /></Link>
        <span>
            <Link to={`/profile/${profile.id}`}>
                <h2>{profile.name.first + " " + profile.name.last}</h2>
            </Link>
           <FriendBtn friendStatus={friendStatus} getStatus={getStatus} friendId={profile.id}/>
        </span>
    </div>)
}

export default ProfilePreview