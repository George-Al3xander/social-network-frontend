import { Outlet, useParams } from "react-router-dom"
import { Context } from "../../context"
import { useContext, useEffect, useState } from "react"
import ProfileHeader from "./ProfileHeader"
const Profile = () => {
    const {id} = useParams()
    const {user, apiLink, token} = useContext(Context)

    const [displayUser, setDisplayUser] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    
    const getUser = async () => {
        setIsLoading(true)
        const res = await fetch(`${apiLink}/users?id=${id}`, {
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
        if(res.status == 200) {
            setDisplayUser(data.user)
        }
        setIsLoading(false)

    }
    useEffect(() => {
        if(id == user._id) {
            setDisplayUser(user);
            setIsLoading(false)
        } else {           
            getUser();
        }
    }, [id])
    return(
    <>
        {isLoading ?
        <div className="spinner"></div>
        :
        Object.keys(displayUser).length > 0 ?
        <>
        <ProfileHeader user={displayUser} />
        <Outlet />
        </>
        :
        <h1 className="msg-error">Unable to load Profile</h1>
        }     
    </>
    
    
   
    )
}

export default Profile