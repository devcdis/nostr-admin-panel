import { createBrowserRouter } from "react-router-dom";
import { Merchants } from "./screens/Merchants";
import { Relays } from "./screens/Relays";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Merchants />,
  },
  {
    path: "/relays",
    element: <Relays />,
  },
]);
