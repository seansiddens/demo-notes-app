import React, { useRef, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import LoaderButton from "../components/LoaderButton";
import { useParams, useNavigate } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../lib/errorLib";
import "./Notes.css";
import config from "../config";
import { s3Upload } from "../lib/awsLib";

export default function Notes() {
    const file = useRef();
    const { id } = useParams(); // Get the id from the URL.
    const nav = useNavigate();

    // State variables.
    const [note, setNote] = useState(null);
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        function loadNote() {
            // Call the GET note API route.
            return API.get("notes", `/notes/${id}`);
        }

        async function onLoad() {
            try {
                const note = await loadNote();
                const { content, attachment } = note;

                if (attachment) {
                    note.attachmentURL = await Storage.vault.get(attachment);
                }

                setContent(content);
                setNote(note);
            } catch (e) {
                onError(e);
            }
        }
        onLoad();
    }, [id]);

    function validateForm() {
        return content.length > 0;
    }

    function formatFilename(str) {
        return str.replace(/^\w+-/, "");
    }

    function handleFileChange(event) {
        file.current = event.target.files[0];
    }

    function saveNote(note) {
        // Call our update API route.
        return API.put("notes", `/notes/${id}`, {
            body: note,
        });
    }

    async function handleSubmit(event) {
        let attachment;

        event.preventDefault();

        if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
            alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB`);
            return;
        }

        setIsLoading(true);

        try {
            if (file.current) {
                // If there was a new file attached, upload it to s3.
                // TODO: Delete the old file? 
                attachment = await s3Upload(file.current);
            }

            await saveNote({
                content,
                attachment: attachment || note.attachment,
            });
            nav("/"); // Nav back to home on submit.
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleDelete(event) {
        event.preventDefault();

        const confirmed = window.confirm("Are you sure you want to delete this note?");

        if (!confirmed) {
            return;
        }

        setIsDeleting(true);
    }


    return (
        // Render form only when "note" state variable is set.
        <div className="Notes">
            {note && (
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="content">
                        <Form.Control
                            as="textarea"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="file">
                        <Form.Label>Attachment</Form.Label>
                        {note.attachment && (
                            <p>
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={note.attachmentURL}
                                >
                                    {formatFilename(note.attachment)}
                                </a>
                            </p>
                        )}
                        <Form.Control onChange={handleFileChange} type="file" />
                    </Form.Group>
                    <LoaderButton
                        block="true"
                        size="lg"
                        type="submit"
                        isLoading={isLoading}
                        disabled={!validateForm()}
                    >
                        Save
                    </LoaderButton>
                    <LoaderButton
                        block="true"
                        size="lg"
                        variant="danger"
                        onClick={handleDelete}
                        isLoading={isDeleting}
                    >
                        Delete
                    </LoaderButton>
                </Form>
            )}
        </div>
    );
}