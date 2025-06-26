import { createContext, useState } from "react";

// create context
export const TutorContext = createContext();

const TutorContextProvider = (props) => {
  const [tutorToken, setTutorToken] = useState("dummyTOken");
  const value = {tutorToken,setTutorToken};

  return (
    <TutorContext.Provider value={value}>
      {props.children}
    </TutorContext.Provider>
  );
};

export default TutorContextProvider;
