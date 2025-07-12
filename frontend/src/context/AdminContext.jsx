import { createContext, useState } from "react";

// create context
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [atoken, setAtoken] = useState("dummyToken");
  
// get all tutors from Backend
  // const getAllTutors = async ()=>{
  //   try {
      
  //   } catch (error) {
      
  //   }
  // }
  
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
