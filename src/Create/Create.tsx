import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Create.css";

function Create() {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  
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
    if(!/[0-9]/.test(password)){
      errors.push("At leadt one number");
    }
    return errors;
  };

  const handlePasswordChange = (e: any) => {
    const newPassword = e.target.value;
    setDetails({ ...details, password: newPassword });
    const validateErrors = validatePassword(newPassword);
    setPasswordErrors(validateErrors);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (passwordErrors.length === 0) {
      if (details.password === details.confirmPass) {
        const payloadAllDetails = {
          username: details.username,
          email: details.email,
          password: details.password,
          confirmPass: details.confirmPass,
        };

        const payloadUsernamePassword = {
          username: details.username,
          password: details.password,
        };

        try {
          await axios.post("http://localhost:8080/create/user", payloadAllDetails);
          await axios.post("http://localhost:8080/add/user", payloadUsernamePassword);
          navigate("/");
        } catch (error) {
          console.error("There was an error creating the account:", error);
          alert("An error occurred. Please try again later.");
        }
      } else {
        alert("Passwords do not match");
      }
    } else {
      alert("Please fix the password errors before submitting");
    }
  };

  return (
    <div>
      <div>
        <h1>Sign up</h1>
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h3>Username</h3>
          <input
            className="name"
            type="text"
            placeholder="Username"
            required
            value={details.username}
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
          <br />
          <h3>Email</h3>
          <input
            type="email"
            className="name"
            placeholder="sample@gmail.com"
            required
            value={details.email}
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <br />
          <h3>Password</h3>
          <input
            type="password"
            className="name"
            placeholder="****"
            required
            value={details.password}
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
          <h3>Confirm Password</h3>
          <input
            type="password"
            className="name"
            placeholder="****"
            required
            value={details.confirmPass}
            onChange={(e) =>
              setDetails({ ...details, confirmPass: e.target.value })
            }
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
