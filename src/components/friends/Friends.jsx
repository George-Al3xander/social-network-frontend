import FriendsAll from "./FriendsAll";
import FriendsMenuDesktop from "./menus/FriendsMenuDesktop"
import {Routes, Route, Navigate, useNavigate, Outlet} from "react-router-dom";




const Friends = () => {


    return(<div className="friends-parent-block">
            <FriendsMenuDesktop />
            <Outlet />
    </div>)
}

export default Friends