import { Context } from "../context"
import { useContext, useState , useRef} from "react"
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/default_avatar.jpg"
const Settings = () => {
    const {user, apiLink, getUser, token} = useContext(Context);
    const emailValid = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const passwordValid = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const blankValid = new RegExp(/\S/);
    const [errorMsg, setErrorMsg] = useState("");
    const [emailStatus, setEmailStatus] = useState(true);
    const [firstNameStatus, setFirstNameStatus] = useState(true);
    const [lastNameStatus, setLastNameStatus] = useState(true);
    const [displayAvatar, setDisplayAvatar] = useState(user.avatar) 
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
    const form = useRef();
    const handleFileUpload = async (e) => {
      const file = e.target.files[0];
      //console.log(base64)
      if(file.size < 2097152) {
        const base64 = await convertToBase64(file);
        if(base64.length < 2097152) {
          setDisplayAvatar(base64)
        } else {
        alert("Image must be less than 5 MB")
        }        
      } else  {
        alert("Image must be less than 5 MB")
      }
    }


    const editUser = async (e) => {
      e.preventDefault();
      const formData = new FormData(form.current);      
      const name = {
        first: formData.get("name-first").trim(),
        last: formData.get("name-last").trim()
      };
      const email = formData.get("email").trim();
      let updateObj = {        
      }
      if(displayAvatar != user.avatar) {
        updateObj = {...updateObj, avatar: displayAvatar}
      }
      if(email != user.email) {
        updateObj = {...updateObj, email}
      }
      if(name.first != user.name.first && name.last == user.name.last) {
        updateObj = {...updateObj, name: {
          first: name.first,
          last: user.name.last
        }}
      } else if (name.first == user.name.first && name.last != user.name.last) {
        updateObj = {...updateObj, name: {
          first: user.name.first,
          last: name.last
        }}
      } else if(name.first != user.name.first && name.last != user.name.last) {
        updateObj = {...updateObj, name}
      }
      if(Object.keys(updateObj).length > 0) {
        const res = await fetch(`${apiLink}/users`, {
          method: "PUT",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Authorization" : `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify(updateObj)
        })
        //{...updateObj, password: formData.get("password")}
        console.log(res)
        const data = await res.json();
        if(res.status == 200) {
          setErrorMsg("")
          getUser();
        } else {
          setErrorMsg(data.msg)
        }
        console.log(data)

      }      
    }

    return(
        <div className="container">          
          <form onSubmit={editUser} ref={form} className="auth-form edit-form" >
          <legend>Edit profile</legend>
        <fieldset className="fieldset-avatar">            
            <img className="avatar" src={displayAvatar ? displayAvatar : defaultAvatar } alt="avatar" />
        <span><input onChange={handleFileUpload} name="avatar" accept="image/*" type="file" />
        <svg onClick={(e) => {          
          setDisplayAvatar(user.avatar)
        }} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M259-200v-60h310q70 0 120.5-46.5T740-422q0-69-50.5-115.5T569-584H274l114 114-42 42-186-186 186-186 42 42-114 114h294q95 0 163.5 64T800-422q0 94-68.5 158T568-200H259Z"/></svg>
       <svg onClick={(e) => {          
          setDisplayAvatar(undefined)
        }} xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M261-120q-24 0-42-18t-18-42v-570h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm106-146h60v-399h-60v399Zm166 0h60v-399h-60v399Z"/></svg>
        
        </span>
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input onChange={(e) => {
              setEmailStatus(emailValid.test(e.target.value))
            }} defaultValue={user.email} required name="email" id="email" type="email" />
            {!emailStatus ? <div className="msg-error"><h3>Invalid email</h3></div> : null}
          </fieldset>
          <fieldset>
            <label htmlFor="name-first">First name</label>
            <input onChange={(e) => {
              setFirstNameStatus(blankValid.test(e.target.value))
            }} defaultValue={user.name.first} required name="name-first" id="name-first" type="text" />
            {!firstNameStatus ? <div className="msg-error"><h3>Can't be a blank</h3></div> : null}
          </fieldset>
          <fieldset>
            <label htmlFor="name-last">Last name</label>
            <input onChange={(e) => {
              setLastNameStatus(blankValid.test(e.target.value))
            }} defaultValue={user.name.last} required name="name-last" id="name-last" type="text" />
            {!lastNameStatus ? <div className="msg-error"><h3>Can't be a blank</h3></div> : null}
          </fieldset>          
           {/* <fieldset>
            <label htmlFor="password-confirm">Confirm password</label>
            <input required name="password" id="password-confirm" type="password" />
          </fieldset>         */}
          <div className="buttons">
            {!emailStatus || !firstNameStatus || !lastNameStatus 
            
            ? 

            <button disabled className="btn-disabled">Save changes</button> 
            : 
            <button>Save changes</button> }           
          </div>          
        </form>        
        </div>
    )
}

export default Settings