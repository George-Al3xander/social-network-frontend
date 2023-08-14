import { NavLink } from "react-router-dom"




const FriendsMenuDesktop = () => {
    return(
        <nav>
            <NavLink to={"/friends/all"}>All</NavLink>
        </nav>
    )
}


export default FriendsMenuDesktop