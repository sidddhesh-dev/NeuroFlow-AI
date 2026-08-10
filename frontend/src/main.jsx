import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthProvider";
import { queryClient } from "./lib/queryClient";

import AuthPage from "./pages/auth/AuthPage.jsx";
import Chat from "./pages/ChatPage/ChatPage.jsx";
import Developer from "./pages/DeveloperPage/DeveloperPage.jsx";
import History from "./pages/HistoryPage/HistoryPage.jsx";
import Documents from "./pages/DocumentsPage/DocumentsPage.jsx";
import Notes from "./pages/NotesPage/NotesPage.jsx";
import UploadDocument from "./pages/UploadPage/Upload.jsx";
import Settings from "./pages/SettingsPage/SettingsPage.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="/chat" replace /> },
            { path: "chat", element: <Chat /> },
            { path: "chat/:sessionId", element: <Chat /> },
            { path: "documents", element: <Documents /> },
            { path: "history", element: <History /> },
            { path: "notes", element: <Notes /> },
            { path: "upload", element: <UploadDocument /> },
            { path: "settings", element: <Settings /> },
        ],
    },
    {path: "/auth",element: <AuthPage />,},
    
    {
        path: "/developer",
        element: (
            <ProtectedRoute>
                <Developer />
            </ProtectedRoute>
        ),
    },
]);

createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </QueryClientProvider>
);