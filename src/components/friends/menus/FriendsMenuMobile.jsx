import { NavLink } from "react-router-dom"




const FriendsMenuMobile = () => {
    return(
        <nav className="friends-menu-mobile">
            <ul>                
                <NavLink  to={"/friends"} exact={true} end><li>
                    Search
                </li></NavLink>
                <NavLink to={"/friends/requests"}><li>
                    Requests
                </li></NavLink>
                <NavLink to={"/friends/all"}><li>
                    All friends
                </li></NavLink>
            </ul>
        </nav>
    )
}


export default FriendsMenuMobile