import React from "react";
import { Button } from "react-bootstrap";

const StyleButton = ({ children, variant, type, className, as, to, role }) => (
    <Button
        variant={variant}
        type={type}
        className={className}
        as={as}
        to={to}
        role={role}>
        {children}
    </Button>
);

export default StyleButton;
