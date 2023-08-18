import { Context } from "../../context"
import { useState, useContext, useEffect } from "react"
import ProfilePreview from "../profile/ProfilePreview";


const FriendsAll = () => {
    const {apiLink,token} = useContext(Context)
    const [friends, setFriends] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    const getFriends = async () => {
        setIsLoading(true)
        const res = await fetch(`${apiLink}/friendships`, {
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
    return(
        <div className="container container-friends">
            <div className="list-friends">
                    <h1>Friends</h1>
                    <ul key={"list-friends"} className="list-friends-results">
                        {isLoading ?
                        <div className="spinner"></div>

                        :
                        
                        friends.length > 0 ?
                            friends.map((profile) => {
                                return <ProfilePreview profile={profile} />
                            })
                            :
                            <h2>No friends yet</h2>
                        }
                    </ul>
                </div>
        </div>
    )
}

export default FriendsAll


