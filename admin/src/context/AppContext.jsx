import { createContext } from "react";
import { useNavigate } from "react-router-dom";

// create context

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const navigate = useNavigate();
  
const value = {navigate};

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
