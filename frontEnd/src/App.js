import './App.css';
import { Routes,Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
function App() {
  return (
    < >
      <Routes>
        <Route path='/' element={<ProtectRoutes><HomePage/></ProtectRoutes>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  );
}

// This is for checking if logged in or not if not then login first
export function ProtectRoutes(props){
  if(localStorage.getItem("user")){
    return props.children;
  }else{
    return <Navigate to="/login"/>
  }
}

export default App;
