import { useEffect, useState } from "react";
import './App.css'

function App(){

  const [search,setSearch]=useState({username:""})
  function handleChange(event){
    const {name,value}=event.target
    setSearch(item=>({...item,[name]:value}))

  }

  const[clicked,setClicked]=useState(false);
  function handleClick(){
    setClicked(!clicked)
  }

  const [userdata,setUserData]=useState("");
  useEffect(()=>{
    fetch(`https://api.github.com/users/${search.username}`)
      .then(res=>res.json())
        .then(data=>setUserData(data))
  },[clicked])
  
  return(
    <div className="body">
      <h1>Github Profile Search</h1>
      <div className="search">
        <input type="text" id="search" value={search.username} name="username" placeholder="Enter the username here" autoFocus onChange={handleChange} className="search--imput"/>
        <button onClick={handleClick}><span>Search</span></button>
      </div>
      <div className="App">
      
      <div className="Profile">
        <div className="Profile--img">
          <img src={`${userdata.avatar_url}`}alt="Git"/>
        </div>
        <span className="name"><a href={`${userdata.html_url}`}>{userdata.name}</a><p> Joined on {userdata.created_at} </p></span>
        <p>Public repos: {userdata.public_repos}</p>
        <p>Followers: {userdata.followers}</p>
        <p>Following: {userdata.following}</p>
        <p>Company: {userdata.company}</p>
        <p>Location: {userdata.location}</p>

      </div>
    </div>
    </div>
  )
}

export default App;