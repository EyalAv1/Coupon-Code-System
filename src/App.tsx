import "./App.css";
import "react-toastify/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./containers/mainPage/MainPage";
import AdminCoupons from "./containers/adminCouponsPage/AdminCoupons";
import NavigationBar from "./components/navigation/NavigationBar";
import Login from "./containers/login/Login";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/adminCoupons" element={<AdminCoupons />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
