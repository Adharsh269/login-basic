import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
    const [details, setDetails] = useState({
        username: "",
        email: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmitt = (event: any) => {
        event.preventDefault();
        console.log("user details...." + details);
        axios
            .post("http://localhost:3001/details", details)
            .then(() => navigate("/"));
    };
    return (
        <div >
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
                        onChange={(e) => setDetails({ ...details, username: e.target.value })}
                    />
                    <br />
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
                    <br />
                    <h3>Password</h3>
                    <input
                        type="password"
                        className="name"
                        placeholder="****"
                        required
                        onChange={(e) => setDetails({ ...details, password: e.target.value })}
                    />
                    <br />
                    <br />
                    
                    <input type="submit" value="Submit" className="submit-button"/>
                </form>
            </div>
        </div>
    );
}

export default Create;
