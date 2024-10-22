import React from "react";
import { useSelector } from "react-redux";
import MainContent from "../../Components/MainContent";

function Completed_task() {
    // Fetch tasks from Redux
    const tasks = useSelector((state) => state.tasks.taskList);

    // Filter out only the completed tasks
    const completedTasks = tasks.filter((task) => task.completed === true);


    console.log("complted task page ", completedTasks)

    return (
        <div>
            <h1>
                <span className="underline-text">Completed Tasks</span>
            </h1>
            {completedTasks.length > 0 ? (
                // Pass the filtered completed tasks to MainContent
                <MainContent home={false} data={completedTasks} />
            ) : (
                <p>No completed tasks to show</p>
            )}
        </div>
    );
}

export default Completed_task;
