import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Tasks from "../pages/Tasks";
import ProtectedRoute from "./ProtectedRoute";


import AddTask from "../pages/AddTask";
import UpdateTask from "../pages/UpdateTask";

const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />

        <Route path="/tasks" element={
            <ProtectedRoute> 
           <Tasks/>
            </ProtectedRoute>
        }/>

        
        <Route path="/task/add"
          element={
            <ProtectedRoute>
              <AddTask/>
            </ProtectedRoute>
          }
        />

        <Route path="/task/update/:id" element={
            <ProtectedRoute> 
            <UpdateTask/>
            </ProtectedRoute>
        }/>



    </Routes>
  )
}

export default AppRoutes
