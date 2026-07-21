import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import App from './App.jsx'
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import HistoryPage from './pages/HistoryPage/HistoryPage.jsx';
import DocumentsPage from './pages/DocumentPage/DocumentsPage.jsx';


const router =createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        index: true,
        element: <ChatPage />,
      },

      {
        path: "chat",
        element: <ChatPage />,
      },
      {
        path:"documents",
        element:<DocumentsPage />
      },

      {
        path:"history",
        element:<HistoryPage />
      }

    ],
  },
]);
  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
