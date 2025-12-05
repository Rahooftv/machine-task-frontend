import React from "react";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";

const App: React.FC = () => {
  const location = useLocation();


  const hideNavbarRoutes = ["/login", "/register"];

  const hideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <div className={!hideNavbar ? "pt-20" : ""}>
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
