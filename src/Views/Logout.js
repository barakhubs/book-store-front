import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout logic here, such as clearing token from localStorage
    localStorage.removeItem("token");
    // Redirect to login page after logout
    navigate("/login");
  }, [navigate]);

  return (
    <div>
      <h1>Logging out...</h1>
      {/* You can show a loading spinner or a message here while performing logout */}
    </div>
  );
}

export default Logout;
