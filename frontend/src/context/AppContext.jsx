import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tutors, subjectData, blogs } from "../data/data";

// Create Context for the application
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState("dummyToken");
  const currency = "$";

  const value = {
    tutors,
    token,
    setToken,
    navigate,
    currency,
    subjectData,
    blogs,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
