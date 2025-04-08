import ContextContainer from "./context";
import AppRoutes from "./routes/Routes";
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { TOASTER_AUTO_CLOSE } from "./constants";
import { TOASTER_POSITION } from "./enums";

function App() {
  return (
    <BrowserRouter>
      <ContextContainer>
        <ToastContainer
          autoClose={TOASTER_AUTO_CLOSE.autoClose}
          position={TOASTER_POSITION["TOP_CENTER"]}
        />
        <AppRoutes />
      </ContextContainer>
    </BrowserRouter>
  );
}

export default App;
