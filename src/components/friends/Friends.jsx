import FriendsAll from "./FriendsAll";
import FriendsMenuDesktop from "./menus/FriendsMenuDesktop"
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";




const Friends = () => {


    return(<div>
        <FriendsMenuDesktop />
        <Routes>
            <Route path={"/friends/all"} element={<FriendsAll />}/>
        </Routes>
    </div>)
}

export default Friends