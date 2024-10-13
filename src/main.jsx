import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import isPropValid from "@emotion/is-prop-valid";
import {StyleSheetManager} from "styled-components";
import {ErrorBoundary} from "react-error-boundary";
import ErrorFallback from "./ui/ErrorFallback";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.replace("/")}>
            <StyleSheetManager shouldForwardProp={shouldForwardProp}>
                <App />
            </StyleSheetManager>
        </ErrorBoundary>
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
