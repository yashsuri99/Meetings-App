import React from "react";
import { Form } from "react-bootstrap";

const StyleLabel = ({ children, className, htmlFor, controlId }) => (
    <Form.Label className={className} htmlFor={htmlFor} controlId={controlId}>
        {children}
    </Form.Label>
);

export default StyleLabel;
