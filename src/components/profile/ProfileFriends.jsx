import { Context } from "../../context"
import { useState, useContext, useEffect} from "react"
import { useParams } from "react-router-dom"
import ProfilePreviewFriend from "./ProfilePreviewFriend"


const ProfileFriends = () => {
    const {apiLink, token} = useContext(Context)
    const [friends, setFriends] = useState([]);
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const getFriends = async () => {        
        setIsLoading(true)
        const res = await fetch(`${apiLink}/friendships?userId=${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
        })

        const data = await res.json();     
        console.log(data.friends)   
        setFriends(data.friends)
        setIsLoading(false)
    }

    useEffect(() => {
        getFriends();
    }, [])
    return(<div className="container profile-container">        
        <div className="list-friends">
            <h1>Friends</h1>
            <ul className="friends-profile">
                {isLoading ?
                <div className="spinner"></div>
                :                
                friends.length > 0 ?
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