import React from "react";
import { Link } from "react-router-dom";

import "./Home.scss";

const Home = ({ userProfile }) => {
    return (
        <div>
            Welcome {userProfile.displayName}
            <div><Link to="/profile" >Profile</Link></div>
        </div>
    );
};

export default Home;
