import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";

function Create() {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [confirmPass, setConformPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push(" At least 8 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("At least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("At least one lowercase letter.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("At least one special character.");
    }

    return errors;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const newPassword = e.target.value;
    setDetails({ ...details, password: newPassword });
    const validateErrors = validatePassword(newPassword);
    setPasswordErrors(validateErrors);
  };
  const handleSubmitt = (event: any) => {
    event.preventDefault();
    console.log("user details...." + details);
    if (passwordErrors.length === 0) {
			if(details.password===confirmPass){
				axios
        .post("http://localhost:3001/details", details)
        .then(() => navigate("/"));
			}{
				alert("Password do not match")
			} 
    } else {
      alert("Please fix the password errors before submitting");
    }
  };
  return (
    <div>
      <div>
        <h1>New Account</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmitt}>
          <h3>UserName</h3>
          <input
            className="name"
            type="text"
            placeholder="Username"
            required
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
          <br />
          <h3>Email</h3>
          <input
            type="text"
            className="name"
            placeholder="sample@gmail.com"
            required
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <br />
          <h3>Password</h3>
          <input
            type="password"
            className="name"
            placeholder="****"
            required
            onChange={handlePasswordChange}
          />
          
          <div className="error-container">
            {passwordErrors.length > 0 && (
              <ul className="error-list">
                {passwordErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>
          <h3>Conform Password</h3>
          <input
            type="password"
            className="name"
            placeholder="****"
            required
            onChange={(e) => setConformPassword(e.target.value)}
          />
					<br />
					<br />
          <input type="submit" value="Submit" className="submit-button" />
        </form>
      </div>
    </div>
  );
}

export default Create;
