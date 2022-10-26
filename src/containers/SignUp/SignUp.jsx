import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import InputField from "../../components/InputField/InputField";

import "./SignUp.scss";

const SignUp = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (event) => {
        setUser((previousState) => ({
            ...previousState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //Make sure all fields have content - error notification may be useful
        if (!Object.values(user).every((item) => item.length > 0)) {
            return;
        }

        // Check passwords match - error notification may be useful
        if (user.password !== user.confirmPassword) {
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );

            if (userCredential) {
                updateProfile(auth.currentUser, {
                    displayName: `${user.firstName} ${user.lastName}`,
                });
                sessionStorage.setItem(
                    "displayName",
                    `${user.firstName} ${user.lastName}`
                );
                setUser({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                });
                navigate("/");
            }
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + " " + errorMessage);
        }
    };

    return (
        <div className="signup">
            Sign Up:
            <form action="">
                <InputField
                    inputType="text"
                    label="First Name"
                    placeholder="First Name"
                    onChange={handleInputChange}
                    inputName="firstName"
                    value={user.firstName}
                />
                <InputField
                    inputType="text"
                    label="Last Name"
                    placeholder="Last Name"
                    onChange={handleInputChange}
                    inputName="lastName"
                    value={user.lastName}
                />
                <InputField
                    inputType="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    onChange={handleInputChange}
                    inputName="email"
                    value={user.email}
                />
                <InputField
                    inputType="password"
                    label="Password"
                    placeholder="Your password"
                    onChange={handleInputChange}
                    inputName="password"
                    value={user.password}
                />
                <InputField
                    inputType="password"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                    onChange={handleInputChange}
                    inputName="confirmPassword"
                    value={user.confirmPassword}
                />
            </form>
            <button linkTo="/" onClick={handleSubmit} type="submit">Create Account</button>
        </div>
    );
};

export default SignUp;
