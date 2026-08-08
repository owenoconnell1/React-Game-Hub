import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";
import { HomePage } from "./pages/HomePage";
import { LobbyView } from "./pages/LobbyPage";
import { RPSGamePage } from "./pages/RPSGamePage";
import { TicTacToePage } from "./pages/TicTacToePage";
import { WordlePage } from "./pages/WordlePage";
import { SimonSaysPage } from "./pages/SimonSaysPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { applySavedTheme } from "./utils/theme";

applySavedTheme();

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/lobby", element: <LobbyView /> },
      { path: "/game/rps", element: (<ProtectedRoute> <RPSGamePage /> </ProtectedRoute>), },
      { path: "/game/tic-tac-toe", element: (<ProtectedRoute> <TicTacToePage /> </ProtectedRoute>), },
      { path: "/game/wordle", element: (<ProtectedRoute> <WordlePage /> </ProtectedRoute>), },
      { path: "/game/simon-says", element: (<ProtectedRoute> <SimonSaysPage /> </ProtectedRoute>), },
    ],
  }],
  {
      basename: import.meta.env.BASE_URL,
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
