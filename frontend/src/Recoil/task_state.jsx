// task_state.js
import { atom, selector } from 'recoil';
import axios from 'axios';

export const taskListState = atom({
  key: 'taskListState',
  default: [],
});

// Selector to fetch tasks
export const fetchTasksSelector = selector({
  key: 'fetchTasksSelector',
  get: async ({ get }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:3000/task/alltasks', {
        headers: { authorization: token },
      });
      return response.data.tasks || [];
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
  },
});
