import React, { useEffect, useState }  from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { message } from 'antd';
const Header = () => {
  let [loginUser,setLoginUser]=useState("");
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
      setLoginUser(user)
    }
  },[])

  const navigate=useNavigate();
  // Logout
  const logoutHandler = ()=>{
    localStorage.removeItem('user');
    message.success("Logout Successful");
    navigate('/login');
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
    <div className="container-fluid ">
        <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarTogglerDemo01" 
        aria-controls="navbarTogglerDemo01" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
        >
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarTogglerDemo01">
        <Link className="navbar-brand" to='/'>Expense App</Link>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li className="nav-item">
            {loginUser && loginUser.name}
            
            </li>
            
        </ul>
          <button className='btn btn-primary' onClick={logoutHandler}>
              
              Logout
          </button>
        </div>
    </div>
    </nav>
    </>
  )
}

export default Header