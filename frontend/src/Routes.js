import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import NewNote from "./containers/NewNote";
import NotFound from "./containers/NotFound";

export default function Links() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes/new" element={<NewNote />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}