import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import Dashboard from "../pages/organizer/Dashboard/Dashboard";
import CreateQuiz from "../pages/organizer/CreateQuiz/CreateQuiz";

import JoinRoom from "../pages/participant/JoinRoom/JoinRoom";

import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route
                path="/organizer"
                element={
                    <ProtectedRoute role="ORGANIZER">
                        <Dashboard />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/organizer/create"
                element={
                    <ProtectedRoute role="ORGANIZER">
                        <CreateQuiz />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/participant"
                element={
                    <ProtectedRoute role="PARTICIPANT">
                        <JoinRoom />
                    </ProtectedRoute>
                }
            />

        </Routes>

    );

}

export default AppRouter;