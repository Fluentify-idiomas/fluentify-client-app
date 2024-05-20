import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const customTheme: ThemeConfig = extendTheme({
  styles: {
    global: {
      "html, body, #root": {
        minHeight: "100vh",
        bgGradient: 'linear(to-b, #10002B, #5A189A)',
      },
    },
  },
  semanticTokens: {
    colors: {
      error: 'red.500',
      primary: '#10002B',
      secondary: '#FC7CFF',
      tertiary: '#8FFF7C',
    },
    fonts: {
      heading: 'inter, sans-serif',
      body: 'inter, sans-serif',
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
