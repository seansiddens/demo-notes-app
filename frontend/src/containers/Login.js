import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../lib/contextLib";
import { useNavigate } from "react-router-dom";
import { useFormFields } from "../lib/hooksLib";
import { onError } from "../lib/errorLib";
import "./Login.css";

export default function Login() {
    const nav = useNavigate();

    // State variables.
    const [isLoading, setIsLoading] = useState(false);
    const { userHasAuthenticated } = useAppContext();
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
    });

    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            // Attempt to sign in w/ the inputted credentials.
            await Auth.signIn(fields.email, fields.password);

            // Set state if it was successful.
            userHasAuthenticated(true);

            // Redirect to homepage on login.
            nav("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </Form.Group>
                <LoaderButton block="true" size="lg" type="submit" isLoading={isLoading} disabled={!validateForm()}>
                    Login
                </LoaderButton>
            </Form>
        </div>
    );
}
