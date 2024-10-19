import React, { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import './update_data.css';

function UpdateTask({ onClose, refreshTasks, currentTask }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        completed: "No"
    });

    // Pre-populate the form with the selected task's data
    useEffect(() => {
        if (currentTask) {
            setFormData({
                title: currentTask.title,
                description: currentTask.description,
                priority: currentTask.priority,
                dueDate: currentTask.dueDate,
                completed: currentTask.completed ? "Yes" : "No"
            });
        }
    }, [currentTask]);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send PATCH request to update the task
            const response = await axios.patch(`http://localhost:3000/task/${currentTask._id}`, {
                title: formData.title,
                description: formData.description,
                priority: formData.priority,
                dueDate: formData.dueDate,
                completed: formData.completed === "Yes",
            }, {
                headers: { 'authorization': localStorage.getItem('token') }
            });

            console.log("Task updated:", response.data);

            // Refresh the tasks after update
            refreshTasks();
            onClose(); // Close the update form
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>Update Task</h2>
                        <RxCrossCircled className="cross-icon" onClick={onClose} />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                        <label htmlFor="title">Title</label> 
                            <input
                                type="text"
                                name="title"
                                className="input-title"
                                placeholder="Task Title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="description">Description</label>
                            <textarea
                                name="description"
                                className="input-description"
                                placeholder="Task Description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="priority">Select Priority</label>
                            <input
                                type="date"
                                name="dueDate"
                                className="input-date"
                                value={formData.dueDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                        <label htmlFor="dueDate">Due Date</label>

                            <select
                                name="priority"
                                className="input-priority"
                                value={formData.priority}
                                onChange={handleChange}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        <div className="form-group">
                        <label htmlFor="completed">Task Status</label>
                            <select
                                name="completed"
                                className="input-completed"
                                value={formData.completed}
                                onChange={handleChange}
                            >
                                <option value="Yes">Completed</option>
                                <option value="No">Incomplete</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-submit">
                                Update Task
                            </button>
                            <button type="button" className="btn-cancel" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UpdateTask;
