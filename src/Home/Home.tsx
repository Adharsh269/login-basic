import { useEffect, useState } from "react";

function Home(){
    const [usern, setUserName] =useState("");
            useEffect(() => {
                const username=localStorage.getItem('UserName')
                if(username){
                    setUserName(username);
                }
            },[]);
    return(
        
        <div>
            <p >Loggined Username:{usern}</p>
        </div>
    )
}
export default Home;