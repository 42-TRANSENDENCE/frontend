import ReactDOM from "react-dom/client";
import App from "./App/App";
import GlobalStyles from "./styles/global";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <GlobalStyles />
    <App />
  </>
);
