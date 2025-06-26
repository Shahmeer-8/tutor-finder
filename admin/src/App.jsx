import React, { useContext } from "react";
import { AdminContext } from "./context/AdminContext";
import { TutorContext } from "./context/TutorContext";
import AppRoutes from "./routes/Routes";
import Login from "./pages/Auth/Login"; 

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { tutorToken } = useContext(TutorContext);

  return (
    <main>
      <div>
        {(atoken || tutorToken) ?(
          <AppRoutes /> // Render routes if token exists
        ) : (
          <Login /> // Show login page if not logged in
        )}
      </div>
    </main>
  );
};

export default App;
