import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart, FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import './MainContent.css';
import axios from "axios";

function MainContent({ home, handleOpenForm, handleOpenUpdateForm, data }) {
    const [taskList, setTaskList] = useState(data);

    useEffect(() => {
        setTaskList(data);
    }, [data]);

// Toggle task importance
const toggleImportant = async (task) => {
    const updatedImportantStatus = !task.important;

    // Optimistically update local state
    const updatedTaskList = taskList.map(t => 
        t._id === task._id ? { ...t, important: updatedImportantStatus } : t
    );
    setTaskList(updatedTaskList);

    try {
        // Update the server
        await axios.patch(`http://localhost:3000/task/${task._id}`, {
            important: updatedImportantStatus,
        }, {
            headers: { 'authorization': localStorage.getItem('token') }
        });
    } catch (error) {
        console.error("Error updating task importance:", error);
        // Revert the state change in case of an error
        setTaskList(prevList => prevList.map(t => 
            t._id === task._id ? { ...t, important: !updatedImportantStatus } : t
        )); 
    }
};




    // Toggle task completion status
    const toggleTaskCompletion = async (task) => {
        const updatedCompletionStatus = !task.completed;
    
        // Optimistically update local state
        const updatedTaskList = taskList.map(t => 
            t._id === task._id ? { ...t, completed: updatedCompletionStatus } : t
        );
        setTaskList(updatedTaskList);  // Update local state immediately
    
        try {
            // Update the server
            await axios.patch(`http://localhost:3000/task/${task._id}`, {
                completed: updatedCompletionStatus,
            }, {
                headers: { 'authorization': localStorage.getItem('token') }
            });
        } catch (error) {
            console.error("Error updating task:", error);
    
            // Revert only if an error occurs, without unnecessarily toggling
            const revertedTaskList = taskList.map(t => 
                t._id === task._id ? { ...t, completed: task.completed } : t
            );
            setTaskList(revertedTaskList); // Reset to the original state before toggle
        }
    };
    
    
    // Delete a task
    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:3000/task/${taskId}`, {
                headers: { 'authorization': localStorage.getItem('token') }
            });
    
            // Remove the task from local state after successful deletion
            setTaskList(taskList.filter(task => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    
    // Function to calculate the due date relative to the current date
    const calculateDueDate = (dueDate) => {
        const due = new Date(dueDate);
        const now = new Date();
        const timeDifference = due - now;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            return "Today";
        } else if (daysDifference === 1) {
            return "Tomorrow";
        } else if (daysDifference > 0) {
            return `In ${daysDifference} days`;
        } else {
            return `${Math.abs(daysDifference)} days ago`;
        }
    };

    return (
        <div className="main-content">
            {taskList.length > 0 ? (
                taskList.map((task) => (
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

                            <p>{calculateDueDate(task.dueDate)}</p>
                            <div className="task-action">
                                <button onClick={() => toggleImportant(task)} className="icon-button">
                                    {task.important ? (
                                        <FaHeart className="icon filled" style={{ color: "red" }} />
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