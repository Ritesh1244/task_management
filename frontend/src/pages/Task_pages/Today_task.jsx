import React from "react";
import { useSelector } from "react-redux";
import MainContent from "../../Components/MainContent";

function Today_Task() {
   
    const tasks = useSelector((state) => state.tasks.taskList);

    // Function to filter tasks due today
    const getTodayTasks = () => {
        const now = new Date();
        const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Midnight today
        const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1); // Midnight tomorrow
        return tasks.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= startOfToday && dueDate < endOfToday; 
        });
    };

    const todayTasks = getTodayTasks(); 

    return (
        <div>
            <h1>
                <span className="underline-text">Today's Tasks</span>
            </h1>
            {todayTasks.length > 0 ? (
                <MainContent home={false} data={todayTasks} /> 
            ) : (
                <p>No tasks due today</p>
            )}
        </div>
    );
}

export default Today_Task;
