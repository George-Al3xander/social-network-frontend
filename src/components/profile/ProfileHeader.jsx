import defaultAvatar  from "../../assets/default_avatar.jpg"
import { NavLink } from "react-router-dom"
import moment from "moment"
import { Context } from "../../context"
import {  useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import FriendBtn from "../friends/FriendBtn"
const ProfileHeader = ({user}) => {
    const {id} = useParams()
    const [friendStatus, setFriendStatus] = useState({});
    const {apiLink} = useContext(Context)
    const currUserId = useContext(Context).user._id
    const getStatus = async () => {
        const res = await fetch(`${apiLink}/friendships/status?userId=${user._id}`, {
            method: "GET",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
        })

        const data = await res.json();        
        setFriendStatus(data.data)
    }

    useEffect(() => {
        getStatus();
    }, [user])    
    return(<div className="profile-header">        
        <div className="profile-info">
            <img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="avatar" />
            <span>
                <h1>{user.name.first + " " + user.name.last}</h1>
                <h2>Memeber since {moment(user.createdAt).format("ll")}</h2>
            </span>
        {id != currUserId ? 
        <FriendBtn friendStatus={friendStatus} getStatus={getStatus} friendId={user._id}/> 
        : 
        null}
        
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