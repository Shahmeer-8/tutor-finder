import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; //dom
import { ToastContainer } from "react-toastify"; //reacttify
import "react-toastify/dist/ReactToastify.css";
import AppContextProvider from './context/AppContext.jsx'
import AdminContextProvider from "./context/AdminContext.jsx";
import TutorContextProvider from "./context/TutorContext.jsx";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppContextProvider>
      <AdminContextProvider>
        <TutorContextProvider>
          <App />
        </TutorContextProvider>
      </AdminContextProvider>
    </AppContextProvider>
    <ToastContainer position="bottom-right" />
  </BrowserRouter>
);
