// Route which ensures a user is NOT logged in before routing.
import React, { cloneElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

export default function UnauthenticatedRoute(props) {
    const { isAuthenticated } = useAppContext();
    const { children } = props;

    if (isAuthenticated) {
        // Redirect to homepage if user is logged in.
        return <Navigate to={"/"} />;
    }

    return cloneElement(children, props);
}