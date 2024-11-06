import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./containers/mainPage/MainPage";
import AdminCoupons from "./containers/adminCouponsPage/AdminCoupons";
import NavigationBar from "./components/navigation/NavigationBar";
import Login from "./containers/login/Login";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginSuccess = () => {setIsLogin(true)};
  const handleLogout = () => setIsLogin(false);
  return (
    <>
      <NavigationBar isLogin = {isLogin} onLogout = {handleLogout}/>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/adminCoupons" element={<AdminCoupons />} />
          <Route
            path="/Login"
            element={<Login onLoginSuccess={handleLoginSuccess} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
