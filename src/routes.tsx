import { createBrowserRouter } from "react-router-dom";
import { Home } from "./screens/Home";
import { Merchants } from "./screens/Merchants";
import { MerchantRequests } from "./screens/MerchantRequests";
import { Relays } from "./screens/Relays";
import { RelayRequests } from "./screens/RelayRequests";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  // Merchant Routes
  {
    path: "/merchants",
    element: <Merchants />,
  },
  {
    path: "/merchants/requests",
    element: <MerchantRequests />,
  },
  // Relay Routes
  {
    path: "/relays",
    element: <Relays />,
  },
  {
    path: "/relays/requests",
    element: <RelayRequests />,
  },
]);
