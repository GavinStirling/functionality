import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Profile = ({ userProfile, handleUserLogout }) => {
    const auth = getAuth();
    const navigate = useNavigate();

    const logOut = () => {
        signOut(auth);
        handleUserLogout();
        navigate("/");
      };

    return (
        <div>
            {userProfile.displyName}
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default Profile;
