import { AppSeguro } from "./components/AppSeguro";
import { CotizadorProvider } from "./context/CotizadorProvider";
import "./index.css";

function App() {
  return (
    <CotizadorProvider>
      <AppSeguro />
    </CotizadorProvider>
  );
}

export default App;
