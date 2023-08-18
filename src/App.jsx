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
  const apiLink = "http://192.168.0.111:3000";
  const navigate = useNavigate();
  const [createPostFormStatus, setCreatePostFormStatus] = useState(false);
  const [token, setToken] = useState("");
  const [editPostFormStatus, setEditPostFormStatus] = useState(false)
  const [editPostFormValue, setEditPostFormValue] = useState({postId: "", text: ""})

  const google = (e) => {
    e.preventDefault();
    window.open(`${apiLink}/auth/google`, "_self");
  };

  const getUser = () => {
    const tokenParams = new URLSearchParams(window.location.search).get("token")
    const tokenStorage = localStorage.getItem("token")
    let apiPath;
    let tokenPassed;
    if(tokenParams) {
      setToken(tokenParams)  
      localStorage.setItem("token", tokenParams)  
      window.history.pushState({}, null, "/")
      tokenPassed = tokenParams;
      apiPath = `${apiLink}/auth/login/success`;
    } else if (tokenStorage){
      setToken(tokenStorage)
      //console.log(tokenStorage)
      tokenPassed = tokenStorage;
      apiPath = `${apiLink}/users/current`;
      
        
    }
    fetch(`${apiLink}/users/current`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${tokenPassed}`,
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        //console.log(resObject)
        setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
    
  };

  useEffect(() => {    
    getUser();    
  }, []);

  useEffect(() => {

  }, [user])

  const showEditPostForm = (id, text) => {
    setEditPostFormValue({postId: id,text});
    setEditPostFormStatus(true)
  }
  
  return (
    <Context.Provider value={{user, setUser, apiLink, google, navigate, setEditPostFormStatus, editPostFormValue, showEditPostForm, getUser, token}}>
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
