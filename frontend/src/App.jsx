import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';
import All_Tasks from './pages/Task_pages/All_Tasks';
import Completed_Task from './pages/Task_pages/Completed_Task';
import Important_Task from './pages/Task_pages/Important_Task';
import Overdue_task from './pages/Task_pages/Overdue_task';
import Pending_task from './pages/Task_pages/Pending_task';
import Upcoming_Task from './pages/Task_pages/Upcoming_Task';
import { RecoilRoot } from 'recoil';  // Import RecoilRoot

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute ensures that a user can only access /home if authenticated
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <RecoilRoot>  {/* Wrapping everything with RecoilRoot */}
      <div className="App">
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute element={<Home />} />}>
            {/* Nested Task Routes */}
            <Route index element={<All_Tasks />} />
            <Route path="important-tasks" element={<Important_Task />} />
            <Route path="completed-tasks" element={<Completed_Task />} />
            <Route path="upcoming-tasks" element={<Upcoming_Task />} />
            <Route path="pending-tasks" element={<Pending_task />} />
            <Route path="overdue" element={<Overdue_task />} />
          </Route>
        </Routes>
      </div>
    </RecoilRoot> 
  );
}

export default App;
