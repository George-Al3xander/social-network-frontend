import FriendsAll from "./FriendsAll";
import FriendsMenuDesktop from "./menus/FriendsMenuDesktop"
import {Routes, Route, Navigate, useNavigate, Outlet} from "react-router-dom";
import FriendsMenuMobile from "./menus/FriendsMenuMobile";




const Friends = () => {


    return(<div className="friends-parent-block">
            <FriendsMenuDesktop />
            <FriendsMenuMobile />
            <Outlet />
    </div>)
}

export default Friends