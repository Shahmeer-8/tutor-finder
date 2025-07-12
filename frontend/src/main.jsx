import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminContextProvider from "./context/AdminContext";
import TutorContextProvider from "./context/TutorContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <AdminContextProvider>
        <TutorContextProvider>
          <App />
        </TutorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
  </BrowserRouter>
);
