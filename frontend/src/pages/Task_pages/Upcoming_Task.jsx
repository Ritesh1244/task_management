import React from "react";
import MainContent from "../../Components/MainContent";
function Upcoming_Task(){
    return(
        <div>
        <h1>
             <span className="underline-text">Upcoming Tasks</span>
        </h1>
        <MainContent home={false} />
    </div>
    )
}

export default Upcoming_Task;