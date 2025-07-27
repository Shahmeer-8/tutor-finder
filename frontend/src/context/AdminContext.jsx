import { createContext, useState } from "react";

// create context
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState(" ");
  
// get all tutors from Backend

  
  const value = {
    atoken,
    setAtoken,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
