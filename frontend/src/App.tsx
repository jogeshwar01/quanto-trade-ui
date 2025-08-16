import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Trade } from "./pages/Trade";
import { TradesProvider } from "./state/TradesProvider";
import { ConnectWalletProvider } from "./state/Provider";

function App() {
  return (
    <ConnectWalletProvider>
      <TradesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/en/markets/:market" element={<Trade />} />
            <Route path="*" element={<Navigate to="/en/markets/BT-PERP" />} />
          </Routes>
        </BrowserRouter>
      </TradesProvider>
    </ConnectWalletProvider>
  );
}

export default App;
