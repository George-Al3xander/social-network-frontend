import { Context } from "../context"
import { useContext } from "react"
import { Link } from "react-router-dom";
import defaultAvatar from "../assets/default_avatar.jpg"
const Settings = () => {
    const {user} = useContext(Context);

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

    return(
        <div className="container">
            <h1>Edit profile</h1>
            <form className="auth-form edit-form" >
          <legend>Sign up</legend>
          <fieldset>

            <label htmlFor="avatar">Avatar</label>
            <img className="avatar" src={user.avatar ? user.avatar : defaultAvatar } alt="avatar" />
        <input name="avatar" accept="image/*" type="file" />
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input defaultValue={user.email} required name="email" id="email" type="email" />
          </fieldset>
          <fieldset>
            <label htmlFor="name-first">First name</label>
            <input defaultValue={user.name.first} required name="name-first" id="name-first" type="text" />
          </fieldset>
          <fieldset>
            <label htmlFor="name-last">Last name</label>
            <input defaultValue={user.name.last} required name="name-last" id="name-last" type="text" />
          </fieldset>          
          <fieldset>
            <label htmlFor="password-confirm">Confirm password</label>
            <input required name="password" id="password-confirm" type="password" />
          </fieldset>
        
          <div className="buttons">
            <button>Save changes</button>
            
          </div>
          
        </form>

        </div>
    )
}

export default Settings