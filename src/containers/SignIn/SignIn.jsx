import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import InputField from "../../components/InputField/InputField";

import "./SignIn.scss";

const defaultUser = { email: "", password: "" };

const SignIn = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
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

    const handleGoogleSignIn = async () => {
        try {
            let userCredential = null;
            signInWithPopup(auth, provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            userCredential = GoogleAuthProvider.credentialFromResult(result);
            // const token = userCredential.accessToken;
            // The signed-in user info.
            // const user = result.user;
            })

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
            Sign In
            <Link to="/sign-up">Create an Account</Link>
            <button onClick={handleGoogleSignIn}>Sign in with Google</button>
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
            <button type="submit" onClick={handleSignIn}>Login</button>
        </div>
    );
};

export default SignIn;
