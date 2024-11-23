import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import userStore from "./utils/userStore.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={userStore}>
            <App />
            <Toaster />
        </Provider>
        {/* <App /> */}
    </StrictMode>
);
