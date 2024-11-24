import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../App";
import UserProfile from "../UserProfile";
import Register from "../features/auth/register/Register";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
