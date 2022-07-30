import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useAppContext } from "../lib/contextLib";
import { onError } from "../lib/errorLib";
import "./Home.css";

export default function Home() {
    const [notes, setNotes] = useState([]);
    const { isAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(true);

    function renderNotesList(notes) {
        return null;
    }

    function renderLander() {
        return (
            <div className="Home">
                <div className="lander">
                    <h1> Scratch </h1>
                    <p className="text-muted">A simple note taking app.</p>
                </div>
            </div>
        );
    }

    function renderNotes() {
        return (
            <div className="notes">
                <h2 className="pb-3 mt-4 mb-3 border-bottom">Your Notes</h2>
                <ListGroup>{!isLoading && renderNotesList(notes)}</ListGroup>
            </div>
        );
    }

    // If user is logged in, render their notes. Otherwise, render the landing page.
    return (
        <div className="Home">
            {isAuthenticated ? renderNotes() : renderLander()}
        </div>
    );

}
