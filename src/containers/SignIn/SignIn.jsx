import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import InputField from "../../components/InputField/InputField";

import "./SignIn.scss";

const defaultUser = { email: "", password: "" };

const SignIn = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState(defaultUser);

    const handleSignIn = async () => {
        try {
            if (!user.email || !user.password) return;

            const userCredential = await signInWithEmailAndPassword(
                auth,
                user.email,
                user.password
            );

            if (userCredential) {
                sessionStorage.setItem(
                    "display",
                    userCredential.user.displayName
                );
                setUser(defaultUser);
                navigate("/");
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            SignIn
            <form className="sign-in__inputs">
                <InputField
                    value={user.email}
                    inputType="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    onChange={(event) =>
                        setUser({ ...user, email: event.target.value })
                    }
                />
                <InputField
                    value={user.password}
                    inputType="password"
                    label="Password"
                    placeholder="Your password"
                    onChange={(event) =>
                        setUser({ ...user, password: event.target.value })
                    }
                />
            </form>
            <button onClick={handleSignIn}>Login</button>
        </div>
    );
};

export default SignIn;
