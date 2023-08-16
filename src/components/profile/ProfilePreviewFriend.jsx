import { useState, useContext, useEffect } from "react"
import defaultAvatar  from "../../assets/default_avatar.jpg"
import { Link } from "react-router-dom"
import { Context } from "../../context"
import FriendBtn from "../friends/FriendBtn"

const ProfilePreviewFriend = ({profile}) => {
      

  

    return(<div className="profile-preview-friend">
        <Link className="link-avatar" to={`/profile/${profile.id}`}><img className="avatar" src={profile.avatar ? profile.avatar : defaultAvatar } alt="avatar" /></Link>
        <Link to={`/profile/${profile.id}`}>
            <h2>{profile.name.first + " " + profile.name.last}</h2>
        </Link>
          
        
    </div>)
}

export default ProfilePreviewFriend