import React from "react";
import { Form } from "react-bootstrap";

const StyleInput = ({
    className,
    type,
    placeholder,
    register,
    required,
    pattern,
    field,
}) => (
    <Form.Control
        className={className}
        type={type}
        placeholder={placeholder}></Form.Control>
);

export default StyleInput;
