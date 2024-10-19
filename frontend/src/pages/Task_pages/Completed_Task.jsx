import React from "react";
import MainContent from "../../Components/MainContent";

function Completed_task({ data }) {
  // Filter out only the completed tasks
  const completedTasks = data?.filter((task) => task.completed);

  return (
    <div>
      <h1>
        <span className="underline-text">Completed Tasks</span>
      </h1>
      {completedTasks?.length > 0 ? (
        <MainContent home={false} data={completedTasks} />
      ) : (
        <p>No completed tasks to show</p>
      )}
    </div>
  );
}

export default Completed_task;
