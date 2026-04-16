import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './layouts/Header'
import Home from './layouts/Home'
import ProductList from './products/ProductList'
import ProductInfo from './products/ProductInfo'
import AddProduct from './products/AddProduct'
import SignIn from './users/SignIn'
import { useState } from 'react'
import DashBoard from './users/DashBoard'
import SignUp from './users/SignUp'

function App() {

  //로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  //로그인한 ID 사용자 관리
  const [userId, setUserId] = useState<string|null>(null);

  //로그인한 사용자 권한 관리
  const [userRole, setUserRole] = useState<string|null>(null);

  //로그인 상태 핸들러
  const handleLogin = (username:string, role:string) => {
    setIsLoggedIn(true);
    setUserId(username); //로그인한 사용자ID 저장
    setUserRole(role);
  }

  //로그아웃 상태 핸들러
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setUserRole(null);
  }  

  return (
    <>
      <section className="app">
        <BrowserRouter basename='/shopping/'>
          <Header 
            isLoggedIn={isLoggedIn} 
            onLogout={handleLogout}
            userId={userId}
            userRole={userRole}/>            
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<ProductList />}></Route>
            <Route path="/products/:id" element={<ProductInfo />} />
            <Route path="/products/add" element={<AddProduct />} />
            <Route path="/signin" element={<SignIn onLogin={handleLogin}/>} />            
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>          
        </BrowserRouter>
      </section>
    </>
  )
}

export default App
