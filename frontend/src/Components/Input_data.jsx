import React, { useState } from "react";
import { RxCrossCircled } from "react-icons/rx";
import axios from "axios";
import './Input_data.css';

function InputData({ onClose, refreshTasks }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low",
        dueDate: "",
        completed: "No"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const newTask = {
            title: formData.title,
            description: formData.description,
            priority: formData.priority,
            dueDate: formData.dueDate,
            completed: formData.completed === "Yes"
        };

        try {
            const response = await axios.post("http://localhost:3000/task/create", newTask, {
                headers: {
                    authorization: token
                }
            });

            console.log("Task created:", response.data);
            refreshTasks(); // Refresh tasks after creation
            onClose(); // Close the modal after creation
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    const handleCancel = () => {
        onClose(); // Call the function passed from the parent to close the form
    };

    return (
        <div className="overlay">
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 style={{ float: 'left' }}>Create New Task</h2>
                        <RxCrossCircled 
                            className="cross-icon" 
                            style={{ float: 'right', cursor: 'pointer', fontSize: '24px' }} 
                            onClick={handleCancel} 
                        />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input 
                                type="text" 
                                placeholder="Task Title" 
                                name="title" 
                                className="input-title" 
                                onChange={handleInputChange} 
                                value={formData.title}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea 
                                placeholder="Task Description" 
                                name="description" 
                                className="input-description" 
                                onChange={handleInputChange} 
                                value={formData.description}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="priority">Select Priority</label>
                            <select 
                                name="priority" 
                                className="input-priority" 
                                onChange={handleInputChange} 
                                value={formData.priority}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dueDate">Due Date</label>
                            <input 
                                type="date" 
                                name="dueDate" 
                                className="input-date" 
                                onChange={handleInputChange} 
                                value={formData.dueDate}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="completed">Task Completed</label>
                            <select 
                                name="completed" 
                                className="input-completed" 
                                onChange={handleInputChange} 
                                value={formData.completed}
                            >
                                <option value="No">No</option>
                                <option value="Yes">Yes</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="submit" className="btn-submit">Create Task</button>
                            <button type="button" className="btn-cancel" onClick={handleCancel}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InputData;
