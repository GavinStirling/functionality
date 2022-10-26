import React from "react";
import { Link } from "react-router-dom";

const Splash = () => {
    return (
        <div>
            Splash
            <Link to="/create-account">
                Create an Account!
            </Link>
            <Link to="/sign-in">
                Sign in to an Existing Account!
            </Link>
        </div>
    );
};

export default Splash;
