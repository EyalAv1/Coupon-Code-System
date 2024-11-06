import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./containers/mainPage/MainPage";
import AdminCoupons from "./containers/adminCouponsPage/AdminCoupons";
import NavigationBar from "./components/navigation/NavigationBar";

function App() {
  return (
    <>
      <NavigationBar />
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/adminCoupons" element={<AdminCoupons />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
