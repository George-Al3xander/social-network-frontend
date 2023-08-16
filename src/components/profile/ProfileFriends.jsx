import { Context } from "../../context"
import { useState, useContext, useEffect} from "react"
import { useParams } from "react-router-dom"
import ProfilePreviewFriend from "./ProfilePreviewFriend"


const ProfileFriends = () => {
    const {apiLink} = useContext(Context)
    const [friends, setFriends] = useState([]);
    const {id} = useParams();
    const getFriends = async () => {
        const res = await fetch(`${apiLink}/friendships?userId=${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
        })

        const data = await res.json();     
        console.log(data.friends)   
        setFriends(data.friends)
      
    }

    useEffect(() => {
        getFriends();
    }, [])
    return(<div className="container profile-container">        
        <div className="list-friends">
            <h1>Friends</h1>
            <ul className="friends-profile">
                {friends.length > 0 ?
                    friends.map((fr) => {
                        return <ProfilePreviewFriend profile={fr} />
                    })
                :
                null
                }
            </ul>
        </div>
    
</div>)
}

export default ProfileFriends