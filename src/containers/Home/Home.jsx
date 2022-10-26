import React from "react";

import "./Home.scss";

const Home = ({ userProfile }) => {

    const capitalisedNames = name => {
        return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
      };

    return <div>Welcome {userProfile.displayName}</div>;
};

export default Home;
