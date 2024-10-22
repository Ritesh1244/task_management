import React from "react";
import { useSelector } from "react-redux";
import MainContent from "../../Components/MainContent";

function Pending_Task() {
    // Fetch tasks from Redux
    const tasks = useSelector((state) => state.tasks.taskList);

    // Function to filter pending tasks
    const getPendingTasks = () => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); 
        return tasks.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate < startOfToday; 
        });
    };

    const pendingTasks = getPendingTasks(); // Get the filtered pending tasks

    return (
        <div>
            <h1>
                <span className="underline-text">Pending Tasks</span>
            </h1>
            {pendingTasks.length > 0 ? (
                <MainContent home={false} data={pendingTasks} /> 
            ) : (
                <p>No pending tasks to show</p>
            )}
        </div>
    );
}

export default Pending_Task;
