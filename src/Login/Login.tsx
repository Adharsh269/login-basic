import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"

function Login(){
  const [details, setDetails] = useState({
    username: "",
    //email: "",
    password: "",
});
  const navigate=useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8080/user/login`, {
        params: {
          username: details.username,
          password: details.password,
        },
      })
      .then((response) => {
        if (response.data === "success") {
          localStorage.setItem('UserName',details.username);
          navigate("/home");
        } else {
          setDetails({ username: "", password: "" });
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("There was an error logging in:", error);
        alert("An error occurred. Please try again later.");
      });
  };
  return(
    <div >
      <center>
				<h1>Requirement Portal</h1>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
          <h2>Login</h2>
            <h3>Username</h3>
            <input type="text" className="name" placeholder="Username" value={details.username} 
						required
						onChange={(e)=>{
							console.log(e.target.value)
							setDetails({...details, username:e.target.value})
						}}
						/>
            <h3>Password</h3>
            <input type="password" className="name" placeholder="password" value={details.password} required
						onChange={(e)=>{
							console.log(e.target.value)
							setDetails({...details, password:e.target.value})
						}}
						/> <br />
            <button className="submit-button">Submit</button><br />
						Didn't have account <a href="/create">create account</a>
          </form>
        </div>      
      </center>
    </div>
  )
}
export default Login;