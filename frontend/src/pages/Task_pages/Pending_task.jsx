import React from "react";
import MainContent from "../../Components/MainContent";

function Pending_Task(){
    return(
        <div>
        <h1>
             <span className="underline-text">Pending Tasks</span>
        </h1>
        <MainContent home={false} />
    </div>
    )
}

export default Pending_Task;