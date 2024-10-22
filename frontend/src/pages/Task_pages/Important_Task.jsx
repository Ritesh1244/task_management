import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImportantTask } from "../../redux/slices/taskSlice"; // Import the important task thunk
import MainContent from "../../Components/MainContent";

function Important_Task() {
    const dispatch = useDispatch();

    // Fetch important tasks from Redux state
    const importantTasks = useSelector((state) => state.tasks.importantTasks); // Change this line

    // Fetch important tasks on component mount
    useEffect(() => {
        dispatch(ImportantTask()); // Dispatch the thunk to fetch important tasks
    }, [dispatch]);

    return (
        <div>
            <h1>
                <span className="underline-text">Important Tasks</span>
            </h1>

            {/* Render MainContent and pass important tasks data */}
            {importantTasks.length > 0 ? (
                <MainContent home={false} data={importantTasks} />
            ) : (
                <p>No important tasks to show</p>
            )}
        </div>
    );
}

export default Important_Task;
