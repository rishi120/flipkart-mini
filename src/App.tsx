import ContextContainer from "./context";
import AppRoutes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Router>
      <ContextContainer>
        <ToastContainer autoClose={2000} position="top-center" />
        <AppRoutes />
      </ContextContainer>
    </Router>
  );
}

export default App;
