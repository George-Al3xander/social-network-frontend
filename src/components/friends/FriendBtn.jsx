import { useEffect, useState, useContext } from "react"
import { Context } from "../../context";



const FriendBtn = ({friendStatus, friendId, getStatus}) => {       
    const {apiLink} = useContext(Context);
    const addFriend = async () => {
        const res = await fetch(`${apiLink}/friendships`, {
            method: "POST",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({friendId})
        })

        const data = await res.json();
        if(res.status == 200) {
            getStatus();
        }
        console.log(data)
    }
    const acceptFriend = async () => {
        const res = await fetch(`${apiLink}/friendships`, {
            method: "PUT",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({friendId})
        })

        const data = await res.json();
        if(res.status == 200) {
            getStatus();
        }
        console.log(data)
    }

    const cancelFriend = async () => {
        const res = await fetch(`${apiLink}/friendships`, {
            method: "DELETE",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify({friendId})
        })

        const data = await res.json();
        if(res.status == 200) {
            getStatus();
        }
        console.log(data)
    }
  
    return(<>
        {friendStatus.status != null ? 
            friendStatus.status == true ?
            <button className="btn-friend" onClick={cancelFriend}>Unfriend</button>
            :
            (friendStatus.status == false && friendStatus.sentByUser == true) ?
            <button className="btn-friend" onClick={cancelFriend}>Cancel</button>
            :
            <button className="btn-friend" onClick={acceptFriend}>Accept</button>
            :
            <button className="btn-friend" onClick={addFriend}>Add friend</button>            
        }        
    </>)
}

export default FriendBtn