import "./App.css";

import { Outlet } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";

function App(){

    return(

        <div className="app-layout">

            <Sidebar/>

            <div className="main-area">

                <Outlet/>

            </div>
        </div>

    );

}

export default App;