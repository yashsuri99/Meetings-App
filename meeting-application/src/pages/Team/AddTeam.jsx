import React, { useState } from "react";
import { Container, Form, Alert } from "react-bootstrap";
import { addTeam as newTeams } from "../../services/AddTeam";
import { useForm } from "react-hook-form";
import { FaExclamationCircle } from "react-icons/fa";
import "../../all.scss";
import StyleButton from "../../components/atoms/buttons/Button";
import StyleLabel from "../../components/atoms/label/label";

const AddTeam = ({ setAddTeam }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        mode: "all",
    });
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const newTeam = async (team) => {
        const team1 = {
            name: team.name,
            shortName: team.shortName,
            description: team.description,
            members: team.members.split(","),
        };
        try {
            const response = await newTeams(team1);
            const newTeamResponse = response;
            setStatus("ADDED");
            setError(
                `Team with name = ${newTeamResponse.name} has been created`
            );
            setAddTeam(newTeamResponse);
            reset();
        } catch (error) {
            setStatus("ERROR");
            setError(error.message);
        }
    };
    return (
        <Container className="border border-dark p-2">
            <Form onSubmit={handleSubmit(newTeam)}>
                <Form.Group className="mb-3" controlId="name">
                    <StyleLabel className="emphasize required">
                        Team Name
                    </StyleLabel>
                    <Form.Control
                        type="text"
                        placeholder="Team's name"
                        {...register("name", { required: true })}
                    />
                    <div className="formError emphasize">
                        {errors.name && errors.name.type === "required" && (
                            <div
                                role="alert"
                                aria-label=" Team's name required">
                                <i className="classes you have">
                                    <FaExclamationCircle />{" "}
                                </i>
                                &nbsp; Team's name is required
                            </div>
                        )}
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="shortName">
                    <StyleLabel className="emphasize required">
                        Short Name
                    </StyleLabel>
                    <Form.Control
                        type="text"
                        placeholder="Short name"
                        {...register("shortName", { required: true })}
                    />
                    <div className="formError emphasize">
                        {errors.shortName &&
                            errors.shortName.type === "required" && (
                                <div
                                    role="alert"
                                    aria-label=" Team's short name required">
                                    <i className="classes you have">
                                        <FaExclamationCircle />{" "}
                                    </i>
                                    &nbsp; Team's short name is required
                                </div>
                            )}
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                    <StyleLabel className="emphasize required">
                        Description
                    </StyleLabel>
                    <Form.Control
                        type="text"
                        as="textarea"
                        placeholder="A few lines about the team"
                        {...register("description", {
                            required: true,
                            minLength: 10,
                        })}
                    />
                    <div className="formError emphasize">
                        {errors.description &&
                            errors.description.type === "required" && (
                                <div>
                                    <i className="classes you have">
                                        <FaExclamationCircle />{" "}
                                    </i>
                                    &nbsp;Description is required
                                </div>
                            )}
                        {errors.description &&
                            errors.description.type === "minLength" && (
                                <div>
                                    <i className="classes you have">
                                        <FaExclamationCircle />{" "}
                                    </i>
                                    &nbsp; Description should be minimum 10
                                    characters
                                </div>
                            )}
                    </div>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <StyleLabel className="emphasize">Members:</StyleLabel>
                    <Form.Control
                        type="email"
                        placeholder="john@example.com"
                        multiple
                        {...register("members")}
                    />
                </Form.Group>
                <span className="hidden">Team with name</span>
                <StyleButton variant="primary" type="submit">
                    Add Team
                </StyleButton>
            </Form>
            {status === "ADDED" && <Alert variant="primary">{error}</Alert>}
            {status === "ERROR" && <Alert variant="danger">{error}</Alert>}
        </Container>
    );
};

export { AddTeam };
