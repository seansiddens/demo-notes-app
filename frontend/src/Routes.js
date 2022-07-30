import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthentciatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import NewNote from "./containers/NewNote";
import Notes from "./containers/Notes";
import NotFound from "./containers/NotFound";

export default function Links() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route
                path="/signup"
                // Must be logged-out.
                element={
                    <UnauthenticatedRoute>
                        <Signup />
                    </UnauthenticatedRoute>
                } />
            <Route
                path="/login"
                // Must be logged-out.
                element={
                    <UnauthenticatedRoute>
                        <Login />
                    </UnauthenticatedRoute>
                } />
            <Route
                path="/notes/new"
                // Must be logged-in
                element={
                    <AuthentciatedRoute>
                        <NewNote />
                    </AuthentciatedRoute>
                } />
            <Route
                path="/notes/:id"
                // Must be logged-in.
                element={
                    <AuthentciatedRoute>
                        <Notes />
                    </AuthentciatedRoute>
                } />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}