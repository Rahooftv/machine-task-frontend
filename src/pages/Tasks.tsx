import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import TaskCard from "../components/ui/Taskcard";
import { useNavigate } from "react-router-dom";

interface Task {
  _id: string;
  title: string;
  status: string;
  dueDate: string;
  attachment?: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/task"); 
      setTasks(res.data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading tasks...
      </div>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* Header + Add Task Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>

        <button
          onClick={() => navigate("/tasks/add")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              status={task.status}
              dueDate={task.dueDate}
              attachment={task.attachment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
