import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import './index.css'
import App from './App.jsx'
import Chat from "./pages/ChatPage/ChatPage.jsx";
import Developer from './pages/DeveloperPage/DeveloperPage.jsx';
import History from './pages/HistoryPage/HistoryPage.jsx';
import Documents from './pages/DocumentPage/DocumentsPage.jsx';
import Notes from './pages/NotePage/NotePage.jsx';
import UploadDocument from './pages/UploadDocPage/Upload.jsx';
import AIModels from './pages/AIModelPage/ModelPage.jsx';
import Settings from './pages/SettingsPage/SettingsPage.jsx';
import AuthPage from './pages/auth/AuthPage.jsx';


const router =createBrowserRouter([
  {path: "/",element: <ProtectedRoute>
            <App />
        </ProtectedRoute>,

    children: [
      {path: "chat",element: <Chat />},

      {path: "chat/:sessionId",element: <Chat />},

      {path:"documents",element:<Documents />},

      {path:"history",element:<History />},

      {path : "notes",element: <Notes />},

      {path:"upload",element:<UploadDocument />},

      {path:"models",element:<AIModels />},

      {path:"settings",element:<Settings />}
    ],
  },

  {path:"/auth",element:<AuthPage />},
  {path: "/developer",element:<Developer />}

]);
  
createRoot(document.getElementById("root")).render(
  <StrictMode>

    <QueryClientProvider client={queryClient}>

      <AuthProvider>

        <RouterProvider router={router} />

      </AuthProvider>

    </QueryClientProvider>

  </StrictMode>
);
