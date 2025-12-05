import React, { useEffect, useState } from "react";
import { api } from "../api/axios";
import TaskCard from "../components/ui/Taskcard";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";

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

  const handleFocus = () => fetchTasks()
  window.addEventListener("focus", handleFocus)
  return () => window.removeEventListener("focus", handleFocus)
}, []);


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading tasks...
      </div>
    );

    const handleDelete = async (id: string) => {
  if (!confirm("Are you sure you want to delete this task?")) return;

  try {
    await api.delete(`/task/${id}`);


    setTasks(prev => prev.filter(task => task._id !== id));

    alert("Task deleted successfully!");
  } catch (err) {
    alert("Failed to delete task");
    console.error(err);
  }
};


  return (
    <div className="p-6 max-w-4xl mx-auto">

     
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Tasks</h1>

       <Button
       onClick={() => navigate("/task/add")}
        className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
      >
        + Add Task
      </Button>
      </div>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tasks.map((task) => (
           <TaskCard
            key={task._id}
            _id={task._id}          
            title={task.title}
            status={task.status}
            dueDate={task.dueDate}
            attachment={task.attachment}
           onDelete={handleDelete}

          />

          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
