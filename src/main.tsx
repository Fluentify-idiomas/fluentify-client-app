// index.js
import { ChakraProvider, extendTheme, ThemeConfig } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const customTheme = extendTheme({
  config,
  styles: {
    global: {
      "html, body, #root": {
        minHeight: "100vh",
        bgGradient: "linear(to-b, #10002B, #5A189A)",
      },
    },
  },
  semanticTokens: {
    colors: {
      error: "red.500",
      primary: "#10002B",
      secondary: "#FC7CFF",
      tertiary: "#8FFF7C",
    },
  },
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <ChakraProvider theme={customTheme}>
    <App />
  </ChakraProvider>
  // </React.StrictMode>
);
