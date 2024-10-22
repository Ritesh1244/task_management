import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to retrieve the token
const getToken = () => localStorage.getItem("token");

// Async thunk to fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('http://localhost:3000/task/alltasks', {
        headers: { authorization: getToken() },
    });
    return response.data.tasks; // Return the array of tasks
});

// Async thunk to create a new task
export const createTask = createAsyncThunk('tasks/createTask', async (taskData, { dispatch }) => {
    const response = await axios.post('http://localhost:3000/task/create', taskData, {
        headers: { authorization: getToken() },
    });
    dispatch(fetchTasks()); // Refetch tasks after creation
    return response.data; // Return the created task
});

// Async thunk to update an existing task
export const updateTask = createAsyncThunk('tasks/updateTask', async ({ taskId, updates }, { rejectWithValue }) => {
    try {
        const response = await axios.patch(`http://localhost:3000/task/${taskId}`, updates, {
            headers: { authorization: getToken() },
        });
        return response.data; // Return the updated task data
    } catch (error) {
        return rejectWithValue(error.response.data); // Handle error and return it
    }
});

// Async thunk to delete a task
export const deleteTask = createAsyncThunk('tasks/deleteTask', async (taskId, { dispatch }) => {
    await axios.delete(`http://localhost:3000/task/${taskId}`, {
        headers: { authorization: getToken() },
    });
    dispatch(fetchTasks()); // Refetch tasks after deletion
});

// Async thunk to toggle task importance
export const toggleImportant = createAsyncThunk('tasks/toggleImportant', async (taskId, { getState, dispatch }) => {
    const task = getState().tasks.taskList.find(t => t._id === taskId);
    const updates = { important: !task.important };
    await axios.patch(`http://localhost:3000/task/${taskId}`, updates, {
        headers: { authorization: getToken() },
    });
    dispatch(fetchTasks()); // Refetch tasks after update
});

// Async thunk to toggle task completion
export const toggleCompletion = createAsyncThunk('tasks/toggleCompletion', async (taskId, { getState, dispatch }) => {
    const task = getState().tasks.taskList.find(t => t._id === taskId);
    const updates = { completed: !task.completed };
    await axios.patch(`http://localhost:3000/task/${taskId}`, updates, {
        headers: { authorization: getToken() },
    });
    dispatch(fetchTasks()); // Refetch tasks after update
});

// Task slice definition
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        taskList: [],
        status: 'idle', // idle | loading | succeeded | failed
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading'; // Set loading status
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.taskList = action.payload; // Update task list
                state.status = 'succeeded'; // Set succeeded status
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = 'failed'; // Set failed status
                state.error = action.error.message; // Capture error message
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const updatedTask = action.payload; // Get updated task
                const taskIndex = state.taskList.findIndex(task => task._id === updatedTask._id);
                if (taskIndex !== -1) {
                    state.taskList[taskIndex] = updatedTask; // Update the task in the state
                }
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                // Handle removal of the task from the state if necessary
                // Note: We refetch tasks, so this might be optional
            });
    },
});

// Export the reducer to be used in the store
export default taskSlice.reducer;