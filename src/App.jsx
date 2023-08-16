import { useEffect, useState, useRef } from 'react';
import { Context } from './context';
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import Login from './components/auth/Login';
import Register from "./components/auth/Register";
import NavBar from './components/NavBar';
import CreatePostForm from './components/CreatePostForm';
import PostsHome from './components/posts/PostsHome';
import EditPostForm from './components/EditPostForm';
import Settings from './components/Setting';
import Friends from './components/friends/Friends';
import FriendsAll from './components/friends/FriendsAll';
import FriendsRequests from './components/friends/FriendsRequests';
import FriendsSearch from './components/friends/FriendsSearch';
import ProfileHome from './components/profile/ProfileHome';
import ProfileFriends from './components/profile/ProfileFriends';
import Profile from './components/profile/Profile';
function App() {
  
  const [user, setUser] = useState(null);  
  const apiLink = "https://social-network-backend-iffo.onrender.com";
  const navigate = useNavigate();
  const [createPostFormStatus, setCreatePostFormStatus] = useState(false)
  const [editPostFormStatus, setEditPostFormStatus] = useState(false)
  const [editPostFormValue, setEditPostFormValue] = useState({postId: "", text: ""})

  const google = (e) => {
    e.preventDefault();
    window.open(`${apiLink}/auth/google`, "_self");
  };

  const getUser = async  () => {
    const response =  await
    fetch(`${apiLink}/auth/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
    if (response.status === 200) {
      const resObject = await response.json();
      setUser(await resObject.user);
    } else {
      throw new Error("authentication has been failed!");
    }
     
  };

  useEffect(() => {    
    getUser();
  }, []);

  const showEditPostForm = (id, text) => {
    setEditPostFormValue({postId: id,text});
    setEditPostFormStatus(true)
  }
  
  return (
    <Context.Provider value={{user, setUser, apiLink, google, navigate, setEditPostFormStatus, editPostFormValue, showEditPostForm, getUser}}>
        {user ? <NavBar setCreatePostFormStatus={setCreatePostFormStatus}/> : null}
          {createPostFormStatus ? <CreatePostForm setCreatePostFormStatus={setCreatePostFormStatus} /> : null}
          {editPostFormStatus ? <EditPostForm setEditPostFormStatus={setEditPostFormStatus} /> : null}
        <Routes>
          <Route path="/" element={ user ? 
          <PostsHome setCreatePostFormStatus={setCreatePostFormStatus}/> 
          :
          <Navigate to="/login" />
          } />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>          
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />}/>
          <Route path="/friends" element={user ? <Friends /> : <Navigate to="/login" />}>
              <Route path={"all"} element={<FriendsAll />}/>
              <Route path={""} element={<FriendsSearch />}/>
              <Route path={"requests"} element={<FriendsRequests />}/>
          </Route>

          <Route path='/profile/:id' element={user ? <Profile /> : <Navigate to="/login" />} >
              <Route path={""} element={<ProfileHome setCreatePostFormStatus={setCreatePostFormStatus}/>} />
              <Route path={"friends"} element={<ProfileFriends />} />
          </Route>
        </Routes> 
    </Context.Provider>
  )
}

export default App
