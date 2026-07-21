// import { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import Sidebar  from "./components/Sidebar/Sidebar";
import Topbar  from "./components/Topbar/Topbar";

function App(){
  return(
    <div className="app-layout">   
      <Sidebar />

      <main className="main-area">
        <Topbar />

        <div className="workspace">
        <Outlet />
        </div>
      </main>
    </div>
   
  );
}
export default App;

