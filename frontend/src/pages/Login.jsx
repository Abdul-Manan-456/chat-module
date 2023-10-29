import React  , {useState} from 'react'
import { useNavigate , Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  
  });
  const handleInputs = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setLogin({ ...login, [name]: value });
  };
  const LoginForm = async (e) => {
    e.preventDefault(); 
    try {
      const { email, password } = login;
      const response = await fetch("http://192.168.18.113:3000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data  = await response.json();
      if (!data) {
        alert('Login failed: ' + data.message);
      }
      else{
        alert('User is login')
        const token = data.token;
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(data?.user))
        setTimeout(()=>{
        navigate("/");
        },1000)
      }
     
    } catch (error) {
      console.error('Error login user:', error);
      alert("An error occurred while login.");
    }
  };
  
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form >
          <input type="email" name="email" id="email" placeholder="email"  value={login.email}
                  onChange={handleInputs}/>
          <input type="password" name="password" id="password" placeholder="password" 
           value={login.password}
           onChange={handleInputs}/>
          <button onClick={(e) => LoginForm(e)} >Sign in</button>
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
