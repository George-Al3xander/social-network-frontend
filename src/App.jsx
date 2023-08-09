import { useEffect, useState, useRef } from 'react'
import { Context } from './context';
import {Routes, Route, Navigate, useNavigate} from "react-router-dom"
import Login from './components/auth/Login'
import Register from "./components/auth/Register"
import NavBar from './components/NavBar';
import CreatePostForm from './components/CreatePostForm';
function App() {
  
  const [user, setUser] = useState(null);  
  const apiLink = "http://localhost:3000";
  const navigate = useNavigate();
  const [createPostFormStatus, setCreatePostFormStatus] = useState(false)



  function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result)
      };
      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const google = (e) => {
    e.preventDefault();
    window.open(`${apiLink}/auth/google`, "_self");
  };

  useEffect(() => {
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
    getUser();
  }, []);

  useEffect(() => {
    if(user) {
      console.log(user)
    }
  }, [user])

  /* <button onClick={() => {
     window.open("http://localhost:3000/auth/google", "_self")
   }}>Login</button> -- google login button


   <button onClick={() => {
        window.open("http://localhost:3000/auth/logout", "_self");
      }}>Log out</button> -- logout btn

  */
  
  return (
    <Context.Provider value={{user, setUser, apiLink, google, navigate}}>
        {user ? <NavBar setCreatePostFormStatus={setCreatePostFormStatus}/> : null}
          {createPostFormStatus ? <CreatePostForm /> : null}
        <Routes>
          <Route path="/" element={ user ? <>
                  Home
                  <br />


                  {/* <button onClick={async () => {
                    const res =  await fetch(`${apiLink}/friendships/64d23f05ed3a908388d294f3`, {
                      method: "POST",
                       headers: {
                          "Content-Type": "application/json",           
                       },
                      credentials: "include",                      
                      // body: JSON.stringify({
                      //   friendId: "64d0e6fcc726878d32489d1a"
                      // })
                    })
                    const data = await res.json();
                    console.log(data)
                  }}>Click</button> */}

                  <br />
                  {user ? <button onClick={() => {
        window.open(`${apiLink}/auth/logout`, "_self");
      }}>Log out</button> : null}
          </>
          :
          <Navigate to="/login" />
          } />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}/>
          <Route path="/post" element={user ? <h1>Post</h1> : <Navigate to="/login" />}/>
        </Routes> 

        
          
    </Context.Provider>
  )
}

export default App
