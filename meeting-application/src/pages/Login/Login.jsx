import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";
import { login as loginAuth } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { FaExclamationCircle } from "react-icons/fa";
import StyleButton from "../../components/atoms/buttons/Button";
import "../../all.scss";
import StyleLabel from "../../components/atoms/label/label";

const Login = () => {
    const [error, setError] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "all",
    });

    const navigate = useNavigate();

    const login = async (credentials) => {
        try {
            await loginAuth(credentials);
            navigate("/Calendar");
        } catch (error) {
            setError(error);
            // alert(error.message);
        }
    };

    return (
        <>
            <div className="index-page">
                <Helmet>
                    <title>Login Page</title>
                    <meta
                        name="description"
                        content="This Page allows users to login into meetings app"
                    />
                </Helmet>
                <div className="p-3 mb-2">
                    <Container>
                        <h1 className="shadow-sm text-success mt-5 p-3 text-center rounded bg-light">
                            Login Page
                        </h1>
                        <Row className="mt-5 bg-light">
                            <Col
                                lg={5}
                                md={6}
                                sm={12}
                                className="p-5 m-auto shadow-sm rounded-lg ">
                                <Form onSubmit={handleSubmit(login)}>
                                    <Form.Group controlId="email">
                                        <StyleLabel className="required">
                                            <span className="emphasize">
                                                Email address
                                            </span>
                                            <br />
                                            (Format :
                                            sapient.com/publicissapient.com)
                                        </StyleLabel>
                                        <Form.Control
                                            className="mb-4"
                                            type="email"
                                            placeholder="Enter email"
                                            {...register("email", {
                                                required: true,
                                                pattern:
                                                    /^[A-Za-z]{1}[A-Za-z0-9]+@(publicissapient|sapient).com$/,
                                            })}
                                        />
                                        <div className="formError emphasize">
                                            {errors.email &&
                                                errors.email.type ===
                                                    "required" && (
                                                    <div
                                                        role="alert"
                                                        aria-label="Email required">
                                                        <i className="classes you have">
                                                            <FaExclamationCircle />{" "}
                                                        </i>
                                                        &nbsp;Email is required
                                                    </div>
                                                )}
                                            {errors.email &&
                                                errors.email.type ===
                                                    "pattern" && (
                                                    <div>
                                                        <div
                                                            role="alert"
                                                            aria-label="Email format is incorrect">
                                                            <i className="classes you have">
                                                                <FaExclamationCircle />{" "}
                                                            </i>
                                                            &nbsp;Email format
                                                            is incorrect
                                                        </div>
                                                    </div>
                                                )}
                                        </div>
                                    </Form.Group>

                                    <Form.Group controlId="password">
                                        <StyleLabel className="emphasize required">
                                            Password
                                        </StyleLabel>
                                        <Form.Control
                                            className="mb-4"
                                            type="password"
                                            placeholder="Password"
                                            {...register("password", {
                                                required: true,
                                            })}
                                        />
                                        <div className="formError emphasize">
                                            {errors.password &&
                                                errors.password.type ===
                                                    "required" && (
                                                    <div
                                                        role="alert"
                                                        aria-label="Password required">
                                                        <i className="classes you have">
                                                            <FaExclamationCircle />{" "}
                                                        </i>
                                                        &nbsp;Password is
                                                        required
                                                    </div>
                                                )}
                                        </div>
                                        {error &&
                                            error.response.status === 401 && (
                                                <div
                                                    role="alert"
                                                    id="credentials-error"
                                                    className="error-color">
                                                    <i className="emphasize">
                                                        <FaExclamationCircle />{" "}
                                                    </i>
                                                    &nbsp;Credentials did not
                                                    match, please check again
                                                </div>
                                            )}
                                    </Form.Group>

                                    <Row xs={1}>
                                        <Col>
                                            <StyleButton
                                                variant="primary btn-block"
                                                type="submit"
                                                className="btn-width">
                                                Login
                                            </StyleButton>
                                        </Col>
                                        <Col>
                                            <StyleButton
                                                variant="success btn-block"
                                                type="button"
                                                className="btn-width"
                                                as={Link}
                                                to="/Registration">
                                                Create Account
                                            </StyleButton>
                                        </Col>
                                    </Row>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
};

export default Login;
