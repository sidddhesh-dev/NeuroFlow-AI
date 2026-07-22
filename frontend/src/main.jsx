import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css'
import App from './App.jsx'
import Chat from "./pages/ChatPage/ChatPage.jsx";
import Developer from './pages/DeveloperPage/DeveloperPage.jsx';
import History from './pages/HistoryPage/HistoryPage.jsx';
import Documents from './pages/DocumentPage/DocumentsPage.jsx';
import Account from './pages/AccountPage/AccountPage.jsx';
import Notes from './pages/NotePage/NotePage.jsx';
import UploadDocument from './pages/UploadDocPage/Upload.jsx';
import AIModels from './pages/AIModelPage/ModelPage.jsx';
import Login from './pages/LoginPage/LoginPage.jsx';
import Register from './pages/RegisterPage/RegisterPage.jsx';
import Settings from './pages/SettingsPage/SettingsPage.jsx';


const router =createBrowserRouter([
  {path: "/",element: <App />,

    children: [
      {index: true,element: <Chat />},

      {path: "chat",element: <Chat />,},

      {path:"documents",element:<Documents />},

      {path:"history",element:<History />},
      
      {path:"account",element:<Account />},

      {path : "notes",element: <Notes />},

      {path:"upload",element:<UploadDocument />},

      {path:"models",element:<AIModels />},

      {path:"settings",element:<Settings />}
    ],
  },

  {path:"login",element:<Login />},
  {path:"register",element:<Register />},
  {path:"developer",element:<Developer />}

]);
  
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
