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
function App() {
  
  const [user, setUser] = useState(null);  
  const apiLink = "http://localhost:3000";
  const navigate = useNavigate();
  const [createPostFormStatus, setCreatePostFormStatus] = useState(false)
  const [editPostFormStatus, setEditPostFormStatus] = useState(false)
  const [editPostFormValue, setEditPostFormValue] = useState({postId: "", text: ""})

  const google = (e) => {
    e.preventDefault();
    window.open(`${apiLink}/auth/google`, "_self");
  };

  const getUser = () => {
    fetch(`${apiLink}/auth/login/success`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error("authentication has been failed!");
      })
      .then((resObject) => {
        setUser(resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {    
    getUser();
  }, []);

  const showEditPostForm = (id, text) => {
    setEditPostFormValue({postId: id,text});
    setEditPostFormStatus(true)
  }


  


  /* <button onClick={() => {
     window.open("http://localhost:3000/auth/google", "_self")
   }}>Login</button> -- google login button


   <button onClick={() => {
        window.open(`${apiLink}/auth/logout`, "_self");
      }}>Log out</button> -- logout btn

  */

  
  
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
        </Routes> 
    </Context.Provider>
  )
}

export default App
