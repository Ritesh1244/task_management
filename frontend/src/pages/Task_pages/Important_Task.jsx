import React from "react";
import MainContent from "../../Components/MainContent";

function Important_Task(){
    return(
        
        <div>
            <h1>
                 <span className="underline-text">Important Tasks</span>
            </h1>
            <MainContent home={false} data ={data}/>
        </div>

    )
}

export default Important_Task;