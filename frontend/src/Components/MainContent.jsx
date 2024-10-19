import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import './MainContent.css';
import axios from "axios"; // Import axios to update tasks

function MainContent({ home, handleOpenForm, handleOpenUpdateForm, data, fetchTasks }) {
    const [importantTasks, setImportantTasks] = useState([]);
    const [taskList, setTaskList] = useState(data);

    // Update taskList whenever data prop changes
    useEffect(() => {
        setTaskList(data);
    }, [data]);

    // Toggle important status
    const toggleImportant = (index) => {
        setImportantTasks((prev) => 
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    // Toggle task completion status
    const toggleTaskCompletion = async (task) => {
        try {
            const updatedTask = { ...task, completed: !task.completed }; // Toggle completion status
            const response = await axios.patch(`http://localhost:3000/task/${task._id}`, {
                completed: updatedTask.completed,
            }, {
                headers: { 'authorization': localStorage.getItem('token') }
            });
    
            console.log(response.data);
            // Call fetchTasks to refresh the task list
            fetchTasks(); 
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };
    

    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/task/${taskId}`, {
                headers: { 'authorization': localStorage.getItem('token') }
            });

            console.log('Task deleted');
            fetchTasks(); // Refresh the tasks after deletion
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    // Function to calculate the due date
    const calculateDueDate = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const timeDifference = now - createdDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            return "Today";
        } else if (daysDifference === 1) {
            return "Yesterday";
        } else {
            return `${daysDifference} days ago`;
        }
    };

    return (
        <div className="main-content">
            {taskList.length > 0 ? (
                taskList.map((task, index) => (
                    <div className="task-item" key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <div className="task-button">
                            <button
                                onClick={() => toggleTaskCompletion(task)}
                                style={{
                                    backgroundColor: task.completed ? "green" : "red",
                                    color: "white",
                                }}
                            >
                                {task.completed ? "Completed" : "Incomplete"}
                            </button>

                            <p>{calculateDueDate(task.createdAt)}</p>
                            <div className="task-action">
                                <button onClick={() => toggleImportant(index)} className="icon-button">
                                    {importantTasks.includes(index) ? (
                                        <FaHeart className="icon filled" />
                                    ) : (
                                        <FaRegHeart className="icon" />
                                    )}
                                </button>
                                <button className="icon-button" onClick={() => handleOpenUpdateForm(task)}>
                                    <FaEdit />
                                </button>
                                <button className="icon-button" onClick={() => deleteTask(task._id)}>
                                    <MdDeleteSweep className="delete-icon" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No tasks found</p>
            )}

            {home === 'true' && (
                <div className="task-item add-task-item" onClick={handleOpenForm}>
                    <IoIosAddCircle className="add-icon" />
                    <h2 className="add-task">Add Task</h2>
                </div>
            )}
        </div>
    );
}

export default MainContent;
