// import { useState } from "react";
import "./App.css";
import Sidebar  from "./components/Sidebar/Sidebar";
import Topbar  from "./components/Topbar/Topbar";
import RightSidebar from "./components/RightSidebar/RightSidebar";
import ChatSection from "./components/ChatSection/ChatSection";

function App(){
  return(
    <div className="app-layout">   
      <Sidebar />

      <main className="main-area">
        <Topbar />

        <div className="workspace">
          
        <ChatSection />
        <RightSidebar />

        </div>
      </main>
    </div>
   
  );
}
export default App;

