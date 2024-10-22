import React from "react";
import { useSelector } from "react-redux";
import MainContent from "../../Components/MainContent";

function Upcoming_Task() {
    // Fetch tasks from Redux
    const tasks = useSelector((state) => state.tasks.taskList);

    // Function to calculate and filter upcoming tasks
    const getUpcomingTasks = () => {
        const now = new Date();
        return tasks.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate > now; // Keep only tasks with future due dates
        });
    };

    const upcomingTasks = getUpcomingTasks(); // Get the filtered upcoming tasks

    return (
        <div>
            <h1>
                <span className="underline-text">Upcoming Tasks</span>
            </h1>
            {upcomingTasks.length > 0 ? (
                <MainContent home={false} data={upcomingTasks} /> 
            ) : (
                <p>No upcoming tasks to show</p>
            )}
        </div>
    );
}

export default Upcoming_Task;
