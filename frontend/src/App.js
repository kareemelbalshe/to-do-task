import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/notFound/NotFound";
import { useSelector } from "react-redux";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const { user } = useSelector(state => state.auth)
  return (
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={user?<Navigate to="/dashboard"/>:<Home />} />
          <Route path="/login" element={!user?<Login />:<Navigate to="/dashboard" />} />
          <Route path="/register" element={!user?<Register />:<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={!user?<Navigate to="/" />:<Dashboard />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
  );
}

export default App;
