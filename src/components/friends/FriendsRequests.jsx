import { Context } from "../../context"
import { useState, useContext, useEffect } from "react"
import ProfilePreview from "../profile/ProfilePreview";
const FriendsRequests = () => {
    const {apiLink} = useContext(Context)
    const [sent, setSent] = useState([]);
    const [incoming, setIncoming] = useState([]);
    const getRequests = async () => {
        const res = await fetch(`${apiLink}/friendships/requests`, {
            method: "GET",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
        })

        const data = await res.json();        
        setSent(data.sent)
        setIncoming(data.incoming)
    }

    useEffect(() => {
        getRequests();
    }, [])

    return(<div className="container container-friends">
            

            <div className="list-friends">
                <h1>Incoming Requests</h1>
                <ul key={"list-inc"} className="list-friends-results">
                    {incoming.length > 0 ?
                        incoming.map((profile) => {
                            return <ProfilePreview profile={profile} />
                        })
                        :
                        <h2>No requests yet</h2>
                    }
                </ul>
                <h1>Sent Requests</h1>
                <ul key={"list-sent"} className="list-friends-results">
                {sent.length > 0 ?
                        sent.map((profile) => {
                            return <ProfilePreview profile={profile} />
                        })
                        :
                        <h2>No requests yet</h2>
                    }
                </ul>
            </div>
    </div>)
}

export default FriendsRequests

