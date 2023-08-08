const Login = () => {
    const google = () => {
      window.open("http://localhost:3000/auth/google", "_self");
    };
  
    
  
    return (
      <div className="login">
       <button onClick={google}>Login</button>
      </div>
    );
  };
  
  export default Login;


