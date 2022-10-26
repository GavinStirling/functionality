import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import Splash from "../Splash/Splash";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import Home from "../Home/Home";

const Routing = () => {
    const auth = getAuth();
    const [userToken, setUserToken] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {
        if (userToken && userLoading) {
            setUserLoading(false);
        }
    }, [userToken, userLoading]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (authenticatedUser) => {
            if (authenticatedUser) {
                setUserToken(authenticatedUser);
            }
        });
        return unsubscribe;
    }, []);

    return (
        <Router>
            <Routes>
                <Route element={<ProtectedRoute user={!userToken} />}>
                    <Route
                        path={userLoading ? "/" : "splash"}
                        element={<Splash />}
                    />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/create-account" element={<SignUp />} />
                </Route>
                <Route
                    element={
                        <ProtectedRoute user={userToken} navigateTo={"/"} />
                    }
                >
                    <Route>
                        {!userLoading && (
                            <Route
                                path="/"
                                element={<Home userProfile={userToken} />}
                            />
                        )}
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
};

export default Routing;
