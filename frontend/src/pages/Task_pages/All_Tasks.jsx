import React, { useState, useEffect } from "react";
import axios from "axios";
import MainContent from "../../Components/MainContent";
import { IoIosAddCircle } from "react-icons/io";
import '../../Style/Task/All_task.css'; 
import InputData from "../../Components/Input_data";
import UpdateTask from "../../Components/update_data"; // Import the UpdateTask component
import Completed_task from "./Completed_Task";

function All_Tasks() {
    const [showAddForm, setShowAddForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    // Fetch tasks from the server
    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:3000/task/alltasks", {
                headers: { authorization: token },
            });

            if (response.data && response.data.tasks) {
                setTasks(response.data.tasks);
            } else {
                console.log("No tasks found");
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    // Fetch tasks when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to open the Add Task form
    const openAddForm = () => {
        setShowAddForm(true);
        setShowUpdateForm(false);
    };

    // Function to open the Update Task form
    const openUpdateForm = (task) => {
        setTaskToUpdate(task); 
        setShowUpdateForm(true); 
        setShowAddForm(false); 
    };

    // Function to close both forms
    const closeForms = () => {
        setShowAddForm(false);
        setShowUpdateForm(false);
        setTaskToUpdate(null);
    };

    return (
        <>
            <div>
                <div className="all-tasks-container">
                    <h1>
                        <span className="underline-text">All Your Tasks</span>
                    </h1>
                    <div className="filter-buttons">
                        <button>Low</button>
                        <button>Medium</button>
                        <button>High</button>
                    </div>
                    <div className="add-task-container" onClick={openAddForm}>
                        <IoIosAddCircle />
                        <span>Add a new Task</span>
                    </div>
                </div>

                <MainContent 
                    home={"true"} 
                    handleOpenForm={openAddForm} 
                    handleOpenUpdateForm={openUpdateForm} 
                    data={tasks} 
                    fetchTasks={fetchTasks} 
                />

                {showAddForm && <InputData onClose={closeForms} refreshTasks={fetchTasks} />}
                {showUpdateForm && (
                    <UpdateTask 
                        onClose={closeForms} 
                        refreshTasks={fetchTasks} 
                        currentTask={taskToUpdate} 
                    />
                )}           
            </div>
        </>
    );
}

export default All_Tasks;
