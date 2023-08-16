import { Context } from "../../context"
import { useState, useContext, useEffect } from "react"
import ProfilePreview from "../profile/ProfilePreview";
const FriendsSearch = () => {
    const blankValid = new RegExp(/\S/);
    const [searchKey, setSearchKey] = useState("")
    const {apiLink} = useContext(Context)
    const [results, setResults] = useState([]);
    const search = async () => {
        const res = await fetch(`${apiLink}/users/search?searchKey=${searchKey}`, {
            method: "GET",
            credentials: "include",
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
            },
        })

        const data = await res.json();
        setResults(data.data)
       
    }
    useEffect(() => {
        if(blankValid.test(searchKey)) {
            search();
        }
    },[searchKey])

    return(<div className="container container-friends">
            <input className="user-search-input" onChange={(e) => {
                setSearchKey(e.target.value)
            }} placeholder="Looking for someone?" type="text" />

            <div className="list-friends">
                <h1>Search results</h1>
                    <ul className="list-friends-results">
                        {results.length > 0 ? 
                        blankValid.test(searchKey) ?
                        results.map((res) => {
                            return <ProfilePreview profile={res}/>
                        }) 
                        : <h1>No results</h1>
                        : <h1>No results</h1>
                        }
                    </ul>
            </div>
    </div>)
}

export default FriendsSearch