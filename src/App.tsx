import React from "react";
import Navbar from "./components/layout/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <div className="pt-20">
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;
