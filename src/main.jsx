import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import isPropValid from "@emotion/is-prop-valid";
import {StyleSheetManager} from "styled-components";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <StyleSheetManager shouldForwardProp={shouldForwardProp}>
            <App />
        </StyleSheetManager>
    </React.StrictMode>
);

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName, target) {
    if (typeof target === "string") {
        // For HTML elements, forward the prop if it is a valid HTML attribute
        return isPropValid(propName);
    }
    // For other elements, forward all props
    return true;
}
